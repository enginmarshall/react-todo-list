import { useState, useRef, useContext } from "react";
import { Todo } from "../models/Todo";
import { updateTodo } from "../services/api";
import { appContext } from "../AppContext";

interface ITodoItemProps {
  todo: Todo;
  onDelete: (todo: Todo) => void;
  setErrorMessage: (message: string) => void;
}

export const TodoItem: React.FC<ITodoItemProps> = (props: ITodoItemProps) => {
  const context = useContext(appContext);
  const [todo, setTodo] = useState({ ...props.todo });
  const [rerender, setRerender] = useState(false);
  let statusClassName = todo.isDone ? "done" : '';
  let disabledEnabledClassName = useRef('enabled');
  let buttonClassName = useRef('enabled-delete-button');

  const updateTodoStatus = async () => {
    props.setErrorMessage("");
    context?.setIsReloading(true);
    disabledEnabledClassName.current = "disabled";
    buttonClassName.current = "disabled-delete-button";
    setRerender(!rerender);

    const updatedTodo = { ...todo };
    updatedTodo.isDone = !todo.isDone
    const status: number = await updateTodo(updatedTodo);

    if (status === 200) {
      setTodo({ ...updatedTodo });
    }
    else {
      props.setErrorMessage("Error when updating todo.");
    }

    context?.setIsReloading(false);
    disabledEnabledClassName.current = 'enabled';
    buttonClassName.current = "enabled-delete-button";
    statusClassName = todo.isDone ? "done" : '';
    setRerender(rerender);
  }

  const onDelete = async (todo: Todo) => {
    context?.setIsReloading(true);
    disabledEnabledClassName.current = "disabled";
    buttonClassName.current = "disabled-delete-button";
    setRerender(!rerender);

    await props.onDelete(todo);

    context?.setIsReloading(false);
    disabledEnabledClassName.current = 'enabled';
    buttonClassName.current = "enabled-delete-button";
    setRerender(rerender);
  }

  const todoId = `${todo.id}todo`;

  return (
    <li className={`todo-item ${statusClassName} ${disabledEnabledClassName.current}`}>
      <input
        id={todoId}
        name={todoId}
        disabled={context?.isReloading}
        type="checkbox"
        checked={todo.isDone}
        onChange={() => updateTodoStatus()}
      />
      <label htmlFor={todoId}>{todo.task}</label>
      <button className={`delete-button ${buttonClassName.current}`}
        disabled={context?.isReloading}
        onClick={() => onDelete(todo)}>Delete</button>
    </li>
  );
}

