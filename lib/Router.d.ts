type Route = {
    path: string;
    Component: React.FC;
};
export type RouterProviderProps = {
    routes?: Route[];
    defaultComponent?: React.FC;
    children?: React.ReactNode;
};
export declare function Router({ routes, defaultComponent: DefaultComponent, children, }: RouterProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
