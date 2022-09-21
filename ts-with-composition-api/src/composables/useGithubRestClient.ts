import { isRef, ref } from "vue";
import { getGithubRestClient } from "../helper/github-rest-client";
import type { Ref } from "vue";
import type { AxiosResponse, AxiosRequestConfig } from "axios";

export interface Options {
  defaultLoading?: boolean;
}

export type DoGet = (config?: AxiosRequestConfig) => void;

export default function useGithubRestClient<T = any>(
  url: string | Ref<string | undefined>,
  options: Options = { defaultLoading: false }
) {
  const loading: Ref<boolean> = ref(options?.defaultLoading ?? false);
  const response: Ref<AxiosResponse | null> = ref(null);
  const data: Ref<T | null> = ref(null);

  const doGet: DoGet = async (config?: AxiosRequestConfig) => {
    const path = isRef(url) ? url.value : url;
    if (path === undefined) {
      throw Error("Invalid URL path");
    }

    loading.value = true;
    response.value = await getGithubRestClient().get<T>(path, config);
    data.value = response.value?.data;
    // debugger;
    loading.value = false;
  };

  return {
    loading,
    response,
    data,
    doGet,
  };
}
