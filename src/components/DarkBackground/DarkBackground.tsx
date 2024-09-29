import { ReactNode } from "react";
import styles from "./DarkBackground.module.css";

export function DarkBackground({ children }: { children: ReactNode }) {
	return <div className={styles.darkBackground}>{children}</div>;
}
