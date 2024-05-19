import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import Main from "../Main";
import requests from "../requests";
import Row from "../Row";
const Home = () => {
  return (
    <Box bg="black">
      <Main />
      <Row title="Upcoming" fetchUrl={requests.requestUpcoming} />
      <Row title="Popular" fetchUrl={requests.requestPopular} />
      <Row title="Trending" fetchUrl={requests.requestTrending} />
      <Row title="Comedy" fetchUrl={requests.requestComedy} />
    </Box>
  );
};

export default Home;
