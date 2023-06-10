import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useProtectedPatchApi, useProtectedDeleteApi } from "../../hooks/api";

export default function NotAcceptedPost({ post, fetchPosts }: any) {
  const toast = useToast();
  //handel addmit post
  const {
    data: editData,
    isLoading: isLoadingEdit,
    error: editdError,
    mutate: mutateEdit,
  } = useProtectedPatchApi();

  useEffect(() => {
    if (editData) {
      toast({
        title: "Accept Post.",
        description: "Post accept successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      fetchPosts();
    }
  }, [editData]);

  useEffect(() => {
    if (editdError) {
      toast({
        title: "Accept Post.",
        description: "Post accept failed",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [editdError]);
  const editPost = (id: string) => {
    mutateEdit(`posts/addmit/${id}`, { isAddmitted: true });
  };
  // handel delete post
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
          title: "Post delete.",
          description: "Post deleted successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        fetchPosts();
      } else {
        toast({
          title: "Post delete.",
          description: "Post delete failed",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  }, [deleteData]);

  const deletePost = (id: string) => {
    mutatedelete(`posts/${id}`);
  };
  return (
    <Flex
      bg="white"
      direction="column"
      width={{ base: "80%", sm: "85%", md: "90%" }}
      mx="auto"
      p={2}
      borderRadius="20px"
      borderWidth="1px"
      borderColor="gray.300"
      transition="all 0.5s"
      //_hover={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.6)" }}
    >
      <Box width="100%" height="303px" position="relative">
        <img
          src={post.images[0]?.url || "/images/pic.png"}
          alt="Aminal"
          style={{
            borderRadius: "12px",
            objectFit: "contain",
            height: "inherit",
            width: "inherit",
          }}
        />
      </Box>
      <Stack mt="17px" spacing={2}>
        <Heading size="md" fontWeight="semibold" color="messenger.500">
          Ainmal Name : {post.name}
        </Heading>
        <Text fontWeight="semibold">Gender: {post.gender}</Text>
        <Text fontWeight="semibold">Age : {post.age}</Text>
        <Text fontWeight="semibold">Description : {post.description}</Text>
        <Heading size="md" fontWeight="semibold" color="messenger.500">
          Owner Name : {post.user.first_name}
        </Heading>
        <Text fontWeight="semibold">Phone : {post.user.phone_number}</Text>
        <Text fontWeight="semibold">Location : {post.user.first_name}</Text>
      </Stack>
      <Stack mt={5}>
        <Button
          onClick={() => {
            editPost(post.post_id);
          }}
          isLoading={isLoadingEdit}
          colorScheme="green"
        >
          Accepter
        </Button>
        <Button
          onClick={() => {
            deletePost(post.post_id);
          }}
          isLoading={isLoadingDelete}
          colorScheme="red"
        >
          Supprimer
        </Button>
      </Stack>
    </Flex>
  );
}
