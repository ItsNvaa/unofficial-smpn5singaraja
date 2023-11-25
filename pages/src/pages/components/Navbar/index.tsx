import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from "./styles/index.module.css";
import { Container, Primary, Secondary } from "@/styles/global";
import navbar from "@/resources/navbar.json";
import NavMobile from "./NavMobile";

function Navbar(): React.JSX.Element {
  const [isOpenNavbar, setIsOpenNavbar] = useState<boolean>(false);

  useEffect(() => {
    isOpenNavbar
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [isOpenNavbar]);

  const Navbar = () => {
    return (
      <Container className={styles.container}>
        <nav className={styles.wrapper}>
          <nav className={styles.wrapperContent}>
            <div className={styles.headerContent}>
              <Link href="/">
                <Image
                  height={40}
                  width={40}
                  alt="SMP NEGERI 5 SINGARAJA"
                  src="/images/icons/smpn5singaraja.png"
                  className={styles.logo}
                />
              </Link>
              <div className={`${styles.contentWrapper}`}>
                <div className={styles.content}>
                  {navbar.map((link, i) => {
                    return (
                      <Link href={link.url} key={i} className={styles.link}>
                        {link.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={styles.ctaWrapper}>
              <Primary href="/auth/login">Login</Primary>
              <Secondary href="/auth/register">Register</Secondary>
            </div>
            <div
              className={`${styles.closeBtn} ${
                isOpenNavbar ? `` : `${styles.hidden}`
              }`}
            >
              <Image
                height={22.5}
                width={22.5}
                alt="close"
                src="/images/icons/x.svg"
                className={styles.close}
                onClick={() => setIsOpenNavbar(false)}
              />
            </div>
            <div
              className={`${styles.menuWrapper} ${
                isOpenNavbar ? `${styles.hidden}` : ``
              }`}
              onClick={() => setIsOpenNavbar(!isOpenNavbar)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                width={22}
                height={22}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </div>
          </nav>
        </nav>
      </Container>
    );
  };

  return (
    <>
      <Navbar />
      <NavMobile isOpenNavbar={isOpenNavbar} />
    </>
  );
}

export default Navbar;
