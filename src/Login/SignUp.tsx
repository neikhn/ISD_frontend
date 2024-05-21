import React, { useState } from "react";
import "./LoginPage.css";
import { NavLink, useNavigate } from "react-router-dom";
import Loading from "../Loading";
function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    NAME: "",
    EMAIL: "",
    PASSWORD: "",
    CONFIRMPASSWORD: "",
  });

  const navigate = useNavigate();

  const handleUserInput = (fieldName: string) => {
    return (e) => {
      setUserCredentials((prev) => {
        return {
          ...prev,
          [fieldName.toUpperCase()]: e.target.value,
        };
      });
    };
  };

  const handleSignUp = async () => {
    const response = await fetch("https://melanine-backend.onrender.com/api/user/sign-up", {
      method: "post",
      body: JSON.stringify({
        name: userCredentials.NAME,
        email: userCredentials.EMAIL,
        password: userCredentials.PASSWORD,
        confirmPassword: userCredentials.CONFIRMPASSWORD,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const status = response.status;
    if (status === 200) {
      const data = await response.json();
      //handle data
      console.log(data);
      navigate("/login");
    }
  };
  return (
    <>
      {isLoading && <Loading />}
      <div className="login">
        <img
          src="https://i.pinimg.com/736x/0b/6f/12/0b6f12699ee63503fe2b05812c7b9c2e.jpg"
          alt="login"
          className="login__img"
        />

        <form action="" className="login__form">
          <h1 className="login__title">Đăng ký</h1>

          <div className="login__content">
            <div className="login__box">
              <i className="ri-user-3-line login__icon"></i>

              <div className="login__box-input">
                <input
                  type="email"
                  required
                  className="login__input"
                  id="login-email"
                  placeholder=" "
                  onChange={handleUserInput("NAME")}
                />
                <label htmlFor="login-email" className="login__label">
                  NAME
                </label>
              </div>
            </div>

            <div className="login__box">
              <i className="ri-user-3-line login__icon"></i>

              <div className="login__box-input">
                <input
                  type="email"
                  required
                  className="login__input"
                  id="login-email"
                  placeholder=" "
                  onChange={handleUserInput("EMAIL")}
                />
                <label htmlFor="login-email" className="login__label">
                  Email
                </label>
              </div>
            </div>

            <div className="login__box">
              <i className="ri-lock-2-line login__icon"></i>

              <div className="login__box-input">
                <input
                  type="password"
                  required
                  className="login__input"
                  id="login-pass"
                  placeholder=" "
                  onChange={handleUserInput("PASSWORD")}
                />
                <label htmlFor="login-pass" className="login__label">
                  Mật khẩu
                </label>
                <i className="ri-eye-off-line login__eye" id="login-eye"></i>
              </div>
            </div>
            <div className="login__box">
              <i className="ri-lock-2-line login__icon"></i>

              <div className="login__box-input">
                <input
                  type="password"
                  required
                  className="login__input"
                  id="login-pass"
                  placeholder=" "
                  onChange={handleUserInput("CONFIRMPASSWORD")}
                />
                <label htmlFor="login-pass" className="login__label">
                  Nhập lại mật khẩu
                </label>
                <i className="ri-eye-off-line login__eye" id="login-eye"></i>
              </div>
            </div>
          </div>

          <div className="login__check">
            <div className="login__check-group">
              <input
                type="checkbox"
                className="login__check-input"
                id="login-check"
              />
              <label htmlFor="login-check" className="login__check-label">
                Tôi đồng ý với các điều khoản dịch vụ
              </label>
            </div>
          </div>

          <button
            type="button"
            className="login__button"
            onClick={handleSignUp}
          >
            Đăng ký
          </button>

          <p className="login__register">
            Bạn đã có tài khoản{" "}
            <NavLink to="/" className="ml-3">
              Đăng Nhập
            </NavLink>
          </p>
        </form>
      </div>
    </>
  );
}

export default SignUp;
