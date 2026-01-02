import "./Login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Context } from "../ContextApi.jsx";
import { useContext } from "react";

export default function LoginForm() {
  let {
    user,
    setUser,
    password,
    setPassword,
    setCurrentUser,
    setLogin,
    showFlash,
  } = useContext(Context);

  //for login
  async function checkLogin() {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.trim(),
        password: password.trim(),
      }),
    };
    try {
      let data = await fetch("http://localhost:8080/user/login", options);
      let origRes = await data.json();
      if (!origRes.success) {
        setLogin(true);
        setCurrentUser("");
        showFlash("wrong username and password", "error");
      } else {
        setLogin(false);
        setUser("");
        setPassword("");
        setCurrentUser(origRes.message);
        showFlash("Successfully logged in", "success");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="loginStyle">
        <h1 style={{ color: "#0eb1ecff" }}>Login with SigmaGPT</h1>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
          <div className="innerField">
            <div className="childInnerField">
              <TextField
                id="outlined-multiline-flexible"
                label="UserName"
                multiline
                maxRows={4}
                value={user}
                onChange={(e) => setUser(e.target.value)}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "white",
                  },

                  // label color
                  "& .MuiInputLabel-root": {
                    color: "#7dcfedff",
                  },

                  // label focus color
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#7dcfedff",
                  },

                  // border color
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#7dcfedff",
                    },
                    "&:hover fieldset": {
                      borderColor: "#7dcfedff",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7dcfedff",
                    },
                  },
                }}
              />
            </div>
            <div>
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "white",
                  },

                  // label color
                  "& .MuiInputLabel-root": {
                    color: "#7dcfedff",
                  },

                  // label focus color
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#7dcfedff",
                  },

                  // border color
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#7dcfedff",
                    },
                    "&:hover fieldset": {
                      borderColor: "#7dcfedff",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7dcfedff",
                    },
                  },
                }}
              />
            </div>
            <div className="btnStyle">
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" onClick={checkLogin}>
                  Login
                </Button>
              </Stack>
            </div>
          </div>
        </Box>
      </div>
    </>
  );
}
