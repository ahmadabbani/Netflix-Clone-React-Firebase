import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Heading, useToast } from "@chakra-ui/react";
import { Link as routerLink, useNavigate } from "react-router-dom";
import { userAuth } from "../Authentication/AuthContext";
import Avatar from "./pages/Avatar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
const Navbar = () => {
  const { user, logOut, loading } = userAuth();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const toast = useToast();
  const navigate = useNavigate();

  //fetch user information
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user?.email) {
        const docRef = doc(db, "users", `${user?.uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserInfo(userData);
        }
      }
    };
    fetchUserInfo();
  }, [user]);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await logOut();
      toast({
        title: "Logged out successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error logging out",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <Flex
      w="full"
      bg="black"
      justify="space-between"
      align="center"
      p={5}
      h="80px"
    >
      <Heading as={routerLink} color="red" to="/">
        Netflix{" "}
      </Heading>
      {user?.email ? (
        <Flex gap={{ base: 2, sm: 5 }} align="center">
          <Avatar userInfo={userInfo} size="md" />
          <Button
            size={{ base: "sm", sm: "md" }}
            _hover={{ opacity: "0.9" }}
            textDecor="none"
            bg="red"
            color="white"
            onClick={handleLogout}
            isLoading={logoutLoading}
          >
            Logout
          </Button>
        </Flex>
      ) : (
        <Flex gap={{ base: 1, sm: 4 }}>
          <Button
            as={routerLink}
            _hover={{ opacity: "0.9" }}
            to="/login"
            textDecor="none"
            color="white"
            size={{ base: "sm", sm: "md" }}
            bg="transparent"
            isLoading={loading}
          >
            Sign In
          </Button>
          <Button
            as={routerLink}
            _hover={{ opacity: "0.9" }}
            to="signup"
            textDecor="none"
            bg="red"
            color="white"
            size={{ base: "sm", sm: "md" }}
            isLoading={loading}
          >
            Sign Up
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Navbar;
