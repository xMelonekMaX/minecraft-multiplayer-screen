/// <reference types="vite/client" />

type TextComponentExtra = { text: string };

type RawMotd = { extra: (string | TextComponentExtra)[] };

type ServerResponse = {
	ip: string;
	motd: { html: string; raw: RawMotd };
	players: { max: number; online: number };
	ping: number;
	version: { protocol: number; raw: string };
	icon: string;
	online: boolean;
	info: { html: string; raw: { name: string; id: string }[] };
};

type Server = {
	id: number;
	name: string;
	ipAddress: string;
	resourcePacksOption: number;
	lastServerIcon: string | undefined | null;
	response: ServerResponse | null;
};
