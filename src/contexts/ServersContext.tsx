import { createContext, useContext } from "react";

type ServersContextType = [
	Server[],
	React.Dispatch<React.SetStateAction<Server[]>>
];

export const ServersContext = createContext<ServersContextType | undefined>(
	undefined
);

export const useServers = () => {
	const context = useContext(ServersContext);
	if (context === undefined) {
		throw new Error("ServersContext nie istnieje");
	}
	return context;
};
