import { HTMLAttributes } from "react";
export type LinkProps = {
    target?: string;
    href: string;
} & Omit<HTMLAttributes<HTMLAnchorElement>, "href">;
export declare function Link({ target, href, children, ...props }: LinkProps): import("react/jsx-runtime").JSX.Element;
