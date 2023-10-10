import { useContext, useState } from "react";
import { appContext } from "../AppContext";

interface ITodoFormProps {
  onAdd: (task: string) => void;
}

export const TodoForm: React.FC<ITodoFormProps> = (props: ITodoFormProps) => {
  const context = useContext(appContext);

  const [task, setTask] = useState("");
  const [rerender, setRerender] = useState(false);


  const onAdd = async (task: string) => {
    context?.setIsReloading(true);
    setRerender(!rerender);
    await props.onAdd(task);
    setTask("");
    context?.setIsReloading(false);
    setRerender(rerender);
  }

  return (
    <fieldset className="todo-form">
      <legend>Create Todo item</legend>
      <input
        disabled={context?.isReloading}
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onAdd(task);
          }
        }}
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="add-button"
        disabled={context?.isReloading}
        onClick={() => onAdd(task)}>
        Add task
      </button>
    </fieldset >
  );
}

