import "./SignupForm.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Context } from "../ContextApi.jsx";
import { useContext } from "react";

export default function SignupForm() {
  let {
    signUpUser,
    setSignupUser,
    signUpEmail,
    setSignupEmail,
    signupPassword,
    setSignupPassword,
    setCurrentUser,
    setSignup,
    showFlash,
  } = useContext(Context);

  async function signinWithDatabase() {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: signUpUser.trim(),
        password: signupPassword.trim(),
        email: signUpEmail.trim(),
      }),
    };
    try {
      let data = await fetch(
        `${import.meta.env.VITE_API_URL}/user/signup`,
        options
      );
      let origRes = await data.json();
      if (!origRes.success) {
        setSignup(true);
        setCurrentUser("");
        showFlash("something went wrong", "error");
      } else {
        setSignup(false);
        setCurrentUser(origRes.message);
        showFlash("Registerd successfully", "success");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className={`loginStyle`}>
        <h1 style={{ color: "#0eb1ecff" }}>SignUp with SigmaGPT</h1>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
          <div className="innerField">
            <div className="childInnerField">
              <TextField
                label="Name"
                multiline
                maxRows={4}
                value={signUpUser}
                onChange={(e) => setSignupUser(e.target.value)}
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
            <div className="childInnerField">
              <TextField
                id="outlined-multiline-flexible"
                label="Email"
                multiline
                maxRows={4}
                value={signUpEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
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
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
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
                <Button variant="outlined" onClick={signinWithDatabase}>
                  SignUp
                </Button>
              </Stack>
            </div>
          </div>
        </Box>
      </div>
    </>
  );
}
