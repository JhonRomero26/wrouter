import { match } from "path-to-regexp";
import { Children, isValidElement, useEffect, useState } from "react";
import { EVENTS } from "./consts";
import { getCurrentPath, getSearhcParams } from "./utils";
import { RouterContext } from "./RouterContext";

type Route = {
  path: string;
  Component: React.FC;
};

export type RouterProviderProps = {
  routes?: Route[];
  defaultComponent?: React.FC;
  children?: React.ReactNode;
};

export function Router({
  routes = [],
  defaultComponent: DefaultComponent = () => <h1>404</h1>,
  children,
}: RouterProviderProps) {
  const [pathname, setPathname] = useState(getCurrentPath());
  const [search, setSearch] = useState(getSearhcParams());

  const routesFromChildren =
    Children.map(children, (child) => {
      if (isValidElement(child)) {
        const { type, props } = child;
        let isRoute = false;

        if (typeof type === "function") isRoute = type.name === "Route";

        return isRoute ? (props as Route) : null;
      }

      return null;
    }) || [];

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean);

  useEffect(() => {
    const onLocationChange = () => {
      setPathname(getCurrentPath());
      setSearch(getSearhcParams());
    };

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
    window.addEventListener(EVENTS.POPSTATE, onLocationChange);

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
    };
  }, []);

  let routeParams = {};

  const Page =
    routesToUse.find(({ path }) => {
      if (path === pathname) return true;

      const matchedURL = match(path, { decode: decodeURIComponent });
      const matched = matchedURL(pathname);

      if (!matched) return false;
      routeParams = matched.params;

      return true;
    })?.Component || DefaultComponent;

  return (
    <RouterContext.Provider value={{ pathname, params: routeParams, search }}>
      <Page />
    </RouterContext.Provider>
  );
}
