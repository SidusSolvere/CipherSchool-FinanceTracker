import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const LogoutButton = () => {
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button onClick={logOut}>
      Logout
    </button>
  );
};

export default LogoutButton;