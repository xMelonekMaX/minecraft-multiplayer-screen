import { ReactNode } from "react";
import styles from "./Button.module.css";
import { useWithSound } from "../../hooks/useWithSound";
import buttonSound from "../../assets/sounds/button_click.mp3";

export function Button({
	size,
	children,
	disabled,
	onClick,
}: {
	size: "LARGE" | "SEMI_LARGE" | "MEDIUM" | "SMALL";
	children?: ReactNode;
	disabled?: boolean;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
	const { playSound } = useWithSound(buttonSound);

	function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		playSound();
		if (onClick) {
			onClick(event);
		}
	}

	let className = `${styles.button} `;
	switch (size) {
		case "SMALL":
			className += `${styles.smallButton}`;
			break;
		case "MEDIUM":
			className += `${styles.mediumButton}`;
			break;
		case "SEMI_LARGE":
			className += `${styles.semiLargeButton}`;
			break;
		case "LARGE":
			className += `${styles.largeButton}`;
			break;
	}
	if (disabled) className += ` ${styles.disabled}`;

	return (
		<button className={className} onClick={handleClick} disabled={disabled}>
			{children}
		</button>
	);
}
