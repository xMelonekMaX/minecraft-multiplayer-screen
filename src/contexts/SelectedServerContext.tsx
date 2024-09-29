import { createContext, useContext } from "react";

type SelectedServerContextType = [
	number | null,
	React.Dispatch<React.SetStateAction<number | null>>
];

export const SelectedServerContext = createContext<
	SelectedServerContextType | undefined
>(undefined);

export const useSelectedServer = () => {
	const context = useContext(SelectedServerContext);
	if (context === undefined) {
		throw new Error("SelectedServerContext nie istnieje");
	}
	return context;
};
