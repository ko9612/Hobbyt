export const getAccessToken = () => {
  let accessToken: any = "";
  if (typeof window !== "undefined") {
    accessToken = `Bearer ${localStorage.getItem("authorization")}`;
  }

  return accessToken;
};

export const setTokens = (newAccessToken: string, newRefreshToken?: string) => {
  localStorage.setItem("authorization", newAccessToken);

  if (newRefreshToken) {
    localStorage.setItem("refresh", newRefreshToken);
  }
};
