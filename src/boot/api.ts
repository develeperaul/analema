import { boot } from 'quasar/wrappers'
import axios, { type AxiosInstance } from 'axios';
import createAuthRepo from 'src/repositories/auth';
import createProfileRepo from 'src/repositories/profile';
import createEstimatesRepo from 'src/repositories/estimates';
import createFilesRepo from 'src/repositories/files';
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

export function createRepositories(http: AxiosInstance) {
  const repositories = {
    'auth': createAuthRepo(http),
    'profile': createProfileRepo(http),
    'estimates': createEstimatesRepo(http),
    'files': createFilesRepo(http),
  };

  return repositories;
}

export function createHttp() {
  const http = axios.create({
    baseURL: process.env.API_BASE,
  });

  http.interceptors.request.use((config) => {
    const token = Token.get();

    if(!token) return config;

    if(config.data instanceof FormData) {
      config.data.append('token', token);
    } else {
      const formData = new FormData();
      formData.append('token', token);
      config.data = formData;
    }

    return config;
  });

  return http;
}

export const httpKey: InjectionKey<AxiosInstance> = Symbol();
export const repositoriesKey: InjectionKey<ReturnType<typeof createRepositories>> = Symbol();

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $repositories: ReturnType<typeof createRepositories>,
    $http: AxiosInstance,
  }
}
