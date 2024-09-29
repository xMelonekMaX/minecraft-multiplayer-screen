import { createContext, useContext } from "react";

type ServerListScrollContextType = [
	number,
	React.Dispatch<React.SetStateAction<number>>
];

export const ServerListScrollContext = createContext<
	ServerListScrollContextType | undefined
>(undefined);

export const useServerListScroll = () => {
	const context = useContext(ServerListScrollContext);
	if (context === undefined) {
		throw new Error("ServerListScrollContext nie istnieje");
	}
	return context;
};
