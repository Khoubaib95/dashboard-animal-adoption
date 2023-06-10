import {
  Box,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  VStack,
} from "@chakra-ui/react";

export default function UserModal({
  isOpen,
  onClose,
  consulteUser,
}: {
  isOpen: boolean;
  consulteUser: any;
  onClose: () => void;
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      scrollBehavior="inside"
      size="2xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent borderRadius="none">
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={"55px"} pt="20px" pb="15px">
            <HStack w="full" align="flex-start">
              <VStack spacing="25px" align="flex-start" w="full">
                <VStack align="flex-start" spacing={0}>
                  <Text>ID</Text>
                  <Text fontSize="lg" fontWeight="semibold">
                    {consulteUser?.user_id}
                  </Text>
                </VStack>
                <VStack align="flex-start" spacing={0}>
                  <Text>Nom</Text>
                  <Text fontSize="lg" fontWeight="semibold">
                    {consulteUser?.last_name}
                  </Text>
                </VStack>
                <VStack align="flex-start" spacing={0}>
                  <Text>Prénom</Text>
                  <Text fontSize="lg" fontWeight="semibold">
                    {consulteUser?.first_name}
                  </Text>
                </VStack>
                <VStack align="flex-start" spacing={0}>
                  <Text>Email</Text>
                  <Text fontSize="lg" fontWeight="semibold">
                    {consulteUser?.auth.email}
                  </Text>
                </VStack>
                <VStack align="flex-start" spacing={0}>
                  <Text>Numero de telephone</Text>
                  <Text fontSize="lg" fontWeight="semibold">
                    {consulteUser?.phone_number}
                  </Text>
                </VStack>
                <VStack align="flex-start" spacing={0}>
                  <Text>Address</Text>
                  <Text fontSize="lg" fontWeight="semibold">
                    {consulteUser?.address}
                  </Text>
                </VStack>
                <VStack align="flex-start" spacing={0}>
                  <Text>Inscrit depuis</Text>
                  <Text fontSize="lg" fontWeight="semibold">
                    {consulteUser?.auth.createdAt}
                  </Text>
                </VStack>
              </VStack>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
