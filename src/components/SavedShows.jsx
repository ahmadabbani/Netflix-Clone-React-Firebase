import { Box, Flex, Heading, Image, Text, IconButton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useBreakpointValue } from "@chakra-ui/react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { useRef } from "react";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
const SavedShows = ({ user }) => {
  const [myShows, setMyShows] = useState();
  const [isHovered, setIsHovered] = useState(false);
  const [itemHovered, setItemHovered] = useState(false);
  const iconSize = useBreakpointValue({ base: "16px", md: "24px" });

  //fetch saved shows
  useEffect(() => {
    const fetchSavedMovies = async () => {
      if (user?.email) {
        const docRef = doc(db, "users", `${user?.uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setMyShows(userData.savedShows);
        }
      }
    };

    fetchSavedMovies();
  }, [user]);

  //remove saved item
  const removeShow = async (movie) => {
    if (user?.email) {
      const docRef = doc(db, "users", `${user?.uid}`);
      await updateDoc(docRef, {
        savedShows: arrayRemove(movie),
      });

      // Remove the movie from the savedMovies state
      setMyShows(myShows.filter((m) => m.id !== movie.id));
    }
  };

  const scrollContainer = useRef(null);
  const scrollLeft = () => {
    scrollContainer.current.scrollBy({
      top: 0,
      left: -400,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainer.current.scrollBy({ top: 0, left: 400, behavior: "smooth" });
  };
  return (
    <Box>
      <Heading pb={5} color="white">
        <Box as="span" display="flex" alignItems="center">
          My favorite shows
          <Box as="span" ml={2}>
            <FaHeart />
          </Box>
        </Box>
      </Heading>
      <div
        style={{
          position: "relative",
          width: "100%",
        }}
      >
        {myShows?.length > 0 ? (
          <Flex
            alignItems="center"
            gap={4}
            overflowX="scroll"
            ref={scrollContainer}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
              scrollbarWidth: "none", // For Firefox
              "&::-webkit-scrollbar": {
                display: "none", // For Chrome, Safari and Opera
              },
            }}
          >
            <IconButton
              isRound={true}
              variant="solid"
              bg="white"
              color="black"
              opacity="0.7"
              _hover={{ opacity: "0.9" }}
              fontSize={{ base: "18px", md: "20px" }}
              size="sm"
              icon={<MdOutlineKeyboardArrowLeft />}
              position="absolute"
              left={1}
              top="50%"
              transform="translateY(-50%)"
              cursor="pointer"
              zIndex={1}
              sx={{
                display: isHovered ? "flex" : "none",
              }}
              onClick={scrollLeft}
            />
            <IconButton
              isRound={true}
              variant="solid"
              bg="white"
              color="black"
              opacity="0.7"
              _hover={{ opacity: "0.9" }}
              fontSize={{ base: "18px", md: "20px" }}
              size="sm"
              icon={<MdOutlineKeyboardArrowRight />}
              position="absolute"
              right={1}
              top="50%"
              transform="translateY(-50%)"
              cursor="pointer"
              zIndex={1}
              sx={{
                display: isHovered ? "flex" : "none",
              }}
              onClick={scrollRight}
            />

            {myShows?.map((item) => (
              <Box
                key={item?.id}
                w={["150px", "180px", "210px", "240px"]}
                h="full"
                flexShrink={0}
                position="relative"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                  alt={item?.title}
                  w="full"
                  h="full"
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
                  onMouseEnter={() => setItemHovered(true)}
                  onMouseLeave={() => setItemHovered(false)}
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
                    opacity={itemHovered ? "1" : "0"}
                    transition="opacity 0.7s ease"
                  >
                    {item?.title}
                  </Text>
                  <IoTrashOutline
                    size={iconSize}
                    color="white"
                    onClick={() => removeShow(item)}
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      cursor: "pointer",
                      opacity: itemHovered ? "1" : "0",
                      transition: "opacity 0.7s ease",
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Flex>
        ) : (
          <Text color="white" fontSize="20px">
            No saved shows yet.
          </Text>
        )}
      </div>
    </Box>
  );
};

export default SavedShows;
