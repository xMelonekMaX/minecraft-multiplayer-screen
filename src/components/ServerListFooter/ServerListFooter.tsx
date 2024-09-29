import { ReactNode } from "react";
import styles from "./ServerListFooter.module.css";

export function ServerListFooter({ children }: { children: ReactNode }) {
	return <nav className={styles.serverListFooter}>{children}</nav>;
}
