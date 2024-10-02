import React from "react";
import { createRoot } from "react-dom/client";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { PlayMultiplayer } from "./views/PlayMultiplayer.tsx";
import { DirectConnection } from "./views/DirectConnection.tsx";
import { EditServerInfo } from "./views/EditServerInfo.tsx";
import { App } from "./App.tsx";
import { DeleteConfirmation } from "./views/DeleteConfirmation.tsx";
import { preloadTextures } from "./utils/preloadTextures.ts";

preloadTextures();

const router = createBrowserRouter([
	{
		element: <App />,
		path: "/",
		errorElement: <Navigate to="/" />,
		children: [
			{
				element: <PlayMultiplayer />,
				path: "/:serverToAdd?",
			},
			{
				element: <DirectConnection />,
				path: "/direct-connection",
			},
			{
				element: <EditServerInfo />,
				path: "/edit-server-info/:serverIndex?",
			},
			{
				element: <DeleteConfirmation />,
				path: "/delete-confirmation/:serverIndex?",
			},
		],
	},
]);

createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
