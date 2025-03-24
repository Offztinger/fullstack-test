import React from "react";
import { useForm } from "react-hook-form";
import "@/styles/login.css";
import { useAuth } from "@/hooks/useAuth";

const Form = () => {
  const { login, register, token, user } = useAuth();

  const {
    register: registerLogin,
    handleSubmit: handleLogin,
    formState: { errors: loginErrors },
  } = useForm();

  const {
    register: registerSignup,
    handleSubmit: handleSignup,
    formState: { errors: signupErrors },
  } = useForm();

  const onLogin = async (data) => {
    console.log("entre", data);

    try {
      await login(data.email, data.password);
      // redirigir o mostrar mensaje
    } catch (e) {
      console.error(e);
    }
  };

  const onSignup = async (data) => {
    try {
      await register(data.email, data.password);
      // mostrar éxito o redirigir
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="wrapper">
      <div className="card-switch">
        <label className="switch">
          <input type="checkbox" className="toggle" />
          <span className="slider"></span>
          <span className="card-side"></span>

          <div className="flip-card__inner">
            {/* LOGIN FORM */}
            <div className="flip-card__front">
              <div className="title">Log in</div>
              <form
                id="login"
                className="flip-card__form flex flex-col gap-2"
                onSubmit={handleLogin(onLogin)}
              >
                <input
                  className={`flip-card__input ${
                    loginErrors.email ? "border-red-500" : ""
                  }`}
                  placeholder="Email"
                  type="email"
                  {...registerLogin("email", { required: "Email is required" })}
                />
                {loginErrors.email && (
                  <p className="text-red-500 text-sm -mt-1">
                    {loginErrors.email.message}
                  </p>
                )}

                <input
                  className={`flip-card__input ${
                    loginErrors.password ? "border-red-500" : ""
                  }`}
                  placeholder="Password"
                  type="password"
                  {...registerLogin("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {loginErrors.password && (
                  <p className="text-red-500 text-sm -mt-1">
                    {loginErrors.password.message}
                  </p>
                )}

                <button type="submit" className="flip-card__btn mt-2">
                  Let's go!
                </button>
              </form>
            </div>

            {/* SIGNUP FORM */}
            <div className="flip-card__back">
              <div className="title">Sign up</div>
              <form
                id="signup"
                className="flip-card__form"
                onSubmit={handleSignup(onSignup)}
              >
                <input
                  className={`flip-card__input ${
                    signupErrors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Name"
                  {...registerSignup("name", { required: "Name is required" })}
                />
                {signupErrors.name && (
                  <p className="text-red-500 text-sm -mt-1">
                    {signupErrors.name.message}
                  </p>
                )}
                <input
                  className="flip-card__input"
                  placeholder="Email"
                  type="email"
                  {...registerSignup("email", {
                    required: "Email is required",
                  })}
                />
                <input
                  className="flip-card__input"
                  placeholder="Password"
                  type="password"
                  {...registerSignup("password", {
                    required: "Password is required",
                  })}
                />
                <button type="submit" className="flip-card__btn">
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
