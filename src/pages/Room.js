import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import firebase from "../firebase";
import { connect } from "react-redux";

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
    };
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  componentDidMount() {
    if (localStorage.getItem("username") == null) {
      this.props.history.push("/set/username");
    }
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

  componentWillUnmount() {
    this.props.dispatch({
      type: "remove_user",
      room_key: this.state.data.key,
      user_key: localStorage.getItem("username_key"),
    });
  }

  scrollToMyRef = () => {
    const scroll =
      this.chatContainer.current.scrollHeight -
      this.chatContainer.current.clientHeight;
    this.chatContainer.current.scrollTo(0, scroll);
  };

  componentDidUpdate() {
    this.scrollToMyRef();
  }

  submit_form() {
    if (this.state.content.length !== 0) {
      console.log("submit");
      this.props.dispatch({
        type: "add_message",
        data: {
          room_key: this.state.data.key,
          author: localStorage.getItem("username"),
          author_id: localStorage.getItem("username_key"),
          content: this.state.content,
        },
      });
      this.setState({ content: "" });
      // setTimeout(() => {
      //   this.scrollToMyRef();
      // }, 50);
    }
  }

  render() {
    if (!this.state.data) {
      return <></>;
    }

    return (
      <div className="container mt-5">
        <div className="card">
          <div className="card-body">
            {/* <h5 className="card-title">ID : {this.state.data.data.key_room}</h5> */}
            <p className="card-text">
              <div>
                Author : {this.state.data.data.room_owner_username}
                <br />
                Room Name : {this.state.data.data.room_name}
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
                          className="d-inline-flex bg-light p-2 px-3 m-2 rounded-pill"
                          ref={this.state.myRef}
                          title={new Date(item.timeStamp).toLocaleString("us-US")}
                        >
                          <div>
                            <div>
                              {item.author_id === localStorage.getItem("username_key") ? `${item.content}` : `${item.author} : ${item.content}`}
                              {/* {item.author} : {item.content} */}
                            </div>
                            {/* <span>{item.author} : {item.content}</span> */}
                          </div>
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
              {/* <div ref={this.state.myRef} /> */}
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control "
                  placeholder="Message"
                  value={this.state.content}
                  onChange={(v) => this.setState({ content: v.target.value })}
                  onKeyPress={(e) =>
                    e.key === "Enter" ? this.submit_form() : ""
                  }
                  // onKeyPress={(e)=>console.log(e.key)}
                />
                <div
                  onClick={() => this.submit_form()}
                  className="btn btn-primary border-0"
                >
                  <i class="fas fa-paper-plane"></i> SendMessage
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
