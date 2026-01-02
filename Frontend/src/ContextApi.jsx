import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const Context = createContext();

export default function ContextApi({ children }) {
  const [reply, setReply] = useState("");
  const [prompt, setPrompt] = useState("");
  const [currThreadId, setThreadId] = useState(uuidv4());
  const [prevsChat, setPrevsChat] = useState([]);
  const [newChat, setNewchat] = useState(true);
  const [allTread, setAllThread] = useState([]);
  const [dropDown, setDropDown] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [signup, setSignup] = useState(false);
  const [signUpUser, setSignupUser] = useState("");
  const [signUpEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState({ message: "", type: "" });
  const [upgrade, setUpgrade] = useState(false);

  const showFlash = (message, type = "success") => {
    setFlash({ message, type });

    setTimeout(() => {
      setFlash({ message: "", type: "" });
    }, 3000);
  };

  const providersValues = {
    reply,
    setReply,
    prompt,
    setPrompt,
    currThreadId,
    setThreadId,
    prevsChat,
    setPrevsChat,
    newChat,
    setNewchat,
    allTread,
    setAllThread,
    dropDown,
    setDropDown,
    login,
    setLogin,
    user,
    setUser,
    password,
    setPassword,
    currentUser,
    setCurrentUser,
    signup,
    setSignup,
    signUpUser,
    setSignupUser,
    signUpEmail,
    setSignupEmail,
    signupPassword,
    setSignupPassword,
    loading,
    setLoading,
    flash,
    showFlash,
    upgrade,
    setUpgrade,
  };

  return (
    <Context.Provider value={providersValues}>{children}</Context.Provider>
  );
}
