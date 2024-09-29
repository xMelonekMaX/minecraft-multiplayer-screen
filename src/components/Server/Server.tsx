import styles from "./Server.module.css";
import { useServers } from "../../contexts/ServersContext";
import { PingIcon } from "../PingIcon/PingIcon";
import { PlayerCount } from "../PlayerCount/PlayerCount";
import { WithTooltip } from "../WithTooltip/WithTooltip";
import { useEffect, useRef } from "react";
import { getServerData } from "../../utils/getServerData";
import moveUpTexture from "../../assets/textures/server_icons/move_up.png";
import moveDownTexture from "../../assets/textures/server_icons/move_down.png";
import joinTexture from "../../assets/textures/server_icons/join.png";

const DEFAULT_SERVER_ICON =
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAAAAACPAi4CAAAIKklEQVQYGaXBya+eZRkH4N89PM/7fuOZ+MqpFDFoQxAkDjHEIXHjvDExDtHEf8A/wp1x68aNMdG4VCIOCxM0QaMkGo0giBQK2ND2dDrtOd/0Ds90W1tUjgYWPddFj+N4GMfEOCbGMTGOiXFMjGNSwvEwjklx57a3CGDcuQEBYNy5Hjcp4Y6FRROhuCP1aMzARQCK//ODR/v34q2MZ7htugAU/+Op37pft3ufxVtIeF0FQAlHHD6lYdSefeyLeHOE0HcRNxGg+B9BUHyPs6fxpro9Agi3KY4izhSjvfhy+fijeDOhAlDMMgDFUebmtK4GmdolLp57KTcf+QCAwx/PN3Y+j//o8R/yFRxRf+TyvN/kLsfDZ87O19N04dJvdPe5P9UHZeuR6cbGsCs4Qr5KR60+GK+972WmpPV4Vc/vXlTVpb8+h1jsbHwAMBeN3khxxPI3F7b26ZnQi/euqYrs+8U2vxojA+6lJu7vvZsz3kgJb/TdCuc7ajcp7niitH1D/GHaK4U7ks1PtZd/6J7+EuE2770jUhwx5Aj4EGcsJvCrrVClMplebAek3U73ZBvOfu/rzjncRoDiCLdzpXbd5jBZ1YMF2pRI4maL9tH+a+6xl6hP//jjJwi35JSzMR2R9qcyeGDomCNTSS1txUlPqxFS5J/6y+igOgjN8pYmZBAPCf/1iktLX66VkDNZdlQfrNHU/Xh5atrM83e+DG8f/sJ7Y8Z/0VOAdQG3fXv3hkTNGaTthPMSmmf74zYNF7Xf4n393IlvfLPCTWR4nWZiqgNuuaIpISog09hqsOEicS6U+rESz09W1a/WMuQMEFEmw7/IQ6eAFeiWF/bIiHLSYTEP46wscdJvFA1mLo/bSZw8+0G+CUagW+RDfhLPPf3alXZHsPfKKE2KVGSr2kyhvneBuIrVALzp55zjoP3b+3ET/Zt8vGyU54KF1fW3xV/2kzU5Iu0ssmQuqApCLtYNOyZZCqgZH567P7wB6/z3BIBKpp83d418N4dphJUCSldXsSlsTG23y1zX/Si2/tVfrOh1/3j8R5pqzLOVws3vLud8ISRkWVJSJ31Z6J5gJzcnr876oP1WH1D1E+p+Mp5+Ev9y5vki+o48T5SskmeRNc1TEKEyxbo4brAuNqzhumnGVgrdhfPNOi3PzJfy5EM10eJnbeDVyz0nHSGdK+K4yV02ZBfqSrC/WpHFK/sy8av1IEdc175DiK6sLCvz899apyy7r+zTYFh3drmEg6tNMHTNQBNbR4exBHPZ9cEh+lGo4n6q+hwllvmDfpfC04lITrA770nzZ35P4taEMk6q25vCMdVzLrSd2qlwnDp67bV51BJ7ToXag3z3xjNnipHc5Xy1mJw8vH6+UOjNgg/s+urKgLtxuF4kxKoe7ITi5hdTAnpiTUDKd//pib90xknuZiv58EZ6RZSxPbDepYnfXGyvh51bGAfnCRNbijWuMxZLXZ2NdHhtdj4MovScUfpMueOB61xOkOWMqK8PN1fD3EViCtVmv3CdaejjcrVOcd5nag7Gl4D+HQTZ0DmzoJPB4cgspDBKbqRxt3f19cYmVaqI4zBsLjPGO8OG3zk7cdWfenBrb9FSOIyqnKY1T7Ngv+iy9K30I7aGuwWHtFmpRd+f4IAwm4+7kV7kQ6cuDMDkOA+iQHd8NVpJd0+8unHZL1FzPYhNjQN/RdJgPa6GayUYZQkOC6rq0I5QlqvKz40Lp1oesLLMIdX9tB3yxHupWqMicn56cLIdNdoPm7aba9SV2P5qBNcdUqGDnTTpQjl1ein3lphRMJ+zH65yGWHux9FtctiZLSeeW82lKzS+QVvddr4nzjC7f7I7n4XsZ3JSuhOaFBVFchilmLLMvTLrYkNFzHIO7FbmkMi7fjVKpaQq902xrq0yezloTunHRKKW8p4zwT38rD3yfHXXxdNn8HA6e1/1ouPuob8nefj55B58od49d8+eeyLXN778o92329u5RE2aeTcFFCAmF1qznMDFiaErYbqze3JneNcueMr5sMDqxbzVkUwuyPAELQ8PGgdVveqiPHj1hg46f+6hF6/NbmzYc4/8+aX7dy5NHy+nTzX7Zfb3d63cHm2fv/f7NsjDq6f/wFvDg3Oh7nyRoFaqaFJyoegsCJegpZw5eM9HMWTYYDB199lMOVEo59TMgP3R+uLhvHDN2WRAn46jEEedTdZl2NlohUFvvr83LXiJYQM1K0R1KJ6vkMSqFzPNjExkyGKkWSUrYMkMVoopZ0fuEsUBkYGigIBCloiYlZmcGpIUwKICTrdRtql3GT5F1/Zk1yhUGWxL14dggLEGQYH5kF2xvq4qooxsZH0Vol6mnD2XXiSSb3tnZHkNq3pvrMElA6AZbEgkFjP6xkgtQSTntUJdSoKCKkGDOStCGi0zT9dRykhiEnAxLlaIjeuUTUsuxZVc4AhBySlAnFlRSTIoZZUsxrWR5hhiJCKu2APZiMYtyMgikRAFc6rXibV0LjI77YpoNsmJhDgWifAUBEBeGgdyg7XRYChN68yGLtmAhJXAVY9eQFmqDhksmZDJPPWwXj2XbATvU+6NlON1ipS5rIWJhVo5CbAkM+FCYF9QxFVMRClJrdGKsldFDICrBm0GgdWSgbjiHE2rtrTqq2TQQsmkWnXFTIQZKUJZhvMCZmJViq0jcmWdrDJjpd7MNGrOkbgQG2kXC4GYU0qAkYdfYslkIpRbgqj4akk1JbVCw5UVG2nJxiIVL5KRQRgFZoWI/GDdoWNjhkNBgolnLAxaMkhMrnAxN/8nJXb6SrKivnAAAAAASUVORK5CYII=";

