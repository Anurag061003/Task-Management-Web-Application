import React, { useState } from "react";
import axios from "axios";
import { Spinner, Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(true);
  const [login, setLogin] = useState(true);
  const [signup, setSignup] = useState(false);
  const [name, setName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [showOTPContent, setShowOTPContent] = useState(false);
  const [otpSend, setOtpSend] = useState("");
  const [otpEntered, setOtpEntered] = useState("");
  const [showSuccessOTPmessage, setShowSuccessOTPmessage] = useState(false);
  const [showFailedOTPmessage, setShowFailedOTPmessage] = useState(false);


  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingSignup, setLoadingSignup] = useState(false);
  const [loadingOTP, setLoadingOTP] = useState(false);
  const [disableSignupButton, setDisableSignupButton] = useState(true);


  const doSignUp = () => {
    setLoadingSignup(true);
    axios({
      url: apiUrl + "/auth/register",
      method: "post",
      data: {
        name,
        email: signUpEmail,
        password: signUpPassword,
      },
    })
      .then((res) => {
        setLoadingSignup(false);
        if (res.data.success) {
          showLoginDiv();
        }
      })
      .catch(() => {
        setLoadingSignup(false);
      });
  };

  const doLogin = () => {
    setLoadingLogin(true);
    axios({
      url: apiUrl + "/auth/login",
      method: "post",
      data: {
        email: loginEmail,
        password: loginPassword,
      },
    })
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("token", res.data.data.token);
          navigate("/tasks");
        }
        setLoadingLogin(false);
      })
      .catch(() => {
        setLoadingLogin(false);
      });
  };

  const sendOTP = () => {
    setLoadingOTP(true);
    axios({
      url: apiUrl + "/send/otp/for/signup",
      method: "post",
      data: { email: signUpEmail },
    })
      .then((res) => {
        if (res.data.success) {
          setShowOTPContent(true);
          setOtpSend(res.data.data);
        }
        setLoadingOTP(false);
      })
      .catch(() => {
        setLoadingOTP(false);
      });
  };

  const verifyOTP = () => {
    setShowSuccessOTPmessage(false);
    setShowFailedOTPmessage(false);
    if (parseInt(otpSend) === parseInt(otpEntered)) {
      setShowSuccessOTPmessage(true);
      setShowOTPContent(false);
      setDisableSignupButton(false);
    } else {
      setShowFailedOTPmessage(true);
    }
  };

  const resetOTP = () => {
    setShowOTPContent(false);
    setShowSuccessOTPmessage(false);
    setShowFailedOTPmessage(false);
    setDisableSignupButton(true);
    setOtpEntered("");
  };

  const showLoginDiv = () => {
    resetOTP();
    setLogin(true);
    setSignup(false);
  };

  const showSignupDiv = () => {
    resetOTP();
    setSignup(true);
    setLogin(false);
  };

  if (!show) return null;
  return (
    <>
      {/* FULL SCREEN LOADER */}
      {(loadingSignup || loadingLogin) && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(218, 248, 247, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            flexDirection: "column",
          }}
        >
          <Spinner animation="border" variant="light" />
          <span className="text-light mt-2 fs-5">
            {loadingSignup ? "Processing..." : "Logging in..."}
          </span>
        </div>
      )}

      {/* LOGIN / SIGNUP SCREEN */}
      <div
        className="w-100 min-vh-100 d-flex justify-content-center align-items-center bg-light"
        style={{ position: "fixed", top: 0, left: 0, zIndex: 999 }}
      >
        <div className="container">
          <div className="row align-items-center">

            {/* LEFT */}
            <div className="col-12 col-lg-6 text-center text-lg-start mb-4 mb-lg-0 p-4">

              <span className="badge bg-secondary mb-3 px-3 py-2">
                Manage all your tasks in one place !
              </span>

              <h1 className="text-primary display-4 fw-bold mb-3">
                Smart & Faster <br />
                <span className="text-dark">Task Manager</span>
              </h1>

              <p className="text-muted fs-5 mb-4">
                Plan, track, and complete your tasks effortlessly.

              </p>


            </div>


            {/* RIGHT LOGIN / SIGNUP CARD */}
            <div className="col-12 col-lg-6 d-flex justify-content-center">
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "30px",
                  borderRadius: "12px",
                  width: "350px",
                  maxWidth: "90%",
                  boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                }}
              >
                <h3 className="text-center mb-3 fw-bold text-nowrap">
                  {login
                    ? <>Login To Your <span className="text-primary">Account</span></>
                    : <>Create a New <span className="text-primary">Account</span></>
                  }
                </h3>


                <Form>
                  {/* SIGNUP NAME */}
                  {signup && (
                    <Form.Group className="mb-2">
                      <Form.Label>User Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>
                  )}

                  {/* EMAIL */}
                  <Form.Group className="mb-2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      disabled={showSuccessOTPmessage}
                      onChange={(e) =>
                        login
                          ? setLoginEmail(e.target.value)
                          : setSignUpEmail(e.target.value)
                      }
                    />
                  </Form.Group>

                  {/* OTP */}
                  {signup && !showOTPContent && (
                    <Button
                      variant="success"
                      className="mb-2 w-100"
                      onClick={sendOTP}
                      disabled={loadingOTP}
                    >
                      {loadingOTP ? "Sending OTP..." : "Verify Email"}
                    </Button>
                  )}

                  {signup && showOTPContent && (
                    <Form.Group className="mb-2">
                      <p className="text-success fw-bold">
                        OTP sent to your email
                      </p>
                      <Form.Control
                        placeholder="Enter OTP"
                        onChange={(e) => setOtpEntered(e.target.value)}
                      />
                      <Button
                        className="mt-2 w-100"
                        variant="warning"
                        onClick={verifyOTP}
                      >
                        Verify OTP
                      </Button>
                    </Form.Group>
                  )}

                  {showSuccessOTPmessage && (
                    <Alert variant="success">
                      OTP Verified Successfully
                    </Alert>
                  )}
                  {showFailedOTPmessage && (
                    <Alert variant="danger">Incorrect OTP</Alert>
                  )}

                  {/* PASSWORD */}
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      onChange={(e) =>
                        login
                          ? setLoginPassword(e.target.value)
                          : setSignUpPassword(e.target.value)
                      }
                    />
                  </Form.Group>

                  {/* SUBMIT */}
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={login ? doLogin : doSignUp}
                    disabled={login ? loadingLogin : disableSignupButton}
                  >
                    {login && loadingLogin
                      ? "Logging in..."
                      : login
                        ? "Login"
                        : "Sign Up"}
                  </Button>

                  {/* TOGGLE */}
                  <p className="mt-3 text-center">
                    {login ? (
                      <>
                        Don’t have an account?{" "}
                        <span
                          className="text-success fw-bold"
                          style={{ cursor: "pointer" }}
                          onClick={showSignupDiv}
                        >
                          Sign Up
                        </span>
                      </>
                    ) : (
                      <>
                        Already have an account?{" "}
                        <span
                          className="text-success fw-bold"
                          style={{ cursor: "pointer" }}
                          onClick={showLoginDiv}
                        >
                          Login
                        </span>
                      </>
                    )}
                  </p>
                </Form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
