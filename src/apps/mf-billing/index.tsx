import React from "react";
import { registerCustomElement } from "../../utils/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BillingApp from "./BillingApp";
import css from "./index.css?inline";

function Root() {
  const [client] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <BillingApp />
    </QueryClientProvider>
  );
}

registerCustomElement("mf-billing", Root, { shadow: true, css });
