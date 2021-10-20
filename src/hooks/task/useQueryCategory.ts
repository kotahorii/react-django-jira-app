import axios from "axios";
import { useQuery } from "react-query";
import { Category } from "../../types/types";

export const useQueryCategory = () => {
  const getCategory = async () => {
    const { data } = await axios.get<Category[]>(
      `${process.env.REACT_APP_API_URL}/api/category/`,
      {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return data;
  };
  return useQuery({
    queryKey: "categories",
    queryFn: getCategory,
    staleTime: Infinity,
  });
};
