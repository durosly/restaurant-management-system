import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AppContext from "../../store/AppContext";

function TodayOrderItems({ o, p }) {
	const {
		toast: { showToast },
	} = useContext(AppContext);
	const [isLoading, setIsLoading] = useState(false);
	const [img, setImg] = useState("temp.gif");
	const [reviewComplete, setReviewComplete] = useState(false);
	const [info, setInfo] = useState({
		available: false,
		long_summary: "",
		short_summary: "",
		name: "",
		_categoriesIds: [],
		price: null,
	});

	const [rating, setRating] = useState({ rate: 1, remark: "" });

	console.log(o);

	async function makeReview(e) {
		e.preventDefault();
		if (isLoading) return;
		setIsLoading(true);
		try {
			const response = await axios.post(
				`/api/review/order/${o._id}/product/${p._productId}`,
				rating
			);

			// console.log(productId);

			if (response.data.ok) {
				setReviewComplete(true);
				setIsLoading(false);
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
			setIsLoading(false);
		}
	}

	useEffect(() => {
		async function loadImage() {
			// if (!productId) return;
			try {
				const response = await axios(
					`/api/product/${p._productId}/get-images`
				);

				// console.log(productId);

				if (response.data.ok) {
					// console.log(response.data.images[0]);
					setImg(response.data.images[0]);
					// setCategories(response.data.categories);
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
		async function loadData() {
			// if (!productId) return;
			try {
				const response = await axios(
					`/api/product/${p._productId}/get-info`
				);

				// console.log(productId);

				if (response.data.ok) {
					setInfo(response.data.product);
					// console.log(response.data.images[0]);
					// setImg(response.data.images[0]);
					// setCategories(response.data.categories);
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
		loadImage();
	}, []);
	return (
		<li key={o._id}>
			<div className="card lg:card-side bg-info-content shadow-xl  px-4">
				<figure>
					<img
						className="w-[100px] h-[100px]"
						src={`/products/${img}`}
						alt="Album"
					/>
				</figure>
				<div className="card-body">
					<h2 className="card-title">
						{info.name} -{" "}
						<span className="font-bold">
							&#8358;
							{Intl.NumberFormat("en-US").format(info.price)}
						</span>
					</h2>
					<p>10/12/2020</p>
					<div className="card-actions justify-end">
						<span
							className={`badge ${
								o.status === "successful"
									? "badge-success"
									: o.status === "delivering"
									? "badge-primary"
									: ""
							} ${
								o.status !== "successful" && "animate-pulse"
							}  p-3`}
						>
							{o.status}
						</span>
						{o.status === "successful" &&
							!p.hasReview &&
							!reviewComplete && (
								<div className="review">
									{/* The button to open modal */}
									<label
										htmlFor="my-modal-4"
										className="btn btn-sm rounded-full animate-bounce"
									>
										Review
									</label>

									{/* Put this part before </body> tag */}
									<input
										type="checkbox"
										id="my-modal-4"
										className="modal-toggle"
									/>
									<label
										htmlFor="my-modal-4"
										className="modal cursor-pointer"
									>
										<label
											className="modal-box relative"
											htmlFor=""
										>
											<h3 className="text-lg font-bold">
												Review {info.name}
											</h3>
											<form
												onSubmit={makeReview}
												className="space-y-4 py-4"
											>
												<div className="rating">
													<input
														type="radio"
														name="rating-1"
														className="mask mask-star"
														checked={
															rating.rate === 1
														}
														onChange={() =>
															setRating({
																...rating,
																rate: 1,
															})
														}
													/>
													<input
														type="radio"
														name="rating-1"
														className="mask mask-star"
														checked={
															rating.rate === 2
														}
														onChange={() =>
															setRating({
																...rating,
																rate: 2,
															})
														}
													/>
													<input
														type="radio"
														name="rating-1"
														className="mask mask-star"
														checked={
															rating.rate === 3
														}
														onChange={() =>
															setRating({
																...rating,
																rate: 3,
															})
														}
													/>
													<input
														type="radio"
														name="rating-1"
														className="mask mask-star"
														checked={
															rating.rate === 4
														}
														onChange={() =>
															setRating({
																...rating,
																rate: 4,
															})
														}
													/>
													<input
														type="radio"
														name="rating-1"
														className="mask mask-star"
														checked={
															rating.rate === 5
														}
														onChange={() =>
															setRating({
																...rating,
																rate: 5,
															})
														}
													/>
												</div>
												<p>
													Remark:{" "}
													{rating.rate === 5 ? (
														<span className="text-success">
															Excellent
														</span>
													) : rating.rate === 4 ? (
														<span className="text-warning">
															Very Good
														</span>
													) : rating.rate === 3 ? (
														<span className="text-warning">
															Good
														</span>
													) : rating.rate === 2 ? (
														<span className="text-error">
															Ok
														</span>
													) : (
														<span className="text-error">
															Fair
														</span>
													)}
												</p>
												<div className="form-control">
													<textarea
														className="textarea textarea-bordered"
														placeholder="Remark"
														value={rating.remark}
														onChange={(e) =>
															setRating({
																...rating,
																remark: e.target
																	.value,
															})
														}
													/>
												</div>
												<button className="btn btn-sm btn-primary">
													Submit
												</button>
											</form>
										</label>
									</label>
								</div>
							)}
					</div>
				</div>
			</div>
		</li>
	);
}

export default TodayOrderItems;
