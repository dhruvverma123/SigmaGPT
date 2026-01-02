import { useContext, useEffect } from "react";
import { Context } from "../ContextApi";
import { v1 as uuidv1 } from "uuid";

export function GetNewChat() {
  let {
    setNewchat,
    setPrompt,
    setReply,
    setThreadId,
    setPrevsChat,
    setLogin,
    setSignup,
  } = useContext(Context);

  function getNewChat() {
    setNewchat(true);
    setPrompt("");
    setReply(null);
    setThreadId(uuidv1());
    setPrevsChat([]);
    setLogin(false);
    setSignup(false);
  }
  return getNewChat;
}
