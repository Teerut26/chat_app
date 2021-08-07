/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";

export default function setUserName() {
  const [Username, setUsername] = useState("");
  let history = useHistory();

  const setUsernameToLocalStore = () => {
    if(Username.length !== 0){
      localStorage.setItem("username",Username)
      localStorage.setItem("username_key",uuidv4())
      localStorage.setItem("sound",true)
      history.push("/join")
    }
  }

  useEffect(() => {
    if(localStorage.getItem("username") !== null && localStorage.getItem("username_key") !== null){
      history.push("/join")
    }
  }, [history])

  return (
    <div>
      <div className="container mt-5">
        <div className="card h-100 mb-3">
          <div className="card-body">
            <h5 className="card-title">
              <i class="far fa-comment-lines "></i> Chat App
            </h5>
            <hr />
            <div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  UserName
                </label>
                <input
                  onChange={(v) => setUsername(v.target.value)}
                  value={Username}
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                />
              </div>
              <hr />

              <div class="d-grid gap-2">
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button onClick={()=>setUsernameToLocalStore()} type="button" class="btn btn-primary">
                    <i class="fas fa-sign-in-alt"></i> Set UserName
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
