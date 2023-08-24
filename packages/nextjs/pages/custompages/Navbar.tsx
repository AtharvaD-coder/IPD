// pages/custompages/navbar.tsx
import React from "react";
import { motion } from "framer-motion";
import styles from "./navbar.module.css";

const Navbar: React.FC = () => {
  return (
    <section className={styles.navbar-wrapper}>
      <div className="">
        <div className={styles["navbar-left"]}>
          <div className={styles["navbar-title"]}>
            <div className="orange-circle" />
            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 2,
                type: "ease-in",
              }}
            >
              Find <br />
              Only The
              <br /> Best!
            </motion.h1>
          </div>

          <div className={styles["search-bar"]}>
            <input type="text" />
            <button className="button">Search</button>
          </div>
        </div>

        <div className="navbar-right">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "ease-in",
            }}
            className={styles["image-container"]}
          >
            <img src="./navbar-image.png" alt="houses" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
