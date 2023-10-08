import { useQuery } from "react-query";
import { TodoList } from "./components/TodoList";
import { getTodoList } from "./services/api";
import { Todo } from "./models/Todo";
import { AppContextProvider } from "./AppContext";
import { useMemo } from "react";
import { IAppContext } from "./models/IAppContext";
import './css/style.css';

function App() {
  const defaultRefreshInterval = (1000 * 60 * 15);

  const todoListQuery = useQuery<Array<Todo>>(["todoList"],
    getTodoList,
    {
      staleTime: 100000,
      refetchIntervalInBackground: true,
      // Ser till att todo listan som hämtas från servern hämtas om var femtonde minut
      refetchInterval: defaultRefreshInterval
    });

  let todoListMemo: Array<Todo> = useMemo<Array<Todo>>(() => todoListQuery.data ? todoListQuery.data : new Array<Todo>(), [todoListQuery.data]);

  const appContext: IAppContext = {
    todoList: todoListMemo,
    defaultRefreshInterval: defaultRefreshInterval
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
