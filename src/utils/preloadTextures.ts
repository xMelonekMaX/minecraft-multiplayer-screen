// Importing button textures
import { preload } from "react-dom";

import smallButton from "../assets/textures/buttons/small_button.png";
import smallButtonHovered from "../assets/textures/buttons/small_button_hovered.png";
import smallButtonDisabled from "../assets/textures/buttons/small_button_disabled.png";

import normalButton from "../assets/textures/buttons/normal_button.png";
import normalButtonHovered from "../assets/textures/buttons/normal_button_hovered.png";
import normalButtonDisabled from "../assets/textures/buttons/normal_button_disabled.png";

import semiLargeButton from "../assets/textures/buttons/semi_large_button.png";
import semiLargeButtonHovered from "../assets/textures/buttons/semi_large_button_hovered.png";

import largeButton from "../assets/textures/buttons/large_button.png";
import largeButtonHovered from "../assets/textures/buttons/large_button_hovered.png";
import largeButtonDisabled from "../assets/textures/buttons/large_button_disabled.png";

import moveUp from "../assets/textures/server_icons/move_up.png";
import moveDown from "../assets/textures/server_icons/move_down.png";
import join from "../assets/textures/server_icons/join.png";

import moveUpHovered from "../assets/textures/server_icons/move_up_hovered.png";
import moveDownHovered from "../assets/textures/server_icons/move_down_hovered.png";
import joinHovered from "../assets/textures/server_icons/join_hovered.png";

import ping1 from "../assets/textures/ping_icons/ping_1.png";
import ping2 from "../assets/textures/ping_icons/ping_2.png";
import ping3 from "../assets/textures/ping_icons/ping_3.png";
import ping4 from "../assets/textures/ping_icons/ping_4.png";
import ping5 from "../assets/textures/ping_icons/ping_5.png";

import pinging1 from "../assets/textures/ping_icons/pinging_1.png";
import pinging2 from "../assets/textures/ping_icons/pinging_2.png";
import pinging3 from "../assets/textures/ping_icons/pinging_3.png";
import pinging4 from "../assets/textures/ping_icons/pinging_4.png";
import pinging5 from "../assets/textures/ping_icons/pinging_5.png";

import unreachable from "../assets/textures/ping_icons/unreachable.png";

import unknownServer from "../assets/textures/unknown_server.png";

export function preloadTextures() {
	preload(smallButton, { as: "image" });
	preload(smallButtonHovered, { as: "image" });
	preload(smallButtonDisabled, { as: "image" });

	preload(normalButton, { as: "image" });
	preload(normalButtonHovered, { as: "image" });
	preload(normalButtonDisabled, { as: "image" });

	preload(semiLargeButton, { as: "image" });
	preload(semiLargeButtonHovered, { as: "image" });

	preload(largeButton, { as: "image" });
	preload(largeButtonHovered, { as: "image" });
	preload(largeButtonDisabled, { as: "image" });

	preload(moveUp, { as: "image" });
	preload(moveDown, { as: "image" });
	preload(join, { as: "image" });

	preload(moveUpHovered, { as: "image" });
	preload(moveDownHovered, { as: "image" });
	preload(joinHovered, { as: "image" });

	preload(ping1, { as: "image" });
	preload(ping2, { as: "image" });
	preload(ping3, { as: "image" });
	preload(ping4, { as: "image" });
	preload(ping5, { as: "image" });

	preload(pinging1, { as: "image" });
	preload(pinging2, { as: "image" });
	preload(pinging3, { as: "image" });
	preload(pinging4, { as: "image" });
	preload(pinging5, { as: "image" });

	preload(unreachable, { as: "image" });

	preload(unknownServer, { as: "image" });
}
