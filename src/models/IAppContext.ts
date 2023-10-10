import { Todo } from "./Todo";

export interface IAppContext {
  todoList: Array<Todo>;
  defaultRefreshInterval: number;
  isRefetching: boolean;
  isReloading: boolean;
  setIsReloading: (isReloading: boolean) => {};
}
