import classes from "./SectionItem.module.css";
import Link from "next/link";
import Image from "next/image";
function SectionItem(props) {
  return (
    <>
      <article
        style={{ height: `${props.height}` }}
        className={classes.container}
      >
        <h3>{props.title}</h3>
        <p>{props.children}</p>

        <Image
          className={classes.sectionItemImg}
          src={props.source}
          alt={props.source}
          width="80"
          height="80"
        />
        <div style={{ display: `${props.display}` }}>
          <Link className={classes.link} href={props.link}>
            {props.linkTitle}
          </Link>
        </div>
      </article>
    </>
  );
}

export default SectionItem;
