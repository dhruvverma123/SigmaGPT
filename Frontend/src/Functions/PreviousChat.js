import { useContext } from "react";
import { Context } from "../ContextApi";

export function PreviousChat() {
  let {
    currentUser,
    setLogin,
    setThreadId,
    setPrevsChat,
    setNewchat,
    setReply,
  } = useContext(Context);

  async function getPreviousChat(newThreadId) {
    if (!currentUser) {
      setLogin(true);
    } else {
      try {
        let response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/thread/${newThreadId}`
        );
        let origRes = await response.json();
        setThreadId(newThreadId);
        setPrevsChat(origRes.data);
        setNewchat(false);
        setReply(null);
      } catch (err) {
        console.log(err);
      }
    }
  }
  return getPreviousChat;
}
