import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "../firebase.js";
import { withRouter } from "react-router-dom";

class ListRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listRoom: null,
      user_key: localStorage.getItem("username_key"),
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
  }

  componentDidMount() {
    firebase
      .database()
      .ref(`/rooms`)
      .on("value", (snapshot1) => {
        let obj = [];
        for (let key in snapshot1.val()) {
          obj.push({
            key: key,
            data: snapshot1.val()[key],
          });
        }
        this.setState({ listRoom: obj });
      });
  }

  // componentDidUpdate() {
  //   console.log(this.state.listRoom);
  // }

  goToPath(path) {
    this.props.history.push(path);
  }

  remove_room(key){
    this.props.dispatch({
      type:"remove_room",
      key:key,
      
    })
  }

  render() {
    return (
      <>
        <div className=" h-100">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Rooms List</h5>
              <p className="card-text">
                {this.state.listRoom !== null ? (
                  <ul className="list-group">
                    {" "}
                    {this.state.listRoom.map((item) => (
                      <li className="list-group-item d-flex justify-content-between">
                        <div>
                          {item.data.room_password !== "null" ? (
                            <i class="fas fa-lock text-danger"></i>
                          ) : (
                            <i class="fas text-success fa-globe"></i>
                          )}{" "}
                          {item.data.room_name}
                          {" | "}
                          {item.data.room_user_key ===
                          localStorage.getItem("username_key")
                            ? <b>My Room</b>
                            : item.data.room_owner_username}
                        </div>
                        <div>
                          {item.data.room_user_key === this.state.user_key ? (
                            <i onClick={()=>this.remove_room(item.key)} class="fas text-danger fa-trash-alt "></i>
                          ) : (
                            ""
                          )}

                          <i
                            onClick={() =>
                              this.goToPath(`/room/${item.data.key_room}`)
                            }
                            style={{ marginLeft: 10 }}
                            class="fas  fa-sign-in-alt"
                          ></i>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  ""
                )}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const map_data = (state) => {};

export default connect(map_data)(withRouter(ListRoom));
