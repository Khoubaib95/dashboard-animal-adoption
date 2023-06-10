import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useProtectedDeleteApi, useProtectedPatchApi } from "../../hooks/api";
/**
 {
    post_id: "723ffb5d-bb99-4b08-9ef7-bb485520df07",
    name: "Toupon",
    description: "Good boy",
    age: "13",
    gender: "Male ",
    isAddmitted: true,
    createdAt: "2023-06-01T20:39:02.000Z",
    user: {
      user_id: "c1f97855-2e2a-46db-8fd1-3f3859087ac0",
      auth_id: "b5a78ec9-a1eb-424f-9129-64299072ec1a",
      first_name: "Abdellaoui ",
      last_name: "khoubaib",
      phone_number: "123456789",
      address: "Sousse",
      role: "ADMIN",
    },
    images: [
      {
        image_id: "96f7edb2-e049-4379-a5fd-d8fa2d25c0f5",
        url: "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcRJ4FsPjFybFV7SI0Qz__3O4KLAvQVyu1Qgr0Ck_nbD3zKPI-95-AWp7vQR7pTu2nyg4BHwUNRtvWpC9FVkT4r2r_LcZk57SxRZRZdiqrxj",
      },
    ],
    comments: [
      {
        comment_id: "227657e1-0d08-49b6-a2bc-08854ec5f591",
        text: "Hello",
        createdAt: "2023-06-04T20:59:00.000Z",
      },
    ],
  }
 */
export default function AcceptedPost({ post, fetchPosts }: any) {
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
        title: "Refus Post.",
        description: "Post refus successfully",
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
        title: "Refus Post.",
        description: "Post refus failed",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [editdError]);
  const editPost = (id: string) => {
    mutateEdit(`posts/addmit/${id}`, { isAddmitted: false });
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
            //  onOpen();
          }}
          isLoading={isLoadingEdit}
          colorScheme="orange"
        >
          Refuser
        </Button>
        <Button
          onClick={() => {
            //  deleteUser(user.user_id);
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
