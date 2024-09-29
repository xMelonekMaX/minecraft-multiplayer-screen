import { CenteredContent } from "../components/CenteredContent/CenteredContent";
import { DeleteConfirmationWidget } from "../components/DeleteConfirmationWidget/DeleteConfirmationWidget";

const SECTION_TITLE = "Delete Confirmation";

export function DeleteConfirmation() {
	return (
		<>
			<title>{SECTION_TITLE}</title>
			<CenteredContent>
				<DeleteConfirmationWidget />
			</CenteredContent>
		</>
	);
}
