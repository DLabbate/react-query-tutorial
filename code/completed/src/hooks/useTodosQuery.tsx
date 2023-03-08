import { useQuery } from "@tanstack/react-query";
import todosApi from "../api";

export const useTodosQuery = () =>
  useQuery({
    queryKey: ["todos"],
    queryFn: todosApi.list,
  });
