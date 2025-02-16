import classes from "./Card.module.css";

function Card(props) {
  return (
    <div>
      <h3 className={classes.header}>{props.title}</h3>
      <div className={classes.card}>
        <article
          className={classes.cardFront}
          style={{ backgroundImage: `url(${props.img})` }}
        ></article>
        <article className={classes.cardBack}>{props.children}</article>
      </div>
    </div>
  );
}

export default Card;
