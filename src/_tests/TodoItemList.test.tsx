import { TodoListMock } from "../mocks/TodoListMock";
import { render, screen } from '@testing-library/react';
import { IAppContext } from "../models/IAppContext";
import { TodoList } from "../components/TodoList";
import { AppContextProvider } from "../AppContext";
import { Todo } from "../models/Todo";
import { UseQueryResult } from "react-query";

describe('TodoItemList test', () => {

    const context: IAppContext = {
        todoList: TodoListMock,
        defaultRefreshInterval: 60000,
        isRefetching: false,
        isReloading: false,
        setIsReloading: (isLoading: boolean) => { return false; }
    };

    test("The todo list is shown on the page", () => {

        render(<AppContextProvider value={context}><TodoList rqQuey={{} as UseQueryResult<Todo[], unknown>} /></AppContextProvider>);
        const todoItems = screen.getAllByRole('listitem');
        expect(todoItems.length > 0).toBeTruthy();
    })
    test("The page loads but the todoList list is not shown when the todo list is empty", () => {
        context.todoList = new Array<Todo>();
        render(<AppContextProvider value={context}><TodoList rqQuey={{} as UseQueryResult<Todo[], unknown>} /></AppContextProvider>);
        expect(screen.queryByTestId("todoList")).toBeNull();
    })
});