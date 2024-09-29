import { useRef, useState } from "react";
import styles from "./LocalNetworkScanner.module.css";

const frames = ["O o o", "o O o", "o o O", "o O o"];

export function LocalNetworkScanner() {
	const [animationFrame, setAnimationFrame] = useState(0);
	const intervalRef = useRef<number>(null);

	if (intervalRef.current === null) {
		intervalRef.current = setInterval(() => {
			setAnimationFrame((prevAnimationFrame) => {
				prevAnimationFrame++;
				if (prevAnimationFrame == frames.length) {
					prevAnimationFrame = 0;
				}
				return prevAnimationFrame;
			});
		}, 300);
	}

	return (
		<div className={styles.localNetworkScanner}>
			<p>Scanning for games on your local network</p>
			<p className={styles.scannerAnimation}>{frames[animationFrame]}</p>
		</div>
	);
}
