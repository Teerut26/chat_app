import firebase from "../firebase.js";

const roomReducer = (state = 0, action) => {
  switch (action.type) {
    case "create_room":
      firebase.database().ref("/rooms").push(action.data);
      return (state += 1);
    case "add_user":
      firebase
        .database()
        .ref(`/rooms/${action.data.key}/users`)
        .push(action.data);
      return state;
    case "remove_room":
      firebase.database().ref(`/rooms/${action.key}`).remove();
      return state;
    case "remove_user":
      firebase
        .database()
        .ref(`/rooms/${action.room_key}`)
        .once("value", (snapshot) => {
          var obj = [];
          for (let key in snapshot.val().users) {
            obj.push({
              key: key,
              data: snapshot.val().users[key],
            });
          }
          let result = obj.filter(
            (item) => item.data.user_key === action.user_key
          );
          console.log(result[0].key);
          firebase
            .database()
            .ref(`/rooms/${action.key}/users/${result[0].key}`)
            .once("value", (snapshot2) => console.log(snapshot2.val()));
        });
      return state;
    case "add_message":
      firebase
        .database()
        .ref(`/rooms/${action.data.room_key}/message`)
        .push({
          author:action.data.author,
          author_id:action.data.author_id,
          content:action.data.content,
          timeStamp:new Date().toJSON(),
        })
        
      return state;
    default:
      return state;
  }
};

export { roomReducer };
