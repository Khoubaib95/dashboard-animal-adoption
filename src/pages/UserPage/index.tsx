import {
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Button,
  useDisclosure,
  Flex,
  useToast,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import UserModal from "../../component/userModal";
//import { data } from "./data";
import { useGetApi, useProtectedDeleteApi } from "../../hooks/api";
export default function UsersPage() {
  const [consulteUser, setConsulteUser] = useState<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading, error, get } = useGetApi();
  const fetchUsers = () => {
    get("user");
  };
  useEffect(() => {
    if (!data) fetchUsers();
  }, []);

  return (
    <>
      {isLoading ? (
        <Box mx="auto" w="50px" mt="70px">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
      ) : (
        data && (
          <Stack
            p="10px"
            borderWidth="1px"
            borderColor="gray.300"
            borderRadius="md"
            bg="white"
          >
            <Text fontSize="lg" fontWeight="bold">
              Most actif clients
            </Text>
            <TableContainer>
              <Table size="lg" variant="simple">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Nom</Th>
                    <Th>Prenom</Th>
                    <Th>Email</Th>
                    <Th>Tel</Th>
                    <Th>Adress</Th>
                    <Th>Inscrit depuis</Th>
                    <Th>Role</Th>
                    <Th textAlign="center">Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.map((user: any, i: number) => (
                    <UserRow
                      user={user}
                      fetchUsers={fetchUsers}
                      setConsulteUser={setConsulteUser}
                      onOpen={onOpen}
                      key={i}
                    />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Stack>
        )
      )}
      <UserModal
        isOpen={isOpen}
        onClose={onClose}
        consulteUser={consulteUser}
      />
    </>
  );
}
const UserRow = ({ user, fetchUsers, setConsulteUser, onOpen }: any) => {
  const toast = useToast();
  // handel delete user
  const {
    data: deleteData,
    isLoading: isLoadingDelete,
    error: deletedError,
    mutate: mutatedelete,
  } = useProtectedDeleteApi();

  useEffect(() => {
    if (deleteData) {
      if (deleteData.affected == 1) {
        toast({
          title: "Account delete.",
          description: "User deleted successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        fetchUsers();
      } else {
        console.log("failed");
        toast({
          title: "User delete.",
          description: "User delete failed",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  }, [deleteData]);

  const deleteUser = (id: string) => {
    mutatedelete(`user/${id}`);
  };

  return (
    <Tr>
      <Td>{user.user_id}</Td>
      <Td>{user.last_name} </Td>
      <Td>{user.first_name} </Td>
      <Td>{user.auth.email} </Td>
      <Td>{user.phone_number} </Td>
      <Td>{user.address} </Td>
      <Td>{user.auth.createdAt} </Td>
      <Td>{user.role} </Td>
      <Td>
        <Flex>
          <Button
            onClick={() => {
              setConsulteUser(user);
              onOpen();
            }}
            colorScheme="messenger"
          >
            Consulter
          </Button>
          <Button
            onClick={() => {
              deleteUser(user.user_id);
            }}
            isLoading={isLoadingDelete}
            colorScheme="red"
            mx={2}
          >
            Supprimer
          </Button>
        </Flex>
      </Td>
    </Tr>
  );
};
