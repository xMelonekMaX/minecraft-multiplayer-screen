import { ReactNode } from "react";
import styles from "./CenteredContent.module.css";

export function CenteredContent({ children }: { children: ReactNode }) {
	return <div className={`${styles.centeredContent}`}>{children}</div>;
}
