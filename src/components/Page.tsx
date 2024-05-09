import React from "react";
import styles from "./Page.module.css";

interface PageProps {
  title: string;
  children: React.ReactNode;
}

const formatPageTitle = (pageTitle: string) =>
  `${pageTitle} | TSE Vite Workshop`;

function Page({ title, children }: PageProps) {
  return (
    <div className={styles.page}>
      <title>{formatPageTitle(title)}</title>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export default Page;
