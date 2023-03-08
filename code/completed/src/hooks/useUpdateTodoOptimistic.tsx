import { useMutation, useQueryClient } from "@tanstack/react-query";
import todosApi from "../api";
import { TodoItemModel, TodoListModel } from "../api/models";

export const useUpdateTodoOptimistic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedTodo: TodoItemModel) =>
      todosApi.update(updatedTodo),

    onMutate: async (updatedTodo) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<TodoListModel>(["todos"]);

      // Optimistically update to the new value
      if (previousTodos) {
        const newTodos: TodoListModel = previousTodos.map((item) => {
          if (item.id === updatedTodo.id) {
            return updatedTodo;
          } else return item;
        });
        queryClient.setQueryData<TodoListModel>(["todos"], newTodos);
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
