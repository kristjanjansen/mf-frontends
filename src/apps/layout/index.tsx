import LayoutApp from "./LayoutApp";
import { registerCustomElement } from "../../utils/utils";
import css from "./index.css?inline";

registerCustomElement("mf-layout", LayoutApp, { shadow: true, css });
