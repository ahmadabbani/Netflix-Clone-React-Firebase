import { Flex, Spinner } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import { userAuth } from "./Authentication/AuthContext";
import "./App.css";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Account from "./components/pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  const { loading } = userAuth();
  if (loading) {
    return (
      <Flex bg="black" w="100vw" h="100vh" justify="center" align="center">
        <Spinner color="red" size="xl" />
      </Flex>
    );
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
