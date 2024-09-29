import { useParams } from "react-router-dom";
import { CenteredContent } from "../components/CenteredContent/CenteredContent";
import { Content } from "../components/Content/Content";
import { DarkBackground } from "../components/DarkBackground/DarkBackground";
import { ServerList } from "../components/ServerList/ServerList";
import { ServerListButtons } from "../components/ServerListButtons/ServerListButtons";
import { ServerListFooter } from "../components/ServerListFooter/ServerListFooter";
import { ServerListHeader } from "../components/ServerListHeader/ServerListHeader";
import { useServers } from "../contexts/ServersContext";
import { ScrollableContent } from "../components/ScrollableContent/ScrollableContent";

const SECTION_TITLE = "Play Multiplayer";

export function PlayMultiplayer() {
	const { serverToAdd } = useParams();
	const [servers, setServers] = useServers();

	if (serverToAdd) {
		const server = servers.find((s) => s.ipAddress === serverToAdd);
		if (!server) {
			setServers([
				...servers,
				{
					id: servers.length,
					name: "",
					ipAddress: serverToAdd,
					resourcePacksOption: 0,
					lastServerIcon: null,
					response: null,
				},
			]);
		}
	}

	return (
		<>
			<title>{SECTION_TITLE}</title>
			<Content>
				<ServerListHeader title={SECTION_TITLE} />
				<DarkBackground>
					<CenteredContent>
						<ScrollableContent>
							<ServerList />
						</ScrollableContent>
					</CenteredContent>
				</DarkBackground>
				<ServerListFooter>
					<CenteredContent>
						<ServerListButtons />
					</CenteredContent>
				</ServerListFooter>
			</Content>
		</>
	);
}
