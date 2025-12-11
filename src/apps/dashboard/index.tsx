import { registerCustomElement } from "../../../utils/utils";
import DashboardApp from "./DashboardApp";
import css from "./index.css?inline";

registerCustomElement("mf-dashboard", DashboardApp, { shadow: true, css });
