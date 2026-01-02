import { useContext } from "react";
import { Context } from "../ContextApi";

export function useLogout() {
  let { setCurrentUser, currentUser, showFlash } = useContext(Context);

  async function logout() {
    try {
      let data = await fetch("http://localhost:8080/user/logout");
      let origRes = await data.json();
      if (!origRes.success) {
        setCurrentUser(currentUser);
        showFlash("Something went wrong", "error");
      } else {
        setCurrentUser("");
        showFlash("Logout successfully", "success");
      }
    } catch (e) {
      console.log(e);
    }
  }
  return logout;
}
