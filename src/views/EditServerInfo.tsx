import { CenteredContent } from "../components/CenteredContent/CenteredContent";
import { EditServerInfoWidget } from "../components/EditServerInfoWidget/EditServerInfoWidget";

const SECTION_TITLE = "Edit Server Info";

export function EditServerInfo() {
	return (
		<>
			<title>{SECTION_TITLE}</title>
			<CenteredContent>
				<EditServerInfoWidget title={SECTION_TITLE} />
			</CenteredContent>
		</>
	);
}