export function Server({
	serverId,
	selected,
	onSelected,
	onMoveUp,
	onMoveDown,
	serverToFocus,
	setServerToFocus,
}: {
	serverId: number;
	selected?: boolean;
	onSelected: () => void;
	onMoveUp: (previousServerId: number, serverId: number) => void;
	onMoveDown: (nextServerId: number, serverId: number) => void;
	serverToFocus: number | null;
	setServerToFocus: React.Dispatch<React.SetStateAction<number | null>>;
}) {
	const [servers, setServers] = useServers();
	const server = servers.find((s) => s.id == serverId);

	if (!server) {
		return;
	}

	const serverRef = useRef<HTMLDivElement>(null);
	const previousServer = servers.find((s) => s.id == serverId - 1);
	const nextServer = servers.find((s) => s.id == serverId + 1);
	const serverData = getServerData(server.response);

	if (serverData.motd === null) {
		serverData.motd = (
			<p className={styles.connectionFailed}>Can't connect to server</p>
		);
	}
	if (!serverData.serverLogo) {
		serverData.serverLogo = server.lastServerIcon;
	}

	useEffect(() => {
		let ignore = false;

		if (!server.response) {
			fetch(`https://sr-api.sfirew.com/server/${server.ipAddress}?protocol=764`)
				.then((res) => res.json())
				.then((json) => {
					if (!ignore) {
						setServers((prevServers) => {
							const newServers = [...prevServers];
							newServers[server.id].response = json;

							if (json.icon !== DEFAULT_SERVER_ICON)
								newServers[server.id].lastServerIcon = json.icon;

							return newServers;
						});
					}
				});
		}

		return () => {
			ignore = true;
		};
	}, [server]);

	useEffect(() => {
		if (server.id === serverToFocus) {
			if (serverToFocus === servers.length - 1)
				serverRef.current?.scrollIntoView({ block: "start" });
			else serverRef.current?.scrollIntoView({ block: "nearest" });

			setServerToFocus(null);
		}
	}, [serverToFocus]);

	return (
		<div
			className={
				selected ? `${styles.server} ${styles.selected}` : `${styles.server}`
			}
			onClick={onSelected}
			onTouchEnd={onSelected}
			ref={serverRef}
		>
			<div className={styles.logoContainer}>
				<div className={styles.logoMask}></div>
				{previousServer != undefined && (
					<img
						className={styles.moveUp}
						src={moveUpTexture}
						draggable="false"
						onClick={(event) => {
							event.stopPropagation();
							onMoveUp(previousServer.id, server.id);
						}}
					/>
				)}
				{nextServer != undefined && (
					<img
						className={styles.moveDown}
						src={moveDownTexture}
						draggable="false"
						onClick={(event) => {
							event.stopPropagation();
							onMoveDown(nextServer.id, server.id);
						}}
					/>
				)}
				<img className={styles.join} src={joinTexture} draggable="false" />
				<img
					className={styles.logo}
					src={serverData.serverLogo || DEFAULT_SERVER_ICON}
					draggable="false"
				/>
			</div>
			<div className={styles.motdContainer}>
				<h3>{server.name || " "}</h3>
				{serverData.motd}
				<div className={styles.connectionStatus}>
					<WithTooltip lines={serverData.playerCountTooltip}>
						<PlayerCount
							online={serverData.onlinePlayers}
							maxPlayers={serverData.maxPlayers}
							extra={serverData.extra}
						/>
					</WithTooltip>
					<WithTooltip lines={serverData.pingTooltip}>
						<PingIcon ping={serverData.ping} />
					</WithTooltip>
				</div>
			</div>
		</div>
	);
}
