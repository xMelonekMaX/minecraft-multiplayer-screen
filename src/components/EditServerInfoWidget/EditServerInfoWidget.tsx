import { Navigate, useNavigate, useParams } from "react-router-dom";
import styles from "./EditServerInfoWidget.module.css";
import { useState } from "react";
import { useServers } from "../../contexts/ServersContext";
import { useSelectedServer } from "../../contexts/SelectedServerContext";
import { Button } from "../Button/Button";

const RESOURCE_PACKS_OPTION_MAPPING = ["Prompt", "Enabled", "Disabled"];

export function EditServerInfoWidget({ title }: { title: String }) {
	const navigate = useNavigate();
	const { serverIndex } = useParams();
	const [servers, setServers] = useServers();
	const [, setSelectedServerIndex] = useSelectedServer();

	let defaultServerName = "";
	let defaultServerAddress = "";
	let defaultResourcePacksOption = 0;

	if (serverIndex) {
		const targetServer = servers.find(
			(server) => server.id === parseInt(serverIndex)
		);
		if (targetServer) {
			defaultServerName = targetServer.name;
			defaultServerAddress = targetServer.ipAddress;
			defaultResourcePacksOption =
				targetServer.resourcePacksOption || defaultResourcePacksOption;
		} else {
			return <Navigate to="/" />;
		}
	}

	const [serverName, setServerName] = useState(defaultServerName);
	const [serverAddress, setServerAddress] = useState(defaultServerAddress);
	const [resourcePacksOption, setResourcePacksOption] = useState(
		defaultResourcePacksOption
	);

	function changeResourcePacksOption() {
		setResourcePacksOption((prevResourcePacksOption) => {
			prevResourcePacksOption++;
			if (prevResourcePacksOption == RESOURCE_PACKS_OPTION_MAPPING.length) {
				prevResourcePacksOption = 0;
			}
			return prevResourcePacksOption;
		});
	}

	function handleDone() {
		if (serverAddress == "") return;

		setSelectedServerIndex(null);

		if (serverIndex) {
			setServers((prevServers) => {
				let server = prevServers.find(
					(server) => server.id === parseInt(serverIndex)
				);

				if (server) {
					server.name = serverName;
					server.ipAddress = serverAddress;
					server.resourcePacksOption = resourcePacksOption;
				}

				return prevServers;
			});
		} else {
			setServers((prevServers) => [
				...prevServers,
				{
					id: servers.length,
					name: serverName,
					ipAddress: serverAddress,
					resourcePacksOption: resourcePacksOption,
					lastServerIcon: null,
					response: null,
				},
			]);
		}

		navigate("/");
	}

	return (
		<div className={styles.editServerInfoWidget}>
			<header>
				<h2>{title}</h2>
			</header>
			<div>
				<label htmlFor="server-name">Server Name</label>
				<input
					name="server-name"
					type="text"
					className={styles.input}
					autoFocus
					autoComplete="off"
					spellCheck="false"
					value={serverName}
					onChange={(event) => setServerName(event.currentTarget.value)}
				/>
				<label htmlFor="server-name">Server Address</label>
				<input
					name="server-address"
					type="text"
					className={styles.input}
					autoFocus
					autoComplete="off"
					spellCheck="false"
					value={serverAddress}
					onChange={(event) => setServerAddress(event.currentTarget.value)}
				/>
				<nav>
					<Button size="LARGE" onClick={changeResourcePacksOption}>
						Server Resource Packs:{" "}
						{RESOURCE_PACKS_OPTION_MAPPING[resourcePacksOption]}
					</Button>
					<Button
						size="LARGE"
						onClick={handleDone}
						disabled={serverAddress === ""}
					>
						Done
					</Button>
					<Button size="LARGE" onClick={() => navigate("/")}>
						Cancel
					</Button>
				</nav>
			</div>
		</div>
	);
}
