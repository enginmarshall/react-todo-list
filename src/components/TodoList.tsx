import { createTodo, deleteTodo } from "../services/api";
import { Todo } from "../models/Todo";
import { useContext, useEffect, useRef, useState } from "react";
import { TodoItem } from "./TodoItem";
import { TodoForm } from "./TodoForm";
import { appContext } from "../AppContext";
import { Header } from "./Header";

export const TodoList: React.FC = () => {
    const context = useContext(appContext);
    const defaultRefreshInterval = context ? context.defaultRefreshInterval : (1000 * 60 * 15);
    const [isLoading, setIsLoading] = useState(false);
    const [todoList, setTodoList] = useState(context ? context.todoList : new Array<Todo>());
    const todoToRemove = useRef({} as Todo);
    const [errorMessage, setErrorMessage] = useState("");

    const removeTodo = async (todo: Todo) => {
        setErrorMessage("");
        setIsLoading(true);
        const status: number = await deleteTodo(todo);
        if (status === 200) {
            todoToRemove.current = todo;
            setTodoList(todoList.filter((o) => {
                return o.id !== todoToRemove.current.id;
            }));
            if (context) {
                context.todoList = [...todoList];
            }
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
                    if (context) {
                        const newTodos = [...todoList];
                        newTodos.push(newTodo);
                        setTodoList(newTodos);
                        context.todoList = [...newTodos];
                    }
                }
                else {
                    setErrorMessage("Error when creating todo.");
                }
            }
        }
        setIsLoading(false);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            console.log("Refetching...");
            console.log("isRefetching", context?.isRefetching);
            if (context) {
                if (!context.isRefetching) {
                    context.todoList = [...todoList];
                }
            }
            clearInterval(interval);
        }, defaultRefreshInterval);
    }, [context, defaultRefreshInterval, todoList]);


    const listTodos = todoList.map((todo, index) => {
        return (
            <TodoItem todo={todo} onDelete={removeTodo} setErrorMessage={setErrorMessage} key={`${todo.id}-${index}`} />
        )
    });

    return (
        <div className="todo-area">
            <Header headerText="MY TODO app" headerType="h1" />
            <TodoForm onAdd={addTodo} />
            <Header headerText="MY TODO list" headerType="h2" />
            <ul>
                {listTodos}
            </ul>
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