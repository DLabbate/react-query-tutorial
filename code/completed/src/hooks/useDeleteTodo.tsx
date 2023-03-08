import { useMutation, useQueryClient } from "@tanstack/react-query";
import todosApi from "../api";

type Params = {
  id: string;
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: Params) => todosApi.delete(id),
    onSuccess: () => {
      /**
       * Refetch the todos
       *
       * If you want your mutation to stay in loading state while your related queries update,
       * you have to return the result of invalidateQueries from the callback.
       * @link https://tkdodo.eu/blog/mastering-mutations-in-react-query
       */
      return queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
