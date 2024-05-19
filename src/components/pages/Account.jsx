import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SavedShows from "../SavedShows";
import {
  Box,
  Heading,
  Text,
  useToast,
  Button,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { userAuth } from "../../Authentication/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import EditProfile from "./EditProfile";
import Avatar from "./Avatar";

const Account = () => {
  const { user } = userAuth();
  const [userInfo, setUserInfo] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  return (
    <Flex bg="black" px={{ base: 4, md: 10 }} pt={7} pb={2} direction="column">
      <Box color="white" mb={20}>
        <Heading mb={6}>My Account</Heading>
        <Flex gap={10}>
          <Avatar userInfo={userInfo} />
          <Box>
            <Text
              fontSize={{
                base: "md",
                sm: "lg",
                xl: "30px",
              }}
              my={4}
            >
              Email:{" "}
              <Text as="span" color="gray">
                {userInfo.email ? userInfo.email : "Loading..."}
              </Text>
            </Text>
            <Text
              fontSize={{
                base: "md",
                sm: "lg",
                xl: "30px",
              }}
              my={4}
            >
              {" "}
              Member since:{" "}
              <Text as="span" color="gray">
                {userInfo.date
                  ? format(userInfo.date, "MMM yyyy")
                  : "Loading..."}
              </Text>
            </Text>
            <Text
              fontSize={{
                base: "md",
                sm: "lg",
                xl: "30px",
              }}
              my={4}
            >
              {" "}
              Membership:{" "}
              <Box
                fontSize={{
                  base: "md",
                  sm: "lg",
                  xl: "30px",
                }}
                fontWeight="bold"
                as="span"
                color={
                  userInfo.membership === "Basic"
                    ? "#C0C0C0"
                    : userInfo.membership === "Standard"
                    ? "#4169E1"
                    : userInfo.membership === "Premium"
                    ? "#FFD700"
                    : "#000000"
                }
              >
                {userInfo.membership ? userInfo.membership : "Loading..."}
              </Box>
            </Text>
            <Button
              onClick={onOpen}
              variant="outline"
              colorScheme="white"
              size={{ base: "sm", sm: "md" }}
              borderWidth="1px"
              type="submit"
              _hover={{ color: "gray.300" }}
            >
              Change Avatar
            </Button>
          </Box>
        </Flex>
      </Box>
      <EditProfile
        user={user}
        isOpen={isOpen}
        onClose={onClose}
        userInfo={userInfo}
      />
      <SavedShows user={user} />
    </Flex>
  );
};

export default Account;
