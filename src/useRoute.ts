import { useContext } from "react";
import { RouterContext } from "./RouterContext";

export function useRoute() {
  const { pathname, params } = useContext(RouterContext);
  return { pathname, params };
}
