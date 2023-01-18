import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import useToast from "../hook/useToast";
import AppContext from "../store/AppContext";
import Toast from "../components/layout/toast";

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	const toast = useToast();
	return (
		<SessionProvider session={session}>
			<AppContext.Provider value={{ toast }}>
				<Component {...pageProps} />
				<Toast />
			</AppContext.Provider>
		</SessionProvider>
	);
}
