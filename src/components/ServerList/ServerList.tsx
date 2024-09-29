import { Server } from "../Server/Server";
import styles from "./ServerList.module.css";
import { LocalNetworkScanner } from "../LocalNetworkScanner/LocalNetworkScanner";
import { useSelectedServer } from "../../contexts/SelectedServerContext";
import { useServers } from "../../contexts/ServersContext";
import { useEffect, useState } from "react";

export function ServerList() {
	const [selectedServerIndex, setSelectedServerIndex] = useSelectedServer();
	const [serverToFocus, setServerToFocus] = useState<number | null>(null);
	const [servers, setServers] = useServers();

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "ArrowUp") {
				event.preventDefault();

				if (event.shiftKey) {
					if (selectedServerIndex == null) {
						setSelectedServerIndex(0);
						setServerToFocus(0);
					} else if (
						isServerExists(selectedServerIndex - 1) &&
						isServerExists(selectedServerIndex)
					) {
						handleMoveUp(selectedServerIndex - 1, selectedServerIndex);
					}
				} else {
					let newIndex = selectedServerIndex;
					if (newIndex == null) {
						newIndex = 0;
					} else {
						newIndex--;

						if (newIndex < 0) {
							newIndex = 0;
						}
					}
					setSelectedServerIndex(newIndex);
					setServerToFocus(newIndex);
				}
			} else if (event.key === "ArrowDown") {
				event.preventDefault();

				if (event.shiftKey) {
					if (
						selectedServerIndex != null &&
						isServerExists(selectedServerIndex + 1) &&
						isServerExists(selectedServerIndex)
					) {
						handleMoveDown(selectedServerIndex + 1, selectedServerIndex);
					}
				} else {
					let newIndex = selectedServerIndex;
					if (newIndex == null) {
						newIndex = 0;
					} else {
						newIndex++;

						if (newIndex >= servers.length) {
							newIndex--;
						}
					}
					setSelectedServerIndex(newIndex);
					setServerToFocus(newIndex);
				}
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [selectedServerIndex]);

	function isServerExists(id: number) {
		return servers.find((server) => server.id === id);
	}

	function handleMoveUp(previousServerId: number, targetServerId: number) {
		setServers((prevServers) => {
			const newServers = [...prevServers];

			const overwrittenServer = { ...newServers[previousServerId] };
			const overwrittenServerId = newServers[targetServerId].id;

			newServers[previousServerId] = { ...newServers[targetServerId] };
			newServers[previousServerId].id = overwrittenServer.id;

			newServers[targetServerId] = overwrittenServer;
			newServers[targetServerId].id = overwrittenServerId;

			return newServers;
		});
		setSelectedServerIndex(previousServerId);
		setServerToFocus(previousServerId);
	}

	function handleMoveDown(nextServerId: number, targetServerId: number) {
		setServers((prevServers) => {
			const newServers = [...prevServers];

			const overwrittenServer = { ...newServers[nextServerId] };
			const overwrittenServerId = newServers[targetServerId].id;

			newServers[nextServerId] = { ...newServers[targetServerId] };
			newServers[nextServerId].id = overwrittenServer.id;

			newServers[targetServerId] = overwrittenServer;
			newServers[targetServerId].id = overwrittenServerId;

			return newServers;
		});
		setSelectedServerIndex(nextServerId);
		setServerToFocus(nextServerId);
	}

	return (
		<main className={styles.serverList} tabIndex={0}>
			{servers.map((server) => (
				<Server
					key={server.id}
					serverId={server.id}
					selected={selectedServerIndex === server.id}
					onSelected={() => setSelectedServerIndex(server.id)}
					onMoveUp={handleMoveUp}
					onMoveDown={handleMoveDown}
					serverToFocus={serverToFocus}
					setServerToFocus={setServerToFocus}
				/>
			))}
			<LocalNetworkScanner />
		</main>
	);
}
