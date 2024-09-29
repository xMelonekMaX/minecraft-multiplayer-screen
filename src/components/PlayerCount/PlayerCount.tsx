import { ReactNode } from "react";
import styles from "./PlayerCount.module.css";

export function PlayerCount({
	online,
	maxPlayers,
	extra,
}: {
	online?: number;
	maxPlayers?: number;
	extra?: ReactNode;
}) {
	if (extra) {
		return <p className={styles.playerCount}>{extra}</p>;
	} else if (online == undefined || maxPlayers == undefined) {
		return;
	}

	return (
		<p className={styles.playerCount}>
			{online}
			<span>/</span>
			{maxPlayers}
		</p>
	);
}
