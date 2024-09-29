import { useNavigate } from "react-router-dom";
import styles from "./ServerListButtons.module.css";
import { useSelectedServer } from "../../contexts/SelectedServerContext";
import { useServers } from "../../contexts/ServersContext";
import { Button } from "../Button/Button";

export function ServerListButtons() {
	const navigate = useNavigate();
	const [selectedServerIndex, setSelectedServerIndex] = useSelectedServer();
	const [, setServers] = useServers();

	function handleRefresh(event: React.MouseEvent<HTMLButtonElement>) {
		const target = event.target as HTMLButtonElement;
		target.blur();

		setSelectedServerIndex(null);
		setServers((prevServers) =>
			prevServers.map((server) => ({ ...server, response: null }))
		);
	}

	function handleEdit() {
		selectedServerIndex !== null &&
			navigate(`/edit-server-info/${selectedServerIndex}`);
	}

	function handleDelete() {
		selectedServerIndex !== null &&
			navigate(`/delete-confirmation/${selectedServerIndex}`);
	}

	return (
		<div className={styles.serverListButtons}>
			<Button size="MEDIUM" disabled={selectedServerIndex === null}>
				Join Server
			</Button>
			<Button size="MEDIUM" onClick={() => navigate("/direct-connection")}>
				Direct Connection
			</Button>
			<Button size="MEDIUM" onClick={() => navigate("/edit-server-info")}>
				Add Server
			</Button>
			<Button
				size="SMALL"
				onClick={handleEdit}
				disabled={selectedServerIndex === null}
			>
				Edit
			</Button>
			<Button
				size="SMALL"
				onClick={handleDelete}
				disabled={selectedServerIndex === null}
			>
				Delete
			</Button>
			<Button size="SMALL" onClick={handleRefresh}>
				Refresh
			</Button>
			<Button size="SMALL">Back</Button>
		</div>
	);
}
