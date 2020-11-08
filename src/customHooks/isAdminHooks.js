import { useState } from "react";
import { useEffect } from "react";

const useIsAdmin = (props) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("jwtData")) {
      var base64Url = localStorage.getItem("jwtData").split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      setIsAdmin(JSON.parse(jsonPayload).role === "admin");
    }

    return () => {
      setIsAdmin(false);
    };
  }, [localStorage.getItem("jwtData")]);

  return { isAdmin };
};

export default useIsAdmin;
