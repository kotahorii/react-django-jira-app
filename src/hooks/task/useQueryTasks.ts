import axios from "axios";
import { useQuery } from "react-query";
import { ReadTask } from "../../types/types";

export const useQueryTasks = () => {
  const getTasks = async () => {
    const { data } = await axios.get<ReadTask[]>(
      `${process.env.REACT_APP_API_URL}/api/tasks/`,
      {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return data;
  };
  return useQuery<ReadTask[], Error>({
    queryKey: "tasks",
    queryFn: getTasks,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};
