import { useContext, useEffect, useState } from "react";
import { Context } from "../ContextApi.jsx";

export function useGetReply() {
  let {
    setLoading,
    setNewchat,
    prompt,
    currThreadId,
    reply,
    setPrevsChat,
    setReply,
    setPrompt,
  } = useContext(Context);

  useEffect(() => {
    if (prompt && reply) {
      setPrevsChat((prevsChat) => [
        ...prevsChat,
        { role: "user", content: prompt },
        {
          role: "assistant",
          content: reply,
        },
      ]);
    }
    setPrompt("");
  }, [reply]);

  async function getReply() {
    setLoading(true);
    setNewchat(false);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadID: currThreadId,
      }),
    };
    try {
      let response = await fetch("http://localhost:8080/api/chat", options);
      let originalData = await response.json();
      setReply(originalData.reply);
      console.log(originalData);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }
  return getReply;
}
