import { GhRepo, OAuthAccessTokens } from "@/lib/types";
import { prisma } from "@/lib/prisma";

export const getOAuthToken = async (
  id: string,
  bearer: string
): Promise<OAuthAccessTokens> => {
  const response = await fetch(
    `https://api.clerk.com/v1/users/${id}/oauth_access_tokens/github`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearer}`,
      },
    }
  );

  const data = await response.json();
  return data;
};

export const getUsername = async (token: string) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch("https://api.github.com/user", options);
  const data = await response.json();
  return data;
};

export const fetchRepos = async (token: string) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const username = await getUsername(token);
  // `https://api.github.com/users/${username.login}/repos`,
  const userRepos = await fetch(
    `https://api.github.com/search/repositories?q=user:${username.login}&sort=stars&order=desc`,
    options
  );
  const data = await userRepos.json();
  return data;
};

export const createProduct = async (url: string) => {
  const response = await fetch(url);
  const data = (await response.json()) as any;

  const product = await prisma.product.create({
    data: {
      name: data.name,
      demo: data.demo,
      tagline: data.tagline,
      description: data.description,
      link: data.link,
      authorId: data.authorId,
    },
  });

  return product;
};
