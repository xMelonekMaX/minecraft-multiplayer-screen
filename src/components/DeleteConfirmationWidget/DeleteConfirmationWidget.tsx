import { Navigate, useNavigate, useParams } from "react-router-dom";
import styles from "./DeleteConfirmationWidget.module.css";
import { useServers } from "../../contexts/ServersContext";
import { useSelectedServer } from "../../contexts/SelectedServerContext";
import { Button } from "../Button/Button";

export function DeleteConfirmationWidget() {
	const navigate = useNavigate();
	const { serverIndex } = useParams();
	const [, setSelectedServerIndex] = useSelectedServer();
	const [servers, setServers] = useServers();

	if (!serverIndex) {
		return <Navigate to="/" />;
	}

	const server = servers.find((server) => server.id === parseInt(serverIndex));
	if (!server) {
		return <Navigate to="/" />;
	}
	const serverName = server.name;

	return (
		<div className={styles.deleteConfirmationWidget}>
			<h2>Are you sure you want to remove this server?</h2>
			<p>'{serverName}' will be lost forever! (A long time!)</p>
			<nav>
				<Button
					size="SEMI_LARGE"
					onClick={() => {
						setSelectedServerIndex(null);
						setServers((prevServers) => {
							const newServers = prevServers.filter(
								(server) => server.id !== parseInt(serverIndex)
							);

							let index = 0;
							newServers.forEach((server) => {
								server.id = index;
								index++;
							});

							return newServers;
						});
						navigate("/");
					}}
				>
					Delete
				</Button>
				<Button size="SEMI_LARGE" onClick={() => navigate("/")}>
					Cancel
				</Button>
			</nav>
		</div>
	);
}
