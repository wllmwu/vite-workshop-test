import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import styles from "./NavigationBar.module.css";

interface NavBarLink {
  title: string;
  to: string;
}

const basePath = import.meta.env.BASE_URL;

const navBarLinks: NavBarLink[] = [
  { title: "Home", to: basePath },
  { title: "About", to: `${basePath}/about` },
  { title: "Projects", to: `${basePath}/projects` },
  { title: "Contact", to: `${basePath}/contact` },
];

function NavigationBar() {
  const location = useLocation();
  const currentPath = location.pathname.split("/");
  const currentBase = currentPath.length > 0 ? `/${currentPath[1]}` : "";

  return (
    <nav className={styles.navigationBar}>
      <Link to={basePath} className={styles.homeLink}>
        My Site
      </Link>
      <menu className={styles.topLinkList}>
        {navBarLinks.map((link) => (
          <li key={link.to} className={styles.topLinkItem}>
            <Link
              to={link.to}
              className={classNames(
                styles.topLink,
                currentBase === link.to ? styles.topLinkCurrent : null
              )}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </menu>
    </nav>
  );
}

export default NavigationBar;
