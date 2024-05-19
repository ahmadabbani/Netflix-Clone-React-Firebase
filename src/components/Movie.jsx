import { Box, Image, Spinner, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useBreakpointValue } from "@chakra-ui/react";
import { userAuth } from "../Authentication/AuthContext";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
const Movie = ({ item }) => {
  const { user } = userAuth();
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const likeIconSize = useBreakpointValue({ base: "16px", md: "24px" });
  const [isHovered, setIsHovered] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const toast = useToast();

  // update the 'like' and 'saved' states based on whether the current show is saved.
  useEffect(() => {
    const fetchSavedShows = async () => {
      if (user?.email) {
        const docRef = doc(db, "users", `${user?.uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          const isShowSaved = userData.savedShows.some(
            (show) => show.id === item?.id
          );
          setLike(isShowSaved);
          setSaved(isShowSaved);
        }
      }
    };
    fetchSavedShows();
  }, [user, item?.id]);

  const saveShow = async () => {
    if (user?.email) {
      setLikeLoading(true);
      const docRef = doc(db, "users", `${user?.uid}`);
      const Show = {
        id: item.id,
        title: item.title,
        img: item.backdrop_path,
      };
      await updateDoc(docRef, {
        savedShows: saved ? arrayRemove(Show) : arrayUnion(Show),
      });

      // Fetch the updated saved shows from Firestore
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        const isShowSaved = userData.savedShows.some(
          (show) => show.id === Show.id
        );

        // Update the like and saved states based on the updated saved shows
        setLike(isShowSaved);
        setSaved(isShowSaved);
      }

      setLikeLoading(false);
    } else {
      toast({
        title: "Please Log in to your account to save a show.",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      setLikeLoading(false);
    }
  };

  return (
    <Box
      w={["150px", "180px", "210px", "240px"]}
      h="full"
      flexShrink={0}
      position="relative"
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title}
        w="full"
        h="auto"
        fit="cover"
      ></Image>
      <Box
        position="absolute"
        top="0"
        left="0"
        w="full"
        h="full"
        bg="black"
        opacity="0"
        _hover={{ opacity: "0.7" }}
        transition="opacity 0.7s ease"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Text
          textAlign="center"
          px={1}
          h="full"
          color="white"
          fontSize={{ base: "12px", md: "16px" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          opacity={isHovered ? "1" : "0"}
          transition="opacity 0.7s ease"
        >
          {item?.title}
        </Text>

        {likeLoading ? (
          <Spinner position="absolute" top="8px" left="8px" />
        ) : like ? (
          <FaHeart
            color="red"
            size={likeIconSize}
            onClick={saveShow}
            style={{
              position: "absolute",
              top: "8px",
              left: "8px",
              cursor: "pointer",
              opacity: isHovered ? "1" : "0",
              transition: "opacity 0.7s ease",
            }}
          />
        ) : (
          <FaRegHeart
            color="white"
            size={likeIconSize}
            onClick={saveShow}
            style={{
              position: "absolute",
              top: "8px",
              left: "8px",
              cursor: "pointer",
              opacity: isHovered ? "1" : "0",
              transition: "opacity 0.7s ease",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Movie;
