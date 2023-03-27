import classes from "./Card.module.css";

function Card(props) {
  console.log("test");
  return (
    <div>
      <h3 className={classes.header}>{props.title}</h3>
      <div className={classes.card}>
        <div
          className={classes.cardFront}
          style={{ backgroundImage: `url(${props.img})` }}
        ></div>
        <div className={classes.cardBack}>{props.children}</div>
      </div>
    </div>
  );
}

export default Card;
