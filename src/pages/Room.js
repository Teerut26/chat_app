import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import firebase from "../firebase";
import { connect } from "react-redux";

import Swal from 'sweetalert2';
import SendImage from "../components/SendImageBase64";
import SendImageUrl from "../components/SendImageUrl";

class Room extends Component {
  chatContainer = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      roomID: this.props.match.params.roomID,
      data: null,
      userKey: "",
      content: "",
      messages: null,
      audio: new Audio("/notify.mp3"),
      sound: null,
      roomAllow:false
    };
  }

  sound_on_check() {
    this.setState({ sound: localStorage.getItem("sound") });
  }

  componentDidMount() {
    if (localStorage.getItem("username") == null) {
      this.props.history.push("/set/username");
    }
    // this.sound_on_check()
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
        let result = obj.filter(
          (item) => item.data.key_room === this.state.roomID
        );
        // if()
        
        this.setState({ data: result[0] });

        let obj2 = [];
        for (let key2 in result[0].data.message) {
          obj2.push(result[0].data.message[key2]);
        }
        this.setState({ messages: obj2 });
      });
  }

  componentWillUnmount() {}

  scrollToMyRef = () => {
    const scroll =
      this.chatContainer.current.scrollHeight -
      this.chatContainer.current.clientHeight;
    this.chatContainer.current.scrollTo(0, scroll);
  };

  componentDidUpdate() {
    this.scrollToMyRef();
    // console.log(this.state.sendImage);
  }

  submit_form(obj) {
    if (this.state.content.length !== 0) {
      console.log("submit");
      this.props.dispatch({
        type: "add_message",
        data: {
          room_key: this.state.data.key,
          author: localStorage.getItem("username"),
          author_id: localStorage.getItem("username_key"),
          content: this.state.content,
          content_type: "text",
          timeStamp: new Date().toJSON(),
        },
      });
      this.setState({ content: "" });
    }
  }

  showImage(url){
    Swal.fire({
      html:`<img src="${url}" width="100%"></img>`,
      showCloseButton: true,
      focusConfirm: false,

    })
  }

  render() {
    if (!this.state.data) {
      return <></>;
    }

    if(this.state.roomAllow){
      
    }

    return (
      <div className="container mt-5">
        <div className="card">
          <div className="card-body">
            <p className="card-text">
              <div className="d-flex justify-content-between">
                <div>
                  Author : {this.state.data.data.room_owner_username}
                  <br />
                  Room Name : {this.state.data.data.room_name}
                </div>
                
                <div>
                  <div>
                    <i class="fas fa-user"></i>{" "}
                    {localStorage.getItem("username")}
                  </div>
                </div>
              </div>
              <hr />
              <div
                style={{ height: "71vh" }}
                className="border overflow-auto p-2 "
                ref={this.chatContainer}
              >
                {this.state.messages !== null
                  ? this.state.messages.map((item) => (
                      <div
                        className={
                          item.author_id ===
                          localStorage.getItem("username_key")
                            ? "d-flex flex-nowrap justify-content-end"
                            : "d-flex flex-nowrap"
                        }
                      >
                        <div
                          href="#"
                          className="d-inline-flex bg-light p-2 px-3 m-2 rounded"
                          ref={this.state.myRef}
                          title={new Date(item.timeStamp).toLocaleString(
                            "us-US"
                          )}
                        >
                          <div>
                            <div>
                              {item.content_type === "image" ? (
                                <div>
                                  {item.author_id ===
                                  localStorage.getItem("username_key")
                                    ? ``
                                    : <>{item.author}<br /></> }
                                  <img
                                    src={item.content}
                                    onClick={()=>this.showImage(item.content)}
                                    alt="image"
                                    width="80"
                                  />
                                </div>
                              ) : item.author_id ===
                                localStorage.getItem("username_key") ? (
                                `${item.content}`
                              ) : (
                                `${item.author} : ${item.content}`
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control "
                  placeholder="Message"
                  value={this.state.content}
                  onChange={(v) => this.setState({ content: v.target.value })}
                  onKeyPress={(e) =>
                    e.key === "Enter"
                      ? this.submit_form({ content_type: "text" })
                      : ""
                  }
                  maxLength="100"
                />
                <SendImage obj={{ room_key: this.state.data.key }} />
                <SendImageUrl obj={{ room_key: this.state.data.key }} />
                <div
                  onClick={() => this.submit_form({ content_type: "text" })}
                  className="btn btn-primary border-0"
                >
                  <i class="fas fa-paper-plane"></i>
                </div>
              </div>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const map_data = (state) => {
  return {
    redux: state,
  };
};

export default connect(map_data)(withRouter(Room));
