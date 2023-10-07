interface IHeaderProps {
  headerType: string;
  headerText: string;
}

export const Header: React.FC<IHeaderProps> = (props: IHeaderProps) => {

  return (
    <>
      {props.headerType === "h1" &&
        <h1>{props.headerText}</h1>}
      {props.headerType === "h2" &&
        <h2>{props.headerText}</h2>}
    </>
  );
}

