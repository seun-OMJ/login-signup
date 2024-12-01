import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login";
import Layout from "./components/shared/Layout";
import Signup from "./components/Signup";
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route  path="/signup" element={<Signup />}/>
          <Route index element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
