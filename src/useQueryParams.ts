import { useContext, useMemo } from "react";
import { RouterContext } from "./RouterContext";

export function useQueryParams() {
  const { search } = useContext(RouterContext);

  const query = useMemo(() => {
    return Object.fromEntries(new URLSearchParams(search));
  }, [search]);

  return query;
}
