import { Gift } from "../../assets/svg-icons/gift.icon";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import { TbLogout, TbSquareRoundedChevronDownFilled } from "react-icons/tb";
import { setAuthData } from "../../utils/authStorage";
//import { getAuthData, setAuthData } from "./utils/authStorage";
import { useNavigate } from "react-router-dom";

export default function TopMenu({ data, setData }: any) {
  const navigate = useNavigate();
  const signOut = () => {
    setData(null);
    setAuthData(null);
    navigate("/");
  };
  return (
    <Flex
      w="full"
      h="60px"
      align="center"
      justify="space-between"
      px="10px"
      mb="30px"
      borderWidth="1px"
      borderColor="gray.300"
      backgroundColor="white"
      borderRadius="md"
    >
      <Heading fontSize="xl">Greeting !</Heading>
      <HStack spacing={"25px"} pr="10px">
        <VStack align="flex-start" spacing={0}>
          <Text fontSize="sm" color="gray.500">
            Admin
          </Text>
          <Text
            fontSize="md"
            whiteSpace="nowrap"
            overflow="hidden"
            fontWeight="semibold"
            color="#F1A025"
          >
            {`${data.first_name} ${data.last_name}`}
          </Text>
        </VStack>
        <Menu>
          <MenuButton cursor="pointer">
            <HStack>
              {/* <Image
                src="/images/hist-winner.png"
                width={50}
                height={50}
                className="rounded-avatar"
                alt="user"
  />*/}
              <TbSquareRoundedChevronDownFilled fontSize={"20px"} />
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={signOut}>
              <HStack color="#FF0000">
                <TbLogout fontSize={22} />
                <Text fontWeight="semibold" fontSize="md">
                  Se déconnecter
                </Text>
              </HStack>
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
}
