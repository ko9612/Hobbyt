import { postReToken } from "../api/signApi";

const LoginRefresh = async () => {
  const tokenSubmit = await postReToken();

  if ((tokenSubmit as any).status === 200) {
    const accessToken = (tokenSubmit as any).headers.authorization;
    const refreshToken = (tokenSubmit as any).headers.refreshtoken;
    localStorage.setItem("authorization", accessToken);
    localStorage.setItem("refresh", refreshToken);
    setTimeout(LoginRefresh, 60000 * 29);
  }
};

export default LoginRefresh;
