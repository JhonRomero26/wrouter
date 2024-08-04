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
export declare const RouterContext: import("react").Context<RouterContextType>;
export declare function Router({ routes, defaultComponent: DefaultComponent, children }: RouterProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
