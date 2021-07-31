import React, { useState } from "react";
import axios from "axios";

const ResetPassword = (props) => {
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [alert, setAlert] = useState("");

  const changePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (!value) {
      setErrorPassword("password tidak boleh kosong!!");
    } else {
      setErrorPassword("");
    }
  };

  const changeConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (!value) {
      setErrorConfirmPassword("Confirmasi password tidak boleh kosong!!");
    } else if (password !== value) {
      setErrorConfirmPassword("Password tidak cocok!!");
    } else {
      setErrorConfirmPassword("");
    }
  };

  const simpanPassword = () => {
    const data = {
      password: password,
      token: props.match.params.token,
    };
    axios.put("http://localhost:3001/resetPassword", data).then((result) => {
      if (result) {
        setPassword("");
        setConfirmPassword("");
        setAlert("password berhasil di ganti");
        setTimeout(() => {
          setAlert("");
        }, 3000);
      }
    });
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                {alert && <div className="alert alert-primary">{alert}</div>}
                <div className="form-group">
                  <label for="">New Password</label>
                  <input
                    type="password"
                    placeholder="Masukan Password Baru"
                    className="form-control"
                    value={password}
                    onChange={changePassword}
                  />
                  {errorPassword && (
                    <p className="text-danger">{errorPassword}</p>
                  )}
                </div>
                <div className="form-group">
                  <label for="">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Ulangi password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={changeConfirmPassword}
                  />
                  {errorConfirmPassword && (
                    <p className="text-danger">{errorConfirmPassword}</p>
                  )}
                </div>
                <div className="row">
                  <div class="col">
                    <button className="btn btn-info" onClick={simpanPassword}>
                      Simpan
                    </button>
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

export default ResetPassword;
