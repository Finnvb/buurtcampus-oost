import classes from "./NavBar.module.css";

function Title(props) {
  return (
    <>
      <h2 className={classes.titleText}>{props.titleText}</h2>
    </>
  );
}

export default Title;
