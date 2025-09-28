import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./Context/UserContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<UserContext>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</UserContext>
	</StrictMode>
);
