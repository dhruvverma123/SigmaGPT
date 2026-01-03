import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { useContext, useState } from "react";
import { Context } from "./ContextApi.jsx";
import { ScaleLoader } from "react-spinners";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginForm from "./components/Login.jsx";
import SignupForm from "./components/SignupForm.jsx";
import { useLogout } from "./Functions/Logout.js";
import { useGetReply } from "./Functions/GetReply.js";
import FlashMessage from "./FlashMessage.jsx";
import SidebarBlock from "./SideBarBlock.jsx";
import { GetNewChat } from "./Functions/getNewChat.js";

export default function ChatWindow() {
  let {
    prompt,
    setPrompt,
    dropDown,
    setDropDown,
    login,
    setLogin,
    currentUser,
    signup,
    setSignup,
    loading,
    upgrade,
    setUpgrade,
  } = useContext(Context);

  let logout = useLogout();
  let getReply = useGetReply();
  let [sidebar, setSideBar] = useState(false);
  let getNewChat = GetNewChat();

  function showDropdown() {
    setDropDown(!dropDown);
  }

  return (
    <div className="chatWindow">
      <FlashMessage />
      <div className="navbar">
        <div className="SigmaGPT">
          <span onClick={getNewChat}>SigmaGPT</span>
          <span>
            <i className="fa-solid fa-angle-down"></i>
          </span>
        </div>
        <span className="signupLogin">
          {!currentUser && (
            <div style={{ display: "flex" }}>
              <div>
                <button
                  style={{ color: "#0eb1ecff", border: "1px solid #0eb1ecff" }}
                  onClick={() => {
                    setSignup(true);
                    setDropDown(false);
                  }}
                >
                  signUp
                </button>
              </div>
              <div>
                <button
                  style={{ color: "#0eb1ecff", border: "1px solid #0eb1ecff" }}
                  onClick={() => {
                    setLogin(true);
                    setDropDown(false);
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          )}
        </span>
        <div
          className="userIcon"
          onClick={() => {
            showDropdown();
            setUpgrade(false);
          }}
        >
          <span>
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>

      <div className="hamDiv" onClick={() => setSideBar(!sidebar)}>
        <i className="fa-solid fa-bars"></i>
      </div>

      {dropDown ? (
        <div className="dropdown">
          <p onClick={() => setUpgrade(!upgrade)}>
            <UpgradeIcon sx={{ fontSize: 25 }} />
            Upgrade plan
          </p>

          {currentUser && (
            <p onClick={logout}>
              <LogoutIcon sx={{ fontSize: 25, marginRight: 0.3 }} />
              Log out
            </p>
          )}
        </div>
      ) : (
        ""
      )}
      {upgrade ? (
        <div className="upgrade" onClick={() => setUpgrade(false)}>
          <p>Upgrade plan is about to come</p>
        </div>
      ) : (
        ""
      )}
      {sidebar ? <SidebarBlock /> : ""}
      {sidebar ? (
        <div className="rightDiv" onClick={() => setSideBar(false)}></div>
      ) : (
        ""
      )}
      {signup ? (
        <>
          <SignupForm />
        </>
      ) : (
        <>
          {login ? (
            <>
              <LoginForm />
            </>
          ) : (
            <>
              <Chat />
              <ScaleLoader color="white" loading={loading}></ScaleLoader>
              <div className="chatInput">
                <div className="parent">
                  <div className="userInput">
                    <input
                      placeholder="Ask anything"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyDown={(e) => (e.key === "Enter" ? getReply() : "")}
                      onFocus={() => setDropDown(false)}
                    ></input>
                    <div className="send" onClick={getReply}>
                      <i className="fa-solid fa-paper-plane"></i>
                    </div>
                  </div>
                </div>
                <p>
                  SigmaGPT can make mistakes. Check important info. See Cookie
                  Preferences.
                </p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
