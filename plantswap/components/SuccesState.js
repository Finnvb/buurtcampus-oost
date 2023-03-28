import classes from "./SuccesState.module.css";

function SuccesState(props) {
  return (
    <div className={classes.formSuccesMsg}>
      {/* Form submitted and being reviewed */}
      {props.message}
    </div>
  );
}

export default SuccesState;
