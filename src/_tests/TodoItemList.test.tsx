import { TodoItem } from "../components/TodoItem";
import { TodoListMock } from "../mocks/TodoListMock";
import { render, screen } from '@testing-library/react';
import { IAppContext } from "../models/IAppContext";
import { TodoList } from "../components/TodoList";
import { AppContextProvider } from "../AppContext";

describe('TodoItemList test', () => {

    const context: IAppContext = {
        todoList: TodoListMock,
        defaultRefreshInterval: 60000,
        isRefetching: false
    };

    test("The todo list is shown on the page", () => {

        render(<AppContextProvider value={context}><TodoList /></AppContextProvider>);
        const todoItems = screen.getAllByRole('listitem');
        expect(todoItems.length > 0).toBeTruthy();
    })
});