import { useNavigate } from "react-router-dom";
import styles from "./DirectConnectionWidget.module.css";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Button } from "../Button/Button";

export function DirectConnectionWidget({ title }: { title: String }) {
	const navigate = useNavigate();
	const [directAddress, setDirectAddress] = useLocalStorage(
		"direct_address",
		""
	);

	return (
		<div className={styles.directConnectionWidget}>
			<header>
				<h2>{title}</h2>
			</header>
			<div>
				<main>
					<label htmlFor="address">Server Address</label>
					<input
						name="address"
						type="text"
						autoFocus
						autoComplete="off"
						spellCheck="false"
						value={directAddress}
						onChange={(event) => setDirectAddress(event.currentTarget.value)}
					/>
				</main>
				<nav>
					<Button size="LARGE" disabled={directAddress == ""}>
						Join Server
					</Button>
					<Button size="LARGE" onClick={() => navigate("/")}>
						Cancel
					</Button>
				</nav>
			</div>
		</div>
	);
}
