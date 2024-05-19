import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  emailValidate,
  passwordValidate,
  membershipValidate,
} from "../../utils/form-validation";
import { Link as routerLink, useNavigate } from "react-router-dom";
import { userAuth } from "../../Authentication/AuthContext";

const Signup = () => {
  const { user, signUp } = userAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [Loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSignUp = async (data) => {
    setLoading(true);
    try {
      await signUp({
        email: data.email,
        password: data.password,
        membership: data.membership,
      });

      toast({
        title: "Account created",
        description: "You are logged in",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      reset();
      navigate("/");
    } catch (error) {
      toast({
        title: "Signing Up failed",
        description: error.message,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Center w="100%" h="calc(100vh - 80px)" position="relative">
      <Box
        position="absolute"
        top="0"
        left="0"
        bg="rgba(0, 0, 0, 0.3)"
        w="full"
        h="full"
        zIndex={1}
      ></Box>
      <Image
        w="full"
        h="full"
        fit="cover"
        position="absolute"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/41c789f0-7df5-4219-94c6-c66fe500590a/bba88b76-a0e9-43d5-a7fb-a445266c6412/LB-en-20240513-popsignuptwoweeks-perspective_alpha_website_small.jpg"
        alt="netflix bg"
      />
      <Box
        w="md"
        borderRadius="lg"
        p="4"
        m="0 25px"
        bg="rgba(0, 0, 0, 0.7)"
        color="white"
        zIndex={2}
      >
        <Heading textAlign="center">Sign Up</Heading>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <FormControl py="4" isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Email"
              borderColor="gray.400"
              sx={{
                "::placeholder": {
                  color: "gray.400",
                },
              }}
              {...register("email", emailValidate)}
            ></Input>
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            {" "}
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              borderColor="gray.400"
              sx={{
                "::placeholder": {
                  color: "gray.400",
                },
              }}
              {...register("password", passwordValidate)}
            ></Input>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl py="4" isInvalid={errors.membership}>
            <FormLabel>Choose a plan</FormLabel>
            <RadioGroup {...register("membership", membershipValidate)}>
              <Stack direction="row" spacing={4}>
                <Radio
                  value="Basic"
                  colorScheme="black"
                  {...register("membership")}
                >
                  <Box as="span" fontWeight="bold" color="#C0C0C0">
                    Basic
                  </Box>{" "}
                </Radio>
                <Radio
                  value="Standard"
                  colorScheme="black"
                  {...register("membership")}
                >
                  <Box as="span" fontWeight="bold" color="#4169E1">
                    Standard
                  </Box>{" "}
                </Radio>
                <Radio
                  value="Premium"
                  colorScheme="black"
                  {...register("membership")}
                >
                  <Box as="span" fontWeight="bold" color="#FFD700">
                    Premium
                  </Box>{" "}
                </Radio>
              </Stack>
            </RadioGroup>
            <FormErrorMessage>
              {errors.membership && errors.membership.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            bg="rgba(255, 0, 0, 0.9)"
            color="white"
            size="md"
            w="100%"
            mt="4"
            _hover={{
              bg: "rgba(255, 0, 0, 0.7)",
            }}
            isLoading={Loading || isSubmitting}
            loadingText="Signing up.."
          >
            Sign up
          </Button>
        </form>
        <Text mt="1" textAlign="center" color="gray.400">
          Already have an account? {""}
          <Link
            fontWeight="medium"
            textDecor="underline"
            _hover={{ opacity: "0.8" }}
            as={routerLink}
            to="/login"
            color="white"
          >
            Sign In
          </Link>
        </Text>
      </Box>
    </Center>
  );
};

export default Signup;
