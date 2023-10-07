import { Todo } from "../models/Todo";


const baseUrl = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '';


export const getTodoList = async () => {
  const response = await fetch(`${baseUrl}/todos`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const data = await response.json();
  const todoList: Array<Todo> = [...data];
  return todoList;
};

export const getTodoById = async (id: number) => {
  const todoList: Array<Todo> = await getTodoList();
  const todos = todoList.filter(o => o.id === id) as Array<Todo>;
  return todos.length > 0 ? todos[0] : {} as Todo;
};

export const deleteTodo = async (todo: Todo) => {
  const todoToDelete: Todo = await getTodoById(todo.id);
  let status: number = 0;
  if (todoToDelete.id > 0) {
    const response = await fetch(`${baseUrl}/todos/${todo.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    status = response.status;
  }
  else {
    status = 404;
  }
  return status;
};

export const createTodo = async (todo: Todo) => {
  const response = await fetch(`${baseUrl}/todos`, {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.status;
};

export const updateTodo = async (todo: Todo) => {
  const response = await fetch(`${baseUrl}/todos/${todo.id}`, {
    method: "PATCH",
    body: JSON.stringify({ isDone: todo.isDone }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  return response.status;
}