import merge from 'deepmerge';

import { default as configGlobal } from './global';
import { default as configLocal } from './local';

const config = merge(configGlobal, configLocal);
export default config;
