import styles from "./ServerListHeader.module.css";

export function ServerListHeader({ title }: { title: string }) {
	return (
		<header className={styles.serverListHeader}>
			<h1>{title}</h1>
		</header>
	);
}
