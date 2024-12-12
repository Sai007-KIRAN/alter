
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
