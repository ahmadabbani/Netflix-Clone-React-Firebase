import React from "react";
import { Link as routerLink } from "react-router-dom";
import { Avatar as ChakraAvatar } from "@chakra-ui/react";

const Avatar = ({ userInfo, size = "xl", overrideAvatar = null }) => {
  return (
    <ChakraAvatar
      name={userInfo.email}
      src={overrideAvatar || userInfo.avatar}
      size={{ base: "md", sm: size }}
      as={routerLink}
      to="/account"
      _hover={{ cursor: "pointer", opacity: "0.8" }}
    />
  );
};

export default Avatar;
