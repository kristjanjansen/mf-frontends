import { registerCustomElement } from "../../../utils/utils";
import BillingApp from "./BillingApp";
import css from "./index.css?inline";

registerCustomElement("mf-billing", BillingApp, { shadow: true, css });
