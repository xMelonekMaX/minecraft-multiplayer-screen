import { ReactNode, useEffect, useRef } from "react";
import styles from "./ScrollableContent.module.css";
import { useServerListScroll } from "../../contexts/ServerListScrollContext";

export function ScrollableContent({ children }: { children: ReactNode }) {
	const scrollableContentRef = useRef<HTMLDivElement>(null);
	const [serverListScroll, setServerListScroll] = useServerListScroll();

	useEffect(() => {
		if (scrollableContentRef.current) {
			scrollableContentRef.current.scrollTop = serverListScroll;
		}

		const handleScroll = () => {
			if (scrollableContentRef.current) {
				setServerListScroll(scrollableContentRef.current.scrollTop);
			}
		};

		scrollableContentRef.current?.addEventListener("scroll", handleScroll);

		return () => {
			scrollableContentRef.current?.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className={styles.scrollableContent} ref={scrollableContentRef}>
			{children}
		</div>
	);
}
