import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "@/styles/login.css";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();

  const [switchState, setSwitchState] = useState(false);

  const { login, register } = useAuth();

  const {
    register: registerLogin,
    handleSubmit: handleLogin,
    formState: { errors: loginErrors },
  } = useForm();

  const {
    reset: resetRegister,
    register: registerSignup,
    handleSubmit: handleSignup,
    formState: { errors: signupErrors },
  } = useForm();

  useEffect(() => {
    console.log("value", switchState);
  }, [switchState]);

  const onLogin = async (data) => {
    try {
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch (e) {
      console.error(e);
    }
  };

  const onSignup = async (data) => {
    try {
      await register({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      resetRegister();
      setSwitchState(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="wrapper">
      <div className="card-switch">
        <label className="switch">
          <input
            onChange={(e) => {
              setSwitchState(e.target.checked);
            }}
            checked={switchState}
            type="checkbox"
            className="toggle"
          />
          <span className="slider"></span>
          <span className="card-side"></span>

          <div className="flip-card__inner">
            {/* LOGIN FORM */}
            <div className="flip-card__front">
              <div className="title">Log in</div>
              <form
                autoComplete="off"
                id="login"
                className="flip-card__form flex flex-col gap-1"
                onSubmit={handleLogin(onLogin)}
              >
                <div className="flex flex-col gap-1 items-start h-16">
                  <input
                    className={`flip-card__input ${
                      loginErrors.email ? "border-red-500" : ""
                    }`}
                    placeholder="Email"
                    type="email"
                    {...registerLogin("email", {
                      required: "No dejes este campo vacío.",
                    })}
                  />
                  {loginErrors.email && (
                    <span className="flex items-center gap-1 text-red-500 text-sm pl-2">
                      <i className="fas fa-triangle-exclamation" />
                      {loginErrors.email.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1 items-start h-16">
                  <input
                    className={`flip-card__input ${
                      loginErrors.password ? "border-red-500" : ""
                    }`}
                    placeholder="Password"
                    type="password"
                    {...registerLogin("password", {
                      required: "No dejes este campo vacío.",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  {loginErrors.password && (
                    <span className="flex items-center gap-1 text-red-500 text-sm pl-2">
                      <i className="fas fa-triangle-exclamation" />
                      {loginErrors.password.message}
                    </span>
                  )}
                </div>

                <button type="submit" className="flip-card__btn mt-2">
                  Let's go!
                </button>
              </form>
            </div>

            {/* SIGNUP FORM */}
            <div className="flip-card__back">
              <div className="title">Sign up</div>
              <form
                autoComplete="off"
                id="signup"
                className="flip-card__form flex flex-col gap-1"
                onSubmit={handleSignup(onSignup)}
              >
                <div className="flex flex-col gap-1 items-start h-16">
                  <input
                    className={`flip-card__input ${
                      signupErrors.name ? "border-red-500" : ""
                    }`}
                    placeholder="Name"
                    type="text"
                    {...registerSignup("name", {
                      required: "No dejes este campo vacío.",
                    })}
                  />
                  {signupErrors.name && (
                    <span className="flex items-center gap-1 text-red-500 text-sm pl-2">
                      <i className="fas fa-triangle-exclamation" />
                      {signupErrors.name.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1 items-start h-16">
                  <input
                    className={`flip-card__input ${
                      signupErrors.email ? "border-red-500" : ""
                    }`}
                    placeholder="Email"
                    type="email"
                    {...registerSignup("email", {
                      required: "No dejes este campo vacío.",
                    })}
                  />
                  {signupErrors.email && (
                    <span className="flex items-center gap-1 text-red-500 text-sm pl-2">
                      <i className="fas fa-triangle-exclamation" />
                      {signupErrors.email.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1 items-start h-16">
                  <input
                    className={`flip-card__input ${
                      signupErrors.password ? "border-red-500" : ""
                    }`}
                    placeholder="Password"
                    type="password"
                    {...registerSignup("password", {
                      required: "No dejes este campo vacío.",
                    })}
                  />
                  {signupErrors.password && (
                    <span className="flex items-center gap-1 text-red-500 text-sm pl-2">
                      <i className="fas fa-triangle-exclamation" />
                      {signupErrors.password.message}
                    </span>
                  )}
                </div>

                <button type="submit" className="flip-card__btn mt-2">
                  Confirm!
                </button>
              </form>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Form;
