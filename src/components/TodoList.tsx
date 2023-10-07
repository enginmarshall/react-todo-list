import { createTodo, deleteTodo } from "../services/api";
import { Todo } from "../models/Todo";
import { useContext, useEffect, useRef, useState } from "react";
import { TodoItem } from "./TodoItem";
import { TodoForm } from "./TodoForm";
import { appContext } from "../AppContext";
import { Header } from "./Header";

export const TodoList: React.FC = () => {
    const context = useContext(appContext);
    const todoListFromContext = context ? context.todoList : new Array<Todo>();
    const defaultRefreshInterval = context ? context.defaultRefreshInterval : (1000 * 60 * 15);
    const [todoList, setTodoList] = useState(todoListFromContext);
    const isLoading = useRef(false);
    const todoToRemove = useRef({} as Todo);
    const [errorMessage, setErrorMessage] = useState("");

    const removeTodo = async (todo: Todo) => {
        setErrorMessage("");
        isLoading.current = true;
        const status: number = await deleteTodo(todo);
        if (status === 200) {
            todoToRemove.current = todo;

            if (context) {
                context.todoList = todoList.filter(function (o) {
                    return o.id !== todoToRemove.current.id;
                });
            }
            setTodoList(context ? context.todoList : new Array<Todo>());
        }
        else {
            setErrorMessage("Error when deleting todo.");
        }
        isLoading.current = false;
    };

    const addTodo = async (task: string) => {
        setErrorMessage("");
        isLoading.current = true;
        if (task.trim().length > 0) {
            const maxId = (Math.max(...todoList.map(o => o.id)) + 1);
            const newTodo = {
                id: maxId,
                task: task,
                isDone: false
            }
            const status: number = await createTodo(newTodo);
            if (status === 201) {
                const newTodos = [...todoList];
                newTodos.push(newTodo);
                setTodoList(newTodos);
            }
            else {
                setErrorMessage("Error when creating todo.");
            }
        }
        isLoading.current = false;
    };

    useEffect(() => {
        setInterval(() => {
            console.log("Refetching...");
            setTodoList(context ? context.todoList : new Array<Todo>());
        }, defaultRefreshInterval);
    }, [context, defaultRefreshInterval, todoList]);


    const listTodos = todoList.map((todo, index) => {
        return (
            todo.id !== todoToRemove.current.id ?
                <TodoItem todo={todo} onDelete={removeTodo} setErrorMessage={setErrorMessage} key={`${todo.id}-${index}`} />
                : <></>
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
                isLoading.current &&
                <>Laddar...</>
            }
        </div>
    );
}