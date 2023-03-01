import classes from "./SectionItem.module.css";
import Link from "next/link";

function SectionItem(props) {
  return (
    <>
      <div className={classes.container} style={{ height: `${props.height}` }}>
        <h3>{props.title}</h3>
        <p>{props.children}</p>
        <img
          className={classes.sectionItemImg}
          src={props.source}
          alt={props.source}
        />
        <div style={{ display: `${props.display}` }}>
          <Link className={classes.link} href={props.link}>
            {props.linkTitle}
          </Link>
        </div>
      </div>
    </>
  );
}

export default SectionItem;
