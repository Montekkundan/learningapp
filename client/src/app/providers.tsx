"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import { MeContextProvider } from "./context/me";
import { VideosContextProvider } from "./context/videos";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(new QueryClient());

  return (
        <QueryClientProvider client={client}>
          <MeContextProvider>
          <VideosContextProvider>
          {children}
          </VideosContextProvider>
          </MeContextProvider> 
        </QueryClientProvider>
  );
}