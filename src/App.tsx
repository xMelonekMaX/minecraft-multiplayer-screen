import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { SelectedServerContext } from "./contexts/SelectedServerContext";
import { ServersContext } from "./contexts/ServersContext";
import { ServerListScrollContext } from "./contexts/ServerListScrollContext";
import { OBFUSCATED_CLASS_NAME } from "./constants";
import { obfuscateCharacters } from "./utils/obfuscateCharacters";

export function App() {
	const navigate = useNavigate();
	const [selectedServerIndex, setSelectedServerIndex] = useState<number | null>(
		null
	);
	const [servers, setServers] = useLocalStorage("servers", []);
	const [serverListScroll, setServerListScroll] = useState(0);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				navigate("/");
			}
		};

		const obfuscatedTextAnimation = setInterval(() => {
			const obfuscatedElements = document.querySelectorAll(
				`.${OBFUSCATED_CLASS_NAME}`
			);

			obfuscatedElements.forEach((element) => {
				if (element instanceof HTMLElement) {
					element.style.display = "inline-block";
					element.style.position = "relative";
					element.style.whiteSpace = "nowrap";

					const originalText = element.textContent || "";
					const newText = obfuscateCharacters(originalText);

					element.innerText = newText;
					const originalWidth = element.offsetWidth;

					if (element.offsetWidth > originalWidth || !element.style.width) {
						element.style.width = originalWidth + "px";
					}
				}
			});
		}, 100);

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			clearInterval(obfuscatedTextAnimation);
		};
	}, []);

	return (
		<ServersContext value={[servers, setServers]}>
			<SelectedServerContext
				value={[selectedServerIndex, setSelectedServerIndex]}
			>
				<ServerListScrollContext
					value={[serverListScroll, setServerListScroll]}
				>
					<Outlet />
				</ServerListScrollContext>
			</SelectedServerContext>
		</ServersContext>
	);
}
