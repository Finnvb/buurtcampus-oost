import { useState, useRef } from "react";
import classes from "./auth-form.module.css";

import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    if (data.message === "User already exists") {
      throw new Error("User already exists");
    } else {
      throw new Error(data.message || "Something went wrong");
    }
  }

  return data;
}

function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (!result.error) {
        router.replace("/");
      } else {
        setErrorMessage(result.error);
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      }

      console.log(result);
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
        setErrorMessage(result.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      } catch (error) {
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      }
    }
  }

  return (
    <>
      <form className={classes.auth} onSubmit={submitHandler}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        {errorMessage && <div className={classes.error}>{errorMessage}</div>}
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </>
  );
}

export default AuthForm;
