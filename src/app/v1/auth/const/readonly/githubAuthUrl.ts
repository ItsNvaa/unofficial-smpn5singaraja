import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} from "../../../../../const/config";

export const githubUrl: string = `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&scope=user%20user:email%20user:follow`;

export const userGithubUrl: string = "https://api.github.com/user";

export const rediretGithubAuthUrl: string = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user%20user:email%20user:follow`;
