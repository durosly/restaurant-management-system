import "../styles/globals.css";
import { CartProvider } from "react-use-cart";
import useToast from "../hook/useToast";
import AppContext from "../store/AppContext";
import Toast from "../components/layout/toast";

export default function App({ Component, pageProps }) {
	const toast = useToast();
	return (
		<AppContext.Provider value={{ toast }}>
			<CartProvider>
				<Component {...pageProps} />
				<Toast />
			</CartProvider>
		</AppContext.Provider>
	);
}
