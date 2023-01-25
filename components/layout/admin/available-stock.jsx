import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import AppContext from "../../../store/AppContext";

function AvailableStock() {
	const router = useRouter();
	const productId = router.query.id;
	const [itemCount, setItemCount] = useState(0);
	const {
		toast: { showToast },
	} = useContext(AppContext);
	const [isUpdating, setIsUpdating] = useState(false);

	async function updateInfo(e) {
		e.preventDefault();
		if (isUpdating) return;
		setIsUpdating(true);
		try {
			const response = await axios.put(
				`/api/product/${productId}/update-info`,
				{ number_of_item: itemCount }
			);
			// console.log(response.data);

			if (response.data.ok) {
				showToast({
					alert_type: "success",
					message: response.data.msg,
				});
				setIsUpdating(false);
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
			setIsUpdating(false);
		}
	}

	useEffect(() => {
		async function loadData() {
			if (!productId) return;
			try {
				const response = await axios(
					`/api/product/${productId}/get-info`
				);

				// console.log(productId);

				if (response.data.ok) {
					// console.log(response.data);
					setItemCount(response.data.product.number_of_item);
					// setCategories(response.data.categories);
					// // setProductImages(response.data.images);
					// // setIsLoadingImages(false);
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
		<form
			onSubmit={updateInfo}
			action="/update-info"
		>
			<div className="form-control w-full max-w-xs">
				<label className="label">
					<span className="label-text">Number of available item</span>
				</label>
				<input
					type="number"
					placeholder="Type here"
					className="input input-bordered w-full max-w-xs"
					value={itemCount}
					onChange={(e) => setItemCount(e.target.valueAsNumber)}
				/>
			</div>
			<button
				disabled={isUpdating}
				className={`btn btn-primary mt-5 ${
					isUpdating && "animate-pulse"
				}`}
			>
				{isUpdating ? "Updating..." : "Update Count"}
			</button>
		</form>
	);
}

export default AvailableStock;
