import React, { useState } from "react";
import axios from "axios";

const LupaPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");

  const changeEmail = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const kirim = () => {
    if (!email) {
      setError("email wajib diisi");
    } else {
      axios
        .put("http://localhost:3001/forgotPassword", { email: email })
        .then((result) => {
          setEmail("");
          setAlert("Silahkan cek email anda");
          setTimeout(() => {
            setAlert("");
          }, 3000);
        });
    }
  };

  return (
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
                {alert && (
                  <div className="alert alert-info">
                    <p>{alert}</p>
                  </div>
                )}
                <div className="form-group">
                  <label className="form-group">Email</label>
                  <input
                    type="email"
                    placeholder="Masukan Email"
                    className="form-control"
                    value={email}
                    onChange={changeEmail}
                  />
                </div>
                <button className="btn btn-primary" onClick={kirim}>
                  Kirim
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LupaPassword;
