import React, { useEffect, useState } from "react";
import requests from "./requests";
import axios from "axios";
import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";

const Main = () => {
  const [movies, setMovies] = useState([]);
  const movie = movies[Math.floor(Math.random() * movies.length)];
  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  //truncate the overview paragraph
  const truncateString = (str, maxLength) => {
    if (str?.length <= maxLength) {
      return str;
    } else {
      return str?.substring(0, maxLength) + " " + ". . .";
    }
  };

  return (
    <Box w="full" height="500px" color="white" position="relative">
      <Box
        position="absolute"
        left="0"
        top="0"
        bottom="0"
        w="full"
        h="500px"
        bgGradient="linear(to-r, black, transparent)"
      ></Box>
      <Image
        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        alt={movie?.title}
        w="full"
        h="full"
        fit="cover"
      />
      <Flex position="absolute" top="20%" px={5} direction="column" gap={3}>
        <Heading>{movie?.title}</Heading>
        <Flex gap={3} my={4}>
          <Button
            borderRadius={0}
            _hover={{ opacity: 0.8 }}
            size={{ base: "sm", sm: "md", md: "lg" }}
          >
            Play Now
          </Button>
          <Button
            size={{ base: "sm", sm: "md", md: "lg" }}
            variant="outline"
            border="1px"
            colorScheme="white"
            borderRadius={0}
            _hover={{ opacity: 0.8 }}
          >
            Watch Later
          </Button>
        </Flex>
        <Box>
          {" "}
          <Text fontSize="13px" color="gray">
            Released: {movie?.release_date}
          </Text>
          <Text w={["100%", "70%", "50%", "40%"]} color="gray.300">
            {truncateString(movie?.overview, 150)}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Main;
