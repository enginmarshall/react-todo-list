import { useState, useRef } from "react";
import { Todo } from "../models/Todo";
import { getTodoById, updateTodo } from "../services/api";

interface ITodoItemProps {
  todo: Todo;
  onDelete: (todo: Todo) => void;
  setErrorMessage: (message: string) => void;
}

export const TodoItem: React.FC<ITodoItemProps> = (props: ITodoItemProps) => {
  const [todo, setTodo] = useState({ ...props.todo });
  const [rerender, setRerender] = useState(false);
  let statusClassName = todo.isDone ? "done" : '';
  const isDisabled = useRef(false);
  let disabledEnabledClassName = useRef('enabled');
  let buttonClassName = useRef('enabled-delete-button');

  const updateTodoStatus = async () => {
    props.setErrorMessage("");
    isDisabled.current = true;
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

    isDisabled.current = false;
    disabledEnabledClassName.current = 'enabled';
    buttonClassName.current = "enabled-delete-button";
    statusClassName = todo.isDone ? "done" : '';
    setRerender(rerender);
  }

  const onDelete = async (todo: Todo) => {
    isDisabled.current = true;
    disabledEnabledClassName.current = "disabled";
    buttonClassName.current = "disabled-delete-button";
    setRerender(!rerender);

    await props.onDelete(todo);

    isDisabled.current = false;
    disabledEnabledClassName.current = 'enabled';
    buttonClassName.current = "enabled-delete-button";
    setRerender(rerender);
  }


  return (
    <li className={`todo-item ${statusClassName} ${disabledEnabledClassName.current}`}>
      <input
        disabled={isDisabled.current}
        type="checkbox"
        checked={todo.isDone}
        onChange={() => updateTodoStatus()}
      />
      {todo.task}
      <div className={`delete-button ${buttonClassName.current}`}
        onClick={() => onDelete(todo)}>Delete</div>
    </li>
  );
}

