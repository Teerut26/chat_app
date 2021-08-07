import React, { Component, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

class EntherRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RoomName: "",
      RoomPassword: "",
      listRoom: null,
      username:"null"
    };

  }

  createRoom = (RoomName, RoomPassword) => {
    if (RoomName.length !== 0) {
      this.props.dispatch({
        type: "create_room",
        data: {
          room_name: RoomName,
          room_user_key:localStorage.getItem("username_key"),
          room_owner_username:this.state.username,
          room_password: RoomPassword,
          key_room: uuidv4(),
        },
      });
    }
  };

componentDidMount(){
  this.setState({username:localStorage.getItem("username")})
}

  render() {
    return (
      <>
          <div className="card h-100 mb-3">
            <div className="card-body">
              {/* <center><i class="fad fa-comments fa-10x my-5"></i></center> */}
              <h5 className="card-title d-flex justify-content-between">
                <div><i class="far fa-comment-lines "></i> Chat App</div>
                <div><i class="fas fa-user"></i> {this.state.username}</div>
              </h5>
              <hr />
              <div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Room Code
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
                  />
                </div>
                <hr />

                <div class="d-grid gap-2">
                  <div
                    class="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button type="button" class="btn btn-primary">
                      <i class="fas fa-sign-in-alt"></i> Enter Room
                    </button>
                    <button
                      type="button"
                      class="btn btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#test1"
                    >
                      <i className="fas fa-plus" /> Create Room
                    </button>
                  </div>
                </div>
                <ModulePopup
                  id="test1"
                  sendPropsEx={(v) => {
                    this.createRoom(v.RoomName, v.RoomPassword);
                  }}
                />
              </div>
            </div>
          </div>
      </>
    );
  }
}

const map_data = (state) => {
  return {
    list: state.listReducer,
    number: state.roomReducer,
  };
};

export default connect(map_data)(EntherRoom);

const ModulePopup = (props) => {
  const [roomName, setroomName] = useState(50);
  const [roomPassword, setroomPassword] = useState(50);
  const [RoomName, setRoomName] = useState("");
  const [RoomPassword, setRoomPassword] = useState("");

  const [Checked, setChecked] = useState(false);

  useEffect(() => {
    setroomName(50 - RoomName.length);
    setroomPassword(50 - RoomPassword.length);
  }, [RoomName, RoomPassword]);

  // useEffect(() => {
  //   console.log(props);
  // }, [props]);

  const sendProps = () => {
    if (RoomName.length !== 0 && RoomPassword !== "null") {
      props.sendPropsEx({
        RoomName,
        RoomPassword: RoomPassword.length !== 0 ? RoomPassword : "null",
      });
      setRoomName("");
      setRoomPassword("");
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id={props.id}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby={props.id}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={props.id}>
                Create Room
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="form-check form-switch">
                  {Checked ? (
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      checked
                      onClick={() => {
                        setChecked(false);
                        setRoomPassword("");
                      }}
                    />
                  ) : (
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      onClick={() => {
                        setChecked(true);
                      }}
                    />
                  )}
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckDefault"
                  >
                    Password
                  </label>
                </div>
                <hr />
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Room Name
                  </label>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      {roomName}
                    </span>
                    <input
                      type="text"
                      value={RoomName}
                      onChange={(v) => setRoomName(v.target.value)}
                      className="form-control"
                      placeholder="Room Name"
                      maxLength="50"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                {Checked ? (
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Room Password
                    </label>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        {roomPassword}
                      </span>
                      <input
                        type="text"
                        value={RoomPassword}
                        onChange={(v) => setRoomPassword(v.target.value)}
                        className="form-control"
                        placeholder="Password"
                        maxLength="50"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={() => sendProps()}
                type="button"
                className="btn btn-primary"
              >
                <i className="fas fa-plus" /> Create Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
