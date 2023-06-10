import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getAuthData, setAuthData } from "./utils/authStorage";
import SignIn from "./pages/SignIn";
import IndexPage from "./pages/Index";
import UsersPage from "./pages/UserPage";
import { Box, Flex } from "@chakra-ui/react";
import SideMenu from "./component/sideMenu";
import TopMenu from "./component/topMenu";
import { useEffect, useState } from "react";

const App = () => {
  const authData = getAuthData();
  const [data, setData] = useState<any>(authData);
  const isLoggedIn = Boolean(authData);
  const protectedPages = [
    { path: "/", component: IndexPage },
    { path: "/users", component: UsersPage },
  ];
  useEffect(() => {
    //console.log("authData : ", authData);
    console.log("data : ", data);
  }, [authData]);

  return (
    <Flex>
      {isLoggedIn ? (
        <BrowserRouter>
          <SideMenu />
          <Flex direction="column" w="calc(100vw - 250px)" ml="250px" p={4}>
            <TopMenu data={data} setData={setData} />
            <Box>
              <Routes>
                {protectedPages.map((page, i) => (
                  <Route
                    key={i}
                    path={page.path}
                    element={<page.component />}
                  />
                ))}
                <Route path="/login" element={<Navigate to="/" />} />
                <Route path="*" element={<>Not found</>} />
              </Routes>
            </Box>
          </Flex>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<SignIn /*setData={setData}*/ />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      )}
    </Flex>
  );
};

export default App;
