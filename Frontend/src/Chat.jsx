import "./Chat.css";
import { useContext, useEffect, useState } from "react";
import { Context } from "./ContextApi.jsx";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

export default function Chat() {
  let { newChat, prevsChat, reply, setDropDown } = useContext(Context);
  let [latestChat, setLatestChat] = useState(null);

  useEffect(() => {
    if (reply == null) {
      setLatestChat(null);
      return;
    }
    if (!prevsChat.length) return;

    let content = reply.split(" ");
    let idx = 0;

    const interval = setInterval(() => {
      setLatestChat(content.slice(0, idx + 1).join(" "));
      idx++;
      if (idx >= content.length) return clearInterval(interval);
    }, 40);
  }, [reply, prevsChat]);

  function dropDownFalse() {
    setDropDown(false);
    console.log("false");
  }

  return (
    <>
      {newChat && (
        <h1 style={{ fontFamily: "sans-serif" }}>Start with New Chat</h1>
      )}
      <div className="chats" onClick={() => dropDownFalse()}>
        {prevsChat?.slice(0, -1).map((chat, idx) => (
          <div className={chat.role == "user" ? "userDiv" : "gptDiv"} key={idx}>
            {chat.role == "user" ? (
              <p className="userMessage">{chat.content}</p>
            ) : (
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {chat.content}
              </ReactMarkdown>
            )}
          </div>
        ))}

        {prevsChat.length > 0 &&
          (latestChat !== null ? (
            <div className="gptDiv" key="typing">
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {latestChat}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="gptDiv" key="non-typing">
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {prevsChat[prevsChat.length - 1].content}
              </ReactMarkdown>
            </div>
          ))}
      </div>
    </>
  );
}
