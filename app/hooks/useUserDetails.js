import { useUser } from "../context/UserContext";

export const useUserDetails = () => {
  const { user, profile, loading, logout } = useUser();
  return { user, profile, loading, logout };
};
