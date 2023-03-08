export type TodoItemModel = {
  id: string;
  completed: boolean;
  description: string;
};

export type TodoListModel = TodoItemModel[];

const hardcodedTodoList: TodoListModel = [
  { id: "1", completed: false, description: "Study" },
  { id: "2", completed: false, description: "Exercise" },
  { id: "3", completed: true, description: "Subscribe to Dom the Engineer!" },
  { id: "4", completed: true, description: "Like the video!" },
];

// Key used for local storage
const key = "todos-react-query";

interface Database {
  list(): TodoListModel;
  create(description: string): TodoItemModel;
  update(updatedTodo: TodoItemModel): TodoItemModel;
  delete(id: string): void;
  seed(): void;
}

/**
 * Helper methods for performing CRUD operations in local storage.
 */
const todosDb: Database = {
  /**
   * Retrieves the entire list of todo items.
   */
  list() {
    const results = window.localStorage.getItem(key);

    if (results) return JSON.parse(results) as TodoListModel;
    else return [];
  },

  /**
   * Creates a new todo item, with a randomly generated `id` field.
   * By default, a new todo item is initialized with `completed = false`
   */
  create(description) {
    const results = this.list();

    const newTodo = {
      id: Date.now().toString(),
      completed: false,
      description,
    };

    window.localStorage.setItem(key, JSON.stringify([...results, newTodo]));

    return newTodo;
  },

  /**
   * Updates a todo item by `id`, and returns the updated todo item.
   */
  update(updatedTodo) {
    const results = this.list();

    const index = results.findIndex((item) => item.id === updatedTodo.id);
    if (index !== -1) {
      results[index] = updatedTodo;
    }

    window.localStorage.setItem(key, JSON.stringify(results));

    return updatedTodo;
  },

  /**
   * Deletes a todo item by `id`.
   */
  delete(id) {
    const results = this.list();

    window.localStorage.setItem(
      key,
      JSON.stringify(results.filter((item) => item.id !== id))
    );
  },

  /**
   * Puts default values in the database, if no values exist.
   */
  seed() {
    const results = this.list();

    if (results.length === 0)
      window.localStorage.setItem(key, JSON.stringify(hardcodedTodoList));
  },
} as const;

export default todosDb;
