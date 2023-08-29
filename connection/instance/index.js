import axios from 'axios';
import config from '../../../../scale.config';

const instance = axios.create({
  baseURL: config.instance.baseURL,
  timeout: config.instance.timeout,
  headers: config.instance.headers,
});

export const trustVox = axios.create({
  baseURL: config?.trustVox?.baseURL,
  timeout: config?.trustVox?.timeout,
  headers: config?.trustVox?.headers,
});

export const instanceVtex = axios.create({
  baseURL: config.instances.graphql.baseURL,
  timeout: config.instance.timeout,
  headers: config.instance.headers,
});

export default instance;
