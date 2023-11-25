import styles from "./styles/NavMobile.module.css";
import Link from "next/link";
import navbar from "@/resources/navbar.json";

function NavMobile({ isOpenNavbar }: { isOpenNavbar: boolean }) {
  return (
    <>
      <div
        className={`${isOpenNavbar ? styles.active : styles.deactive} ${
          styles.container
        }`}
      >
        <div className={styles.wrapper}>
          <div className={styles.contentWrapper}>
            <div className={styles.content}>
              {navbar.map((link, i) => {
                return (
                  <Link href={link.url} key={i} className={styles.link}>
                    {link.title}
                  </Link>
                );
              })}
            </div>
            <div className={styles.ctaWrapper}>
              <a href="/auth/login" className={styles.primaryBtn}>
                Login
              </a>
              <a href="/auth/register" className={styles.secondaryBtn}>
                Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavMobile;
