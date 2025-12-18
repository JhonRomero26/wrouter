import { createContext } from "react";

export type RouterContextType = {
  pathname: string;
  params: Record<string, string>;
  search: string;
};

export const RouterContext = createContext<RouterContextType>(
  {} as RouterContextType,
);
