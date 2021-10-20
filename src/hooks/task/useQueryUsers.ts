import axios from "axios";
import { useQuery } from "react-query";
import { User } from "../../types/types";

export const useQueryUsers = () => {
  const getUsers = async () => {
    const { data } = await axios.get<User[]>(
      `${process.env.REACT_APP_API_URL}/api/users/`,
      {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return data;
  };
  return useQuery<User[], Error>({
    queryKey: "users",
    queryFn: getUsers,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};
