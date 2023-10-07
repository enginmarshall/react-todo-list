import { TodoItem } from "../components/TodoItem";
import { TodoListMock } from "../mocks/TodoListMock";
import { render, screen } from '@testing-library/react';
import { Todo } from "../models/Todo";

describe('TodoItem test', () => {
    test("The task is shown on the page", () => {
        const todo: Todo = TodoListMock[2];
        render(<TodoItem todo={todo} onDelete={(todo: Todo) => { }}
            setErrorMessage={(message: string) => { }} />)
        expect(screen.getByText(todo.task)).toBeDefined();
    })
});