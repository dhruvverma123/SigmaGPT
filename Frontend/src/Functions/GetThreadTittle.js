import { useContext, useEffect } from "react";
import { Context } from "../ContextApi.jsx";

export function Threadtitle() {
  let { allTread, setAllThread, currThreadId } = useContext(Context);

  async function getThreadTitle() {
    try {
      let res = await fetch("http://localhost:8080/api/thread");
      let oriResp = await res.json();

      let filterdData = oriResp.thread.map((e) => ({
        threadId: e.threadId,
        title: e.title,
      }));

      setAllThread(filterdData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getThreadTitle();
  }, [currThreadId]);
}
