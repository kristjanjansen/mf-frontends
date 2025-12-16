import NavigationApp from "./NavigationApp";
import { registerCustomElement } from "../../utils/utils";
import css from "./index.css?inline";

registerCustomElement("mf-navigation", NavigationApp, { shadow: true, css });
