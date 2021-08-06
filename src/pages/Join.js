import React, { useEffect } from "react";
import EntherRoom from "../components/EntherRoom";
import ListRoom from "../components/ListRoom";
import { useHistory } from "react-router-dom";

export default function SetUserName() {
  let history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("username") == null) {
      history.push("/set/username");
    }
  }, [history]);

  return (
    <div>
      <div
        // style={{ height: "47vh" }}
        className="container mt-5"
      >
        <div class="row">
          <div class="col-sm">
            <EntherRoom />
          </div>
          <div class="col-sm">
            <ListRoom />
          </div>
        </div>
      </div>
    </div>
  );
}
