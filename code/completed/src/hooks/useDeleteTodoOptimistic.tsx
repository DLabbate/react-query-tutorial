import { useMutation, useQueryClient } from "@tanstack/react-query";
import todosApi from "../api";
import { TodoListModel } from "../api/models";

type Params = {
  id: string;
};

/**
 * An optimistic update allows us to update the UI instantly without waiting for feedback from the server.
 * @link https://tanstack.com/query/latest/docs/react/guides/optimistic-updates
 * @link https://tanstack.com/query/latest/docs/react/examples/react/optimistic-updates-typescript
 */
export const useDeleteTodoOptimistic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: Params) => todosApi.delete(id),

    onMutate: async ({ id }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<TodoListModel>(["todos"]);

      // Optimistically update to the new value
      if (previousTodos) {
        queryClient.setQueryData(
          ["todos"],
          previousTodos.filter((item) => item.id !== id)
        );
      }

      // Return a context object with the snapshotted value
      return { previousTodos };
    },

    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<TodoListModel>(
          ["todos"],
          context.previousTodos
        );
      }
    },

    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
