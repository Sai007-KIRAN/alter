
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("User signed in successfully!");
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="login-container">
      <button onClick={handleGoogleLogin} className="btn">
        Sign in with Google
      </button>
      <button onClick={handleLogout} className="btn">
        Logout
      </button>
    </div>
  );
};

export default Login;
