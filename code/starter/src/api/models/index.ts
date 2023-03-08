export type TodoItemModel = {
  id: string;
  completed: boolean;
  description: string;
};

export type TodoListModel = TodoItemModel[];
