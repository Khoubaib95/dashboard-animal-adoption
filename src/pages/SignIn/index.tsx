import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  FormControl,
  InputGroup,
  Input,
  FormLabel,
  Button,
  Text,
  useToast,
  InputRightElement,
  FormErrorMessage,
  IconButton,
} from "@chakra-ui/react";
import { BiHide, BiShow } from "react-icons/bi";
import { useAuthApi } from "../../hooks/api";
import { setAuthData } from "../../utils/authStorage";

//regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!?/.,:;-_"'~`()[]{}=+£<>@#$%^&*])[0-9a-zA-Z!?/.,:;-_"'~`()[]{}=+£<>@#$%^&*]{8,}$/;

export default function SignIn(/*{setData}:{setData:()=>void}*/) {
  const { isLoading, data, error, mutate } = useAuthApi();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({});
  const toast = useToast();
  //const navigate = useNavigate();

  const validateFields = useCallback(() => {
    const errors: any = {};

    if (!emailRegex.test(email)) {
      errors.email = "Adresse e-mail invalide";
    }
    /*if (!passwordRegex.test(password)) {
      errors.password =
        "Le mot de passe doit contenir au moins 8 caractères dont 1 lettre majuscule, 1 lettre minuscule, 1 chiffre et un caractére";
    }*/
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }, [email, password]);

  const sigup = (e: any) => {
    e.preventDefault();
    if (validateFields()) {
      mutate("admin-signin", {
        email,
        password,
      });
    }
  };

  useEffect(() => {
    if (data) {
      setAuthData({
        token: data.token,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      });
      window.location.href = "/";
      //navigate("/");
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Sign up",
        description: error.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log("error", error);
    }
  }, [error]);

  return (
    <Stack
      spacing={4}
      mx="auto"
      w="450px"
      p={6}
      backgroundColor="white"
      boxShadow="md"
      mt="100px"
    >
      <Stack as="form" onSubmit={sigup} spacing={4} rounded="md">
        <FormControl isInvalid={errors.email}>
          <FormLabel htmlFor="login-email">
            Email
            <Text as="span" ml={1} color="red">
              *
            </Text>
          </FormLabel>
          <InputGroup>
            <Input
              id="login-email"
              value={email}
              placeholder="Email"
              colorScheme="white"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </InputGroup>
          <FormErrorMessage>
            <Text h="20px">{errors.email}</Text>
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password}>
          <FormLabel htmlFor="login-password">
            Mot de passe
            <Text as="span" ml={1} color="red">
              *
            </Text>
          </FormLabel>
          <InputGroup>
            <Input
              id="login-password"
              value={password}
              placeholder="password"
              colorScheme="white"
              type={showPassword ? "text" : "password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <InputRightElement>
              <IconButton
                size="md"
                icon={
                  showPassword ? (
                    <BiShow fontSize={20} />
                  ) : (
                    <BiHide fontSize={20} />
                  )
                }
                onClick={() => setShowPassword(!showPassword)}
                bg="transparent"
                color="black"
                aria-label="show-password"
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            <Text h="20px">{errors.password}</Text>
          </FormErrorMessage>
        </FormControl>
        <Button
          colorScheme="messenger"
          type="submit"
          size="lg"
          isLoading={isLoading}
        >
          Se connecter
        </Button>
      </Stack>
    </Stack>
  );
}
