export function getAuthData() {
  const authDataJSON = localStorage.getItem("authData");
  if (authDataJSON) {
    return JSON.parse(authDataJSON);
  }
  return null;
}

export function setAuthData(
  data: {
    token: string;
    first_name: string;
    last_name: string;
    email: string;
  } | null
) {
  const authData = data
    ? {
        token: data?.token,
        first_name: data?.first_name,
        last_name: data?.last_name,
        email: data?.email,
      }
    : null;
  const authDataJSON = JSON.stringify(authData);
  localStorage.setItem("authData", authDataJSON);
}
