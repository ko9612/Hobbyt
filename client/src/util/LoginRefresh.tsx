import { postReToken } from "../api/signApi";

const LoginRefresh = async () => {
  try {
    const tokenSubmit = await postReToken();
    switch ((tokenSubmit as any).status) {
      case 200:
        localStorage.setItem(
          "authorization",
          (tokenSubmit as any).headers.authorization,
        );
        localStorage.setItem(
          "refresh",
          (tokenSubmit as any).headers.refreshtoken,
        );
        setTimeout(LoginRefresh, 60000 * 20);
        console.log("토큰 갱신");
        break;
      // case 401:
      //   localStorage.removeItem("authorization");
      //   localStorage.removeItem("refresh");
      //   localStorage.clear();
      //   window.location.reload();
      //   break;
      default:
    }
  } catch (err) {
    if ((err as any).response.status === 401) {
      localStorage.removeItem("authorization");
      localStorage.removeItem("refresh");
      localStorage.clear();
      window.location.reload();
    }
  }

  // if ((tokenSubmit as any).status === 200) {
  //   const accessToken = (tokenSubmit as any).headers.authorization;
  //   const refreshToken = (tokenSubmit as any).headers.refreshtoken;
  //   localStorage.setItem("authorization", accessToken);
  //   localStorage.setItem("refresh", refreshToken);
  //   setTimeout(LoginRefresh, 60000 * 20);
  //   console.log("토큰 갱신");
  // }
};

export default LoginRefresh;
