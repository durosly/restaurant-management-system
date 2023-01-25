import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import AppContext from "../../../store/AppContext";

function ProductInfo() {
	const router = useRouter();
	const productId = router.query.id;
	const {
		toast: { showToast },
	} = useContext(AppContext);
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

	function toggleCategory({ id }) {
		if (info._categoriesIds.includes(id)) {
			const newCategories = info._categoriesIds.filter((i) => i !== id);
			setInfo({ ...info, _categoriesIds: [...newCategories] });
		} else {
			setInfo({
				...info,
				_categoriesIds: [...info._categoriesIds, id],
			});
		}
	}

	async function updateInfo(e) {
		e.preventDefault();
		if (isUpdating) return;
		setIsUpdating(true);
		try {
			const response = await axios.put(
				`/api/product/${productId}/update-info`,
				info
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
		<form
			action="/update-info"
			onSubmit={updateInfo}
		>
			<div className="form-control w-full max-w-xs">
				<label className="label">
					<span className="label-text">Name</span>
				</label>
				<input
					type="text"
					placeholder="Type here"
					className="input input-bordered w-full max-w-xs"
					disabled
					value={info.name}
				/>
			</div>
			<div className="form-control w-full max-w-xs">
				<label className="label">
					<span className="label-text">
						Price per portion / item (&#8358;)
					</span>
				</label>
				<input
					type="number"
					placeholder="Type here"
					className="input input-bordered w-full max-w-xs"
					name="price"
					value={info.price}
					onChange={(e) =>
						setInfo({ ...info, [e.target.name]: e.target.value })
					}
				/>
			</div>
			<div className="form-control w-full max-w-xs">
				<label
					htmlFor="available"
					className="label"
				>
					<span className="label-text">Available</span>
					<input
						id="available"
						type="checkbox"
						className="toggle toggle-success"
						checked={info.available}
						onChange={() =>
							setInfo({ ...info, available: !info.available })
						}
					/>
				</label>
			</div>
			<div className="form-control flex-row gap-4 my-5 flex-wrap">
				{categories.map((c) => (
					<label
						key={c._id}
						className="flex justify-center gap-2"
						htmlFor={`${c.name}-${c._id}`}
					>
						<span>{c.name}</span>
						<input
							id={`${c.name}-${c._id}`}
							type="checkbox"
							checked={info._categoriesIds.includes(c._id)}
							className="checkbox"
							name="category"
							onChange={() => toggleCategory({ id: c._id })}
						/>
					</label>
				))}
			</div>
			<div className="form-control w-full max-w-xs">
				<label className="label">
					<span className="label-text">Short Summary</span>
				</label>
				<input
					type="text"
					placeholder="Type here"
					className="input input-bordered w-full max-w-xs"
					disabled
					value={info.short_summary}
				/>
			</div>
			<div className="form-control">
				<label className="label">
					<span className="label-text">Description</span>
				</label>
				<textarea
					className="textarea textarea-bordered h-24"
					placeholder="Bio"
					name="desc"
					disabled
					value={info.long_summary}
					// value={foodDetails.desc}
					// onChange={(e) =>
					// 	setFoodDetails({
					// 		...foodDetails,
					// 		[e.target.name]: e.target.value,
					// 	})
					// }
				/>
			</div>
			<button
				disabled={isUpdating}
				className={`btn btn-primary mt-5 ${
					isUpdating && "animate-pulse"
				}`}
			>
				{isUpdating ? "Updating..." : "Update Item"}
			</button>
		</form>
	);
}

export default ProductInfo;
