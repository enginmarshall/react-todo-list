import { useQuery } from "react-query";
import { TodoList } from "./components/TodoList";
import './css/style.css';
import { getTodoList } from "./services/api";
import { Todo } from "./models/Todo";
import { AppContextProvider } from "./AppContext";
import { useMemo, useState } from "react";
import { IAppContext } from "./models/IAppContext";

function App() {
  const todoListQuery = useQuery<Array<Todo>>(["todoList"],
    getTodoList,
    {
      // Ser till att todo listan uppdateras var femtonde minut
      // och tvingar komponenten att rendera om
      staleTime: 100000,
      refetchInterval: 1000000
    });
  // const todoList: Array<Todo> = todoListQuery.data ? todoListQuery.data : Array<Todo>();
  const todoData = todoListQuery.data ? todoListQuery.data : new Array<Todo>();
  const todoListMemo: Array<Todo> = useMemo<Array<Todo>>(() => todoData, [todoData]);

  const appContext: IAppContext = {
    todoList: todoListMemo,
  }

  if (todoListQuery.isLoading || todoListQuery.isLoading || todoListMemo.length === 0) {
    return <>Loading todos...</>;
  }

  return (
    <AppContextProvider value={appContext}>
      <main>
        <TodoList />
      </main>
    </AppContextProvider>
  );
}

export default App;
