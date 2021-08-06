import { useHistory } from "react-router-dom";
const checkLocalStore = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let history = useHistory();
  if (localStorage.getItem("username") == null) {
    history.push("/set/username");
  }
};

export{
    checkLocalStore
}