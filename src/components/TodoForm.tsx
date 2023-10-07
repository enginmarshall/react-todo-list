import { useRef, useState } from "react";

interface ITodoFormProps {
  onAdd: (task: string) => void;
}

export const TodoForm: React.FC<ITodoFormProps> = (props: ITodoFormProps) => {

  const [task, setTask] = useState("");


  const onAdd = (task: string) => {
    props.onAdd(task);
    setTask("");
  }

  return (
    <fieldset className="todo-form">
      <legend>Create Todo item</legend>
      <input
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onAdd(task);
          }
        }}
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        onClick={() => {
          onAdd(task);
        }}
      >
        Add task
      </button>
    </fieldset>
  );
}

