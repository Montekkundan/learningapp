// thumbnails.tsx
import { Loader } from "@mantine/core";
import { createContext, ReactNode, useContext } from "react";
import { useQuery, RefetchOptions, RefetchQueryFilters } from "react-query";
import { getThumbnails } from "../api";
import { QueryKeys, Thumbnail } from "../types";

const ThumbnailContext = createContext<{
  thumbnails: Thumbnail[];
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => any;
  // @ts-ignore
}>(null);

function ThumbnailsContextProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, refetch } = useQuery(QueryKeys.thumbnails, getThumbnails);

  return (
    <ThumbnailContext.Provider
      value={{
        thumbnails: data,
        refetch,
      }}
    >
      {isLoading ? <Loader /> : children}
    </ThumbnailContext.Provider>
  );
}

const useThumbnail = () => useContext(ThumbnailContext);

export { ThumbnailsContextProvider, useThumbnail };
