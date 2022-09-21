import axios from "axios";
import type { AxiosInstance } from "axios";

let instance: AxiosInstance | null = null;

export function getGithubRestClient(): AxiosInstance {
  return (instance ??= createGithubRestClient());
}

function createGithubRestClient(): AxiosInstance {
  console.log("Creating Axios Instance...");
  return axios.create({
    baseURL: "https://api.github.com",
    headers: {
      accept: "application/vnd.github.v3+json",
    },
  });
}
