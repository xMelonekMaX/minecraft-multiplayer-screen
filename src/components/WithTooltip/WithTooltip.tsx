import { ReactNode, useEffect, useRef } from "react";
import styles from "./WithTooltip.module.css";

export function WithTooltip({
	children,
	lines,
}: {
	children: ReactNode;
	lines?: ReactNode[];
}) {
	const tooltip = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			const cursorX = event.clientX,
				cursorY = event.clientY;

			const tooltipElement = tooltip.current;
			if (tooltipElement !== null) {
				const tooltipWidth = tooltipElement.offsetWidth;

				const rootStyles = getComputedStyle(document.documentElement);
				const scaleValue = parseInt(rootStyles.getPropertyValue("--scale"));
				const margin = 9 * scaleValue;

				tooltipElement.style.top = cursorY + "px";

				if (tooltipWidth + cursorX + margin > window.innerWidth)
					tooltipElement.style.left = cursorX - tooltipWidth - margin + "px";
				else tooltipElement.style.left = cursorX + margin + "px";
			}
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<div className={styles.withTooltip}>
			{children}
			{lines && (
				<div ref={tooltip} className={styles.tooltip}>
					{lines.map((line, index) => (
						<p key={index}>{line}</p>
					))}
				</div>
			)}
		</div>
	);
}
