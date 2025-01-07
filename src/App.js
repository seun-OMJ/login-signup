import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";
import Login from "./components/Login";
import Layout from "./components/shared/Layout";
import Signup from "./components/Signup";
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={< ForgotPassword />} />
          <Route index element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
