
interface ITodoFormProps {
  onAdd: (task: string) => void;
}

export const TodoForm: React.FC<ITodoFormProps> = (props: ITodoFormProps) => {

  let task = "";

  return (
    <fieldset className="todo-form">
      <legend>Create Todo</legend>
      <input
        type="text"
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            props.onAdd(task);
          }
        }}
        onChange={(e) => task = e.target.value}
      />
      <button
        onClick={() => {
          props.onAdd(task);
        }}
      >
        Add task
      </button>
    </fieldset>
  );
}

