import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { registerCustomElement } from "../../utils/utils";
import CookiebotApp from "./CookiebotApp";
import css from "./index.css?inline";

function createClient() {
  const client = new QueryClient();

  client.getQueryCache().subscribe((event) => {
    const q = event?.query;
    if (!q) return;
    console.info("[react-query][mf-cookiebot][query]", {
      type: event.type,
      key: q.queryKey,
      status: q.state.status,
      fetchStatus: q.state.fetchStatus,
      dataUpdatedAt: q.state.dataUpdatedAt,
      error: q.state.error,
    });
  });

  client.getMutationCache().subscribe((event) => {
    const m = event?.mutation;
    if (!m) return;
    console.info("[react-query][mf-cookiebot][mutation]", {
      type: event.type,
      key: m.options.mutationKey,
      status: m.state.status,
      error: m.state.error,
    });
  });

  return client;
}

function Root() {
  const [client] = React.useState(() => createClient());
  return (
    <QueryClientProvider client={client}>
      <CookiebotApp />
    </QueryClientProvider>
  );
}

registerCustomElement("mf-cookiebot", Root, { shadow: true, css });
