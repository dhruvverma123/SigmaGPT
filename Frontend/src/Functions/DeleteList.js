import { useContext } from "react";
import { Context } from "../ContextApi";
import { GetNewChat } from "../Functions/getNewChat.js";

export function DeleteList() {
  let { setAllThread, allTread, currThreadId } = useContext(Context);
  let getNewChat = GetNewChat();

  async function deleteList(threadId) {
    try {
      let response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/thread/${threadId}`,
        {
          method: "DELETE",
        }
      );

      let origRes = await response.json();
      setAllThread(allTread.filter((e) => e.threadId !== threadId));

      if (threadId === currThreadId) {
        getNewChat();
      }
    } catch (err) {
      console.log(err);
    }
  }
  return deleteList;
}
