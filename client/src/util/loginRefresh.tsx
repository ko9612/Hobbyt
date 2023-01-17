import { postReToken } from "../api/signApi";

const loginRefresh = async () => {
  const loginSubmit = await postReToken();
  // console.log(loginResult.status);
  switch ((loginSubmit as any).status) {
    default:
      localStorage.setItem(
        "authorization",
        (loginSubmit as any).headers.Authorization,
      );
  }
};

export default loginRefresh;
