import React, { useState, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");

  const onChangeUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const onChangePasssword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const submitLogin = () => {
    const data = {
      username: username,
      password: password,
    };
    axios
      .post("http://localhost:3001/login", data)
      .then((result) => {
        if (result) {
          localStorage.setItem("token", result.data.token);
          setRedirect(true);
        }
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  };

  return (
    <Fragment>
      {redirect && <Redirect to="/dashboard" />}
      <div style={{ marginTop: "180px" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card p-4">
                <div className="card-body">
                  {error && (
                    <div className="alert alert-danger">
                      <p>{error}</p>
                    </div>
                  )}
                  <div className="form-group">
                    <label className="form-group">Username</label>
                    <input
                      type="text"
                      placeholder="Username"
                      className="form-control"
                      value={username}
                      onChange={onChangeUsername}
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control"
                      value={password}
                      onChange={onChangePasssword}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <button className="btn btn-info" onClick={submitLogin}>
                        Login
                      </button>
                    </div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                      <Link to="/daftar">Halaman Daftar</Link>
                    </div>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <p>
                      Lupa password?{" "}
                      <Link to="/lupa-password">Click disini.</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
