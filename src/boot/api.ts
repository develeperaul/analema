import { boot } from 'quasar/wrappers'
import axios, { type AxiosInstance } from 'axios';
import createAuthRepo from 'src/repositories/auth';
import createProfileRepo from 'src/repositories/profile';
import { InjectionKey } from 'vue';
import * as Token from 'src/utils/token';

export default boot(({ app }) => {
  const http = createHttp();
  app.config.globalProperties['$http'] = http;
  app.provide(httpKey, http);

  const repositories = createRepositories(http);
  app.config.globalProperties['$repositories'] = repositories;
  app.provide(repositoriesKey, repositories);
});

function createRepositories(http: AxiosInstance) {
  const repositories = {
    'auth': createAuthRepo(http),
    'profile': createProfileRepo(http),
  };

  return repositories;
}

function createHttp() {
  const http = axios.create({
    baseURL: process.env.API_BASE,
  });

  http.interceptors.request.use((config) => {
    const token = Token.get();

    if(!token) return config;

    if(config.data instanceof FormData) {
      config.data.append('token', token);
    }

    return config;
  });

  return http;
}

export const httpKey: InjectionKey<AxiosInstance> = Symbol();
export const repositoriesKey: InjectionKey<ReturnType<typeof createRepositories>> = Symbol();
