import merge from "deepmerge";

import { default as configGlobal } from "./global.js";
import { default as configLocal } from "./local.js";

const config = merge(configGlobal, configLocal);
export default config;
