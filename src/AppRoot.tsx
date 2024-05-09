import { Outlet } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import styles from "./AppRoot.module.css";

function AppRoot() {
  return (
    <div>
      <NavigationBar />
      <main id="main-content">
        <div className={styles.background}>
          <div className={styles.pageContainer}>
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AppRoot;
