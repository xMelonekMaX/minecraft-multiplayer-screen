import { ReactNode } from "react";
import styles from "./Content.module.css";

export function Content({ children }: { children: ReactNode }) {
	return <div className={styles.content}>{children}</div>;
}
