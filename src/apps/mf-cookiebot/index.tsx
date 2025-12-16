import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { registerCustomElement } from "../../utils/utils";
import CookiebotApp from "./CookiebotApp";
import css from "./index.css?inline";

function Root() {
  const [client] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <CookiebotApp />
    </QueryClientProvider>
  );
}

registerCustomElement("mf-cookiebot", Root, { shadow: true, css });
