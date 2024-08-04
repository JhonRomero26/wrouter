import { match } from "path-to-regexp";
import { Children, createContext, isValidElement, useEffect, useState } from "react";
import { EVENTS } from "./consts";
import { getCurrentPath } from "./utils";

type Route = {
  path: string;
  Component: React.FC;
};

type RouterContextType = {
  pathname: string;
  params: Record<string, string>;
};

export type RouterProviderProps = {
  routes?: Route[];
  defaultComponent?: React.FC;
  children?: React.ReactNode;
};

export const RouterContext = createContext<RouterContextType>({} as RouterContextType);

export function Router({
  routes = [],
  defaultComponent: DefaultComponent = () => <h1>404</h1>,
  children
}: RouterProviderProps) {
  const [pathname, setPathname] = useState(getCurrentPath());
  const [params, setParams] = useState({});

  const routesFromChildren = Children.map(children, (child) => {
    if (isValidElement(child)) {
      const { type, props } = child;
      let isRoute = false

      if (typeof type === "function")
        isRoute = type.name === "Route"

      return isRoute ? props as Route : null;
    }

    return null
  }) || [];

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean);

  useEffect(() => {
    const onLocationChange = () => {
      setPathname(getCurrentPath());
    };

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
    window.addEventListener(EVENTS.POPSTATE, onLocationChange);

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
    };
  }, []);

  useEffect(() => {
    const route = routesToUse.find(({ path }) => {
      if (path === pathname) {
        setParams({});
        return true;
      }

      const matchedURL = match(path, { decode: decodeURIComponent });
      const matched = matchedURL(pathname);
      if (!matched) return false;

      setParams(matched.params);
      return true;
    });

    if (!route) {
      setParams({});
    }
  }, [pathname, routesToUse]);

  const Page = routesToUse.find(({ path }) => {
    if (path === pathname) {
      return true;
    }

    const matchedURL = match(path, { decode: decodeURIComponent });
    const matched = matchedURL(pathname);
    return !!matched;
  })?.Component || DefaultComponent;

  return (
    <RouterContext.Provider value={{ pathname, params }}>
      <Page />
    </RouterContext.Provider>
  );
}