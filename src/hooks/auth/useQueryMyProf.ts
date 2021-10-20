import { useQuery } from "react-query";
import axios from "axios";
import { LoginUser } from "../../types/types";

export const useQueryMyProf = () => {
  const getMyProf = async () => {
    const { data } = await axios.get<LoginUser>(
      `${process.env.REACT_APP_API_URL}/api/loginuser/`,
      {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return data;
  };
  return useQuery<LoginUser, Error>({
    queryKey: "myprof",
    queryFn: getMyProf,
    staleTime: 0,
  });
};
