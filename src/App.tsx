import { useQuery } from "react-query";
import { TodoList } from "./components/TodoList";
import { getTodoList } from "./services/api";
import { Todo } from "./models/Todo";
import { AppContextProvider } from "./AppContext";
import { useMemo } from "react";
import { IAppContext } from "./models/IAppContext";
import './css/style.css';

function App() {
  const defaultRefreshInterval = 6000; // (1000 * 60 * 15);

  const todoListQuery = useQuery<Array<Todo>>(["todoList"],
    getTodoList,
    {
      staleTime: 100000,
      refetchIntervalInBackground: true,
      // Ser till att todo listan som hämtas från servern hämtas om var femtonde minut
      refetchInterval: defaultRefreshInterval,
    });

  let todoListMemo: Array<Todo> = useMemo<Array<Todo>>(() => todoListQuery.data ? todoListQuery.data : new Array<Todo>(), [todoListQuery.data]);

  const updateContextReloading = (isReloading: boolean) => {
    appContext.isReloading = isReloading;
    return appContext.isReloading;
  }

  const appContext: IAppContext = {
    todoList: todoListMemo,
    defaultRefreshInterval: defaultRefreshInterval,
    isRefetching: todoListQuery.isRefetching,
    isReloading: false,
    setIsReloading: updateContextReloading
  }

  return (
    <AppContextProvider value={appContext}>
      <main>
        <TodoList rqQuey={todoListQuery} />
      </main>
    </AppContextProvider>
  );
}

export default App;
