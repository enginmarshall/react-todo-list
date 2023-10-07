import { Todo } from "./Todo";

export interface IAppContext {
  todoList: Array<Todo>;
  defaultRefreshInterval: number;
}
