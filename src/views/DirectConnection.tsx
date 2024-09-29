import { CenteredContent } from "../components/CenteredContent/CenteredContent";
import { DirectConnectionWidget } from "../components/DirectConnectionWidget/DirectConnectionWidget";

const SECTION_TITLE = "Direct Connection";

export function DirectConnection() {
	return (
		<>
			<title>{SECTION_TITLE}</title>
			<CenteredContent>
				<DirectConnectionWidget title={SECTION_TITLE} />
			</CenteredContent>
		</>
	);
}
