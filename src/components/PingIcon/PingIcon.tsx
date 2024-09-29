import { useEffect, useState } from "react";
import styles from "./PingIcon.module.css";

import unreachable from "../../assets/textures/ping_icons/unreachable.png";
import ping1 from "../../assets/textures/ping_icons/ping_1.png";
import ping2 from "../../assets/textures/ping_icons/ping_2.png";
import ping3 from "../../assets/textures/ping_icons/ping_3.png";
import ping4 from "../../assets/textures/ping_icons/ping_4.png";
import ping5 from "../../assets/textures/ping_icons/ping_5.png";
import pinging1 from "../../assets/textures/ping_icons/pinging_1.png";
import pinging2 from "../../assets/textures/ping_icons/pinging_2.png";
import pinging3 from "../../assets/textures/ping_icons/pinging_3.png";
import pinging4 from "../../assets/textures/ping_icons/pinging_4.png";
import pinging5 from "../../assets/textures/ping_icons/pinging_5.png";

const PINGING_STEP_MAPPING = [
	pinging1,
	pinging2,
	pinging3,
	pinging4,
	pinging5,
	pinging4,
	pinging3,
	pinging2,
	pinging1,
];

export function PingIcon({ ping }: { ping: number | null }) {
	const [pingingStep, setPingingStep] = useState(Math.floor(Math.random() * 4));

	useEffect(() => {
		let interval = null;

		if (ping === null) {
			interval = setInterval(() => {
				setPingingStep((prevStep) => {
					let newStep = (prevStep % 8) + 1;
					return newStep;
				});
			}, 100);
		}

		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [ping]);

	let iconUrl;
	if (ping == null) {
		iconUrl = PINGING_STEP_MAPPING[pingingStep];
	} else if (ping === -1) {
		iconUrl = unreachable;
	} else if (ping < 150) {
		iconUrl = ping5;
	} else if (ping < 300) {
		iconUrl = ping4;
	} else if (ping < 600) {
		iconUrl = ping3;
	} else if (ping < 1000) {
		iconUrl = ping2;
	} else {
		iconUrl = ping1;
	}

	return <img className={styles.pingIcon} src={iconUrl} draggable="false" />;
}
