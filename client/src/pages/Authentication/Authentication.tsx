import "./Authentication.css";
import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";

function Authentication() {
  return (
    <div className="log-container">
      <SignIn />
      <div className="divider">
        <hr />
        <p>ou</p>
        <hr />
      </div>
      <SignUp />
    </div>
  );
}

export default Authentication;
