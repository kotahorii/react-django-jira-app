import axios from "axios";
import { useQuery } from "react-query";
import { Profile } from "../../types/types";

export const useQueryProfs = () => {
  const getProfs = async () => {
    const { data } = await axios.get<Profile[]>(
      `${process.env.REACT_APP_API_URL}/api/profile/`,
      {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return data;
  };
  return useQuery<Profile[], Error>({
    queryKey: "profs",
    queryFn: getProfs,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};
