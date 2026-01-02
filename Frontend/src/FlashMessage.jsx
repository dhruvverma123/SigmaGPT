import { Context } from "./ContextApi.jsx";
import { useContext } from "react";

export default function FlashMessage() {
  let { flash } = useContext(Context);

  if (!flash.message) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "60px",
        padding: "10px 20px",
        backgroundColor: flash.type === "success" ? "green" : "red",
        color: "white",
        borderRadius: "5px",
        zIndex: 999,
        width: "70%",
        height: "20px ",
        fontFamily: "sans-serif",
      }}
    >
      {flash.message}
    </div>
  );
}
