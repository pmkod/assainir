import { useQuery } from "@tanstack/react-query";
import { loggedInUserQueryKey } from "../constants/query-keys";

export const useLoggedInUser = () => {
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: [loggedInUserQueryKey],
    // queryFn: () => {

    // }
  });

  return { data };
};
