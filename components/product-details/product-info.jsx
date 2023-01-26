import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useCart } from "react-use-cart";
import AppContext from "../../store/AppContext";

function ProductInfo() {
	const router = useRouter();
	const productId = router.query.productId;
	const {
		toast: { showToast },
	} = useContext(AppContext);
	const { addItem, inCart, removeItem } = useCart();
	const [info, setInfo] = useState({
		available: false,
		long_summary: "",
		short_summary: "",
		name: "",
		_categoriesIds: [],
		price: null,
	});
	const [categories, setCategories] = useState([]);
	const [isUpdating, setIsUpdating] = useState(false);

	useEffect(() => {
		async function loadData() {
			if (!productId) return;
			try {
				const response = await axios(
					`/api/product/${productId}/get-info`
				);

				// console.log(productId);

				if (response.data.ok) {
					console.log(response.data);
					setInfo(response.data.product);
					setCategories(response.data.categories);
					// setProductImages(response.data.images);
					// setIsLoadingImages(false);
				}
			} catch (error) {
				let errorMsg = "";

				if (error?.response) {
					errorMsg = error.response.data.msg;
				} else {
					errorMsg = error.message;
				}

				showToast({
					alert_type: "danger",
					message: errorMsg,
				});
			}
		}

		loadData();
	}, [productId]);
	return (
		<div className="space-y-5">
			<div className="flex flex-wrap gap-10 items-center">
				<h2 className="text-xl">{info.name}</h2>
				<span className="text-4xl text-white">
					&#8358;{Intl.NumberFormat("en-US").format(info.price)}
				</span>
			</div>
			<p>{info.short_summary}</p>
			<div className="flex gap-4">
				<div className="badge badge-info gap-2 py-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
						className="w-4 h-4"
					>
						<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
					</svg>
					4.5
				</div>
				<div className="badge badge-info gap-2 py-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
						className="w-4 h-4"
					>
						<circle
							cx={12}
							cy={12}
							r={10}
						/>
						<polyline points="12 6 12 12 16 14" />
					</svg>
					30 - 40 min
				</div>
			</div>
			<button
				className={`btn ${inCart(productId) ? "glass" : "btn-primary"}`}
				onClick={
					inCart(productId) === true
						? () => removeItem(productId)
						: () =>
								addItem({
									name: info.name,
									id: productId,
									price: info.price,
								})
				}
			>
				{inCart(productId) ? "Remove from Cart" : "Add to cart"}
			</button>
			<div className="shadow-2xl rounded-md px-10 py-10">
				<h2 className="font-bold">Details</h2>
				<pre>{info.long_summary}</pre>
			</div>
		</div>
	);
}

export default ProductInfo;
