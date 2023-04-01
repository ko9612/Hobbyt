import { useEffect } from "react";

interface AccessUidCotrolProps {
  router: any;
  setIsLogin(state: boolean): void;
  uid: number;
  userId: number;
}

export default function UrlAccessControl({
  router,
  setIsLogin,
  uid,
  userId,
}: AccessUidCotrolProps) {
  useEffect(() => {
    if (router.isReady) {
      if (typeof window !== "undefined") {
        if (localStorage.getItem("authorization")) {
          setIsLogin(true);
          if (uid !== userId) {
            alert("유효한 접근이 아닙니다.");
            router.back();
          }
        } else {
          setIsLogin(false);
          alert("로그인이 필요한 페이지입니다");
          router.push("/signin");
        }
      }
    }
  }, [router.isReady]);
}
