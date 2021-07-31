import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Daftar = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");

  const onChangeUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
    setError("");
  };

  const onChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    setError("");
  };

  const onChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    setError("");
  };

  const clickDaftar = () => {
    const data = {
      username: username,
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:3001/daftar", data)
      .then((result) => {
        if (result) {
          if (result.data) {
            setUsername("");
            setEmail("");
            setPassword("");
            setAlert(result.data.message);
            setTimeout(() => {
              setAlert("");
            }, 3000);
          }
        }
      })
      .catch((e) => {
        setError(e.response.data.message);
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                {error && (
                  <div className="alert alert-danger">
                    <p>{error}</p>
                  </div>
                )}
                {alert && (
                  <div className="alert alert-primary">
                    <p>{alert}</p>
                  </div>
                )}
                <div className="form-group">
                  <label for="">Username</label>
                  <input
                    type="text"
                    placeholder="Username"
                    className="form-control"
                    value={username}
                    onChange={onChangeUsername}
                  />
                </div>

                <div className="form-group">
                  <label for="">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    value={email}
                    onChange={onChangeEmail}
                  />
                </div>

                <div className="form-group">
                  <label for="">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    value={password}
                    onChange={onChangePassword}
                  />
                </div>
                <div className="row">
                  <div class="col">
                    <button className="btn btn-info" onClick={clickDaftar}>
                      Daftar
                    </button>
                    <Link to="/">
                      <button
                        class="btn btn-warning"
                        style={{ marginLeft: "20px" }}
                      >
                        Kembali
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Daftar;
