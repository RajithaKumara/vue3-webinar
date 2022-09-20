export interface GithubUser {
  id: number;
  login: string;
  name: string;
  html_url: string;
  avatar_url: string;
  repos_url: string;
  type: "User" | "Organization";
}

export interface GithubRepo {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
}
