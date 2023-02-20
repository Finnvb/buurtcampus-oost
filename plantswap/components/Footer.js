import classes from "./Footer.module.css";
import Link from "next/link";
function Footer() {
  return (
    <>
      <footer className={classes.footer}>
        <section>
          <h2 className={classes.socials}>Socials</h2>

          <ul>
            <li>
              <Link href="https://www.youtube.com/channel/UCP4o6SLi_oy7sVsodrD3Fxw">
                <img src="/youtube.png" alt="youtube" />
              </Link>
            </li>
            <li>
              <Link href="https://www.instagram.com/buurtcampus_oost/">
                <img src="/instagram.png" alt="instagram" />
              </Link>
            </li>
            <li>
              <Link href="https://www.facebook.com/buurtcampusoost">
                <img src="/facebook.png" alt="facebook" />
              </Link>
            </li>
            <li>
              <Link href="https://twitter.com/buurtcampus/">
                <img src="/twitter.png" alt="twitter" />
              </Link>
            </li>
          </ul>
        </section>

        <img
          src="/buurtCampusFooter(1).svg"
          alt="buurtcampus-footer"
          className={classes.buurtcampusFooter}
        />
        <div>
          <Link href="https://www.buurtcampusoost.nl/s/en-US/">
            <img
              src="/buurtcampusoost-logo.svg"
              alt="buurtcampus-logo"
              className={classes.buurtcampusLogo}
            />
          </Link>
        </div>
      </footer>
    </>
  );
}

export default Footer;
