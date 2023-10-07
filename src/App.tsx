import { useQuery } from "react-query";
import { TodoList } from "./components/TodoList";
import './css/style.css';
import { getTodoList } from "./services/api";
import { Todo } from "./models/Todo";
import { AppContextProvider } from "./AppContext";
import { useEffect, useMemo, useState } from "react";
import { IAppContext } from "./models/IAppContext";

function App() {
  const defaultRefreshInterval = (1000 * 60 * 15);

  const todoListQuery = useQuery<Array<Todo>>(["todoList"],
    getTodoList,
    {
      staleTime: 100000,
      // Ser till att todo listan uppdateras var femtonde minut
      // och tvingar komponenten att rendera om
      refetchInterval: 1000 // defaultRefreshInterval
    });
  // const todoData = ;
  let todoListMemo: Array<Todo> = useMemo<Array<Todo>>(() => todoListQuery.data ? todoListQuery.data : new Array<Todo>(), [todoListQuery.data]);

  const appContext: IAppContext = {
    todoList: todoListMemo,
  }

  useEffect(() => {
    setInterval(() => {
      console.log("Refetching...")
      todoListQuery.refetch();
    }, 100000);
  })

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
