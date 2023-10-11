import { createTodo, deleteTodo } from "../services/api";
import { Todo } from "../models/Todo";
import { useContext, useRef, useState } from "react";
import { TodoItem } from "./TodoItem";
import { TodoForm } from "./TodoForm";
import { appContext } from "../AppContext";
import { Header } from "./Header";
import { UseQueryResult } from "react-query";

interface ITodoListProps {
    rqQuey: UseQueryResult<Todo[], unknown>
}

export const TodoList: React.FC<ITodoListProps> = (props: ITodoListProps) => {
    const context = useContext(appContext);
    const [isLoading, setIsLoading] = useState(false);
    const todoToRemove = useRef({} as Todo);
    const [errorMessage, setErrorMessage] = useState("");

    const removeTodo = async (todo: Todo) => {
        setErrorMessage("");
        setIsLoading(true);
        const status: number = await deleteTodo(todo);
        if (status === 200) {
            todoToRemove.current = todo;
            await props.rqQuey.refetch();
        }
        else {
            setErrorMessage("Error when deleting todo.");
        }
        setIsLoading(false);
    };

    const addTodo = async (task: string) => {
        setErrorMessage("");
        setIsLoading(true);
        if (task.trim().length > 0) {
            if (context) {

                const maxId = (Math.max(...context.todoList.map(o => o.id)) + 1);
                const newTodo = {
                    id: maxId,
                    task: task,
                    isDone: false
                }
                const status: number = await createTodo(newTodo);
                if (status === 201) {
                    await props.rqQuey.refetch();
                }
                else {
                    setErrorMessage("Error when creating todo.");
                }
            }
        }
        setIsLoading(false);
    };

    const listTodos = context?.todoList.map((todo, index) => {
        return (
            <TodoItem todo={todo} onDelete={removeTodo} setErrorMessage={setErrorMessage} key={`${todo.id}-${index}`} />
        )
    });

    return (
        <div className="todo-area">
            <Header headerText="MY TODO app" headerType="h1" />
            <TodoForm onAdd={addTodo} />
            <Header headerText="MY TODO list" headerType="h2" />
            {context && context.todoList?.length > 0 &&
                <ul data-testid="todoList">
                    {listTodos}
                </ul>
            }
            {
                errorMessage.length > 0 &&
                <div className="error-message">{errorMessage}</div>
            }
            {
                isLoading &&
                <>Laddar...</>
            }
        </div>
    );
}