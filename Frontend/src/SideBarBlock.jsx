import "./SideBarBlock.css";
import { useContext } from "react";
import { Context } from "./ContextApi";
import { Threadtitle } from "./Functions/GetThreadTittle.js";
import { GetNewChat } from "./Functions/getNewChat.js";
import { PreviousChat } from "./Functions/PreviousChat.js";
import { DeleteList } from "./Functions/DeleteList.js";
import banner from "../src/assets/cropped_circle_image.png";

export default function SidebarBlock() {
  let { allTread, currThreadId, currentUser, showFlash, setDropDown } =
    useContext(Context);

  let getNewChat = GetNewChat();
  let getPreviousChat = PreviousChat();
  let deleteList = DeleteList();

  return (
    <section className="sideBar">
      <Threadtitle />
      <button onClick={getNewChat} style={{ fontSize: "1.01rem" }}>
        <img src={banner} alt="gpt logo" className="logo" />
        New chat
        <i className="fa-solid fa-pen-to-square"></i>
      </button>

      <ul className="history">
        {allTread?.map((e) => (
          <li
            key={e.threadId}
            onClick={() => {
              getPreviousChat(e.threadId);
              setDropDown(false);
            }}
            className={e.threadId === currThreadId ? "highlighted" : ""}
          >
            {e.title}
            <i
              className="fa-solid fa-trash"
              onClick={(event) => {
                event.stopPropagation();
                currentUser
                  ? deleteList(e.threadId)
                  : showFlash("You are not logged in", "error");
              }}
            ></i>
          </li>
        ))}
      </ul>

      <div className="sign">
        <p>By Dhruv Verma &hearts;</p>
      </div>
    </section>
  );
}
