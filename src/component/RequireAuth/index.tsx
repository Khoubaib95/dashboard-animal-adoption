import { ComponentType, useEffect } from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";
import { getAuthData } from "../../utils/authStorage";

/*const RequireAuth = ({
  path,
  Component,
}: {
  path: string;
  Component: ComponentType;
}) => {
  const authData = getAuthData();
  return (
    <Route
      path={path}
      element={authData ? <Component /> : <Navigate to="/login" />}
    />
  );
};*/

const RequireAuth = ({ authData, children }: any) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authData) {
      navigate("/login");
    }
  }, [authData, navigate]);

  return <>{children}</>;
};

export default RequireAuth;
/**
  authData: {
    token: string;
    first_name: string;
    last_name: string;
    email: string;
  };
 */
