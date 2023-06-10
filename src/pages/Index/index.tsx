import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  SimpleGrid,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AcceptedPost from "../../component/AcceptedPost";
import NotAcceptedPost from "../../component/NotAcceptedPost";
import { useGetApi } from "../../hooks/api";

export default function IndexPage() {
  const [addmited, setAddmited] = useState<any>(null);
  const [notAddmited, setNotAddmited] = useState<any>(null);

  const { data, isLoading, error, get } = useGetApi();
  const fetchPosts = () => {
    get("posts/admin-get-all");
  };
  useEffect(() => {
    if (!data) fetchPosts();
  }, []);

  useEffect(() => {
    if (data) {
      setAddmited(data.filter((post: any) => post.isAddmitted));
      setNotAddmited(data.filter((post: any) => !post.isAddmitted));
    }
  }, [data]);

  return isLoading ? (
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
      <Tabs
        size="lg"
        mt="85px"
        maxW="1500px"
        mx="auto"
        background="white"
        borderWidth="1px"
        borderColor="gray.300"
        isFitted
      >
        <TabList mx="auto">
          <Tab>Annonce accepté</Tab>
          <Tab>Annonce non accepté</Tab>
        </TabList>
        <TabPanels pt={5} mb="30px">
          <TabPanel>
            <SimpleGrid minChildWidth={"300px"} spacingY="30px">
              {addmited?.map((post: any) => (
                <AcceptedPost
                  post={post}
                  fetchPosts={fetchPosts}
                  key={post.post_id}
                />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid minChildWidth={"300px"} spacingY="30px">
              {notAddmited?.map((post: any) => (
                <NotAcceptedPost
                  post={post}
                  fetchPosts={fetchPosts}
                  key={post.post_id}
                />
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    )
  );
}
