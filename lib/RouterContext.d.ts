export type RouterContextType = {
    pathname: string;
    params: Record<string, string>;
};
export declare const RouterContext: import("react").Context<RouterContextType>;
