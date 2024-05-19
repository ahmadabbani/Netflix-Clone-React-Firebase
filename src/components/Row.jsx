import { Box, Flex, Heading, Image, Text, IconButton } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Movie from "./Movie";
import { useRef } from "react";

const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    axios.get(fetchUrl).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchUrl]);
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
    <>
      <Heading p={5} color="white" size={{ base: "md", sm: "xl" }}>
        {title}
      </Heading>
      <div
        style={{
          position: "relative",
          width: "100%",
        }}
      >
        <Flex
          alignItems="center"
          gap={2}
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
          {movies?.map((item, id) => (
            <Movie key={id} item={item} />
          ))}
        </Flex>
      </div>
    </>
  );
};

export default Row;
