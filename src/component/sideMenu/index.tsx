import { Box, Divider, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function SideMenu() {
  return (
    <VStack
      as="nav"
      w="250px"
      bg="#F9FAFC"
      h="100vh"
      py="10px"
      px="20px"
      borderRightWidth="1px"
      borderRightColor="gray.300"
      position="fixed"
      top={0}
      left={0}
      bottom={0}
    >
      <VStack divider={<Divider />}>
        <VStack>
          <Link to="/">
            <Box w="220px" p="8px">
              <Text fontSize="lg" fontWeight="normal">
                Gestion des Annonce
              </Text>
            </Box>
          </Link>
          <Link to="/users">
            <Box w="220px" p="8px">
              <Text w="full" fontSize="lg" fontWeight="normal">
                Gestion Utilisateur
              </Text>
            </Box>
          </Link>
        </VStack>
      </VStack>
    </VStack>
  );
}
