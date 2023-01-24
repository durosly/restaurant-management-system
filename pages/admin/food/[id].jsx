import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import AppContext from "../../../store/AppContext";
import AdminWrapper from "../../../components/layout/admin/layout/adminWrapper";

function FoodDetails() {
	const router = useRouter();
	const productId = router.query.id;
	const {
		toast: { showToast },
	} = useContext(AppContext);
	const [uploadedImg, setUploadedImg] = useState(null);
	const [uploadingImg, setUploadingImg] = useState(false);
	const [imgUploadingProgress, setImgUploadingProgress] = useState(0);
	// console.log(router);

	async function handlerFileUpload(e) {
		e.preventDefault();

		if (uploadingImg) return;

		setUploadingImg(true);

		try {
			if (!uploadedImg) throw new Error("Select a file to upload");

			const formData = new FormData();

			// uploadedImg.forEach((file) => console.log(file));

			for (let i = 0; i < uploadedImg.length; i++) {
				// console.log(uploadedImg[i]);
				// console.log("nice");
				formData.append(`img_${i}`, uploadedImg[i]);
			}

			const response = await axios.post(
				`/api/product/${productId}/upload`,
				formData
			);

			console.log(response);
			setUploadingImg(false);
		} catch (error) {
			let errorMsg = "";

			if (error?.response) {
				errorMsg = error.response.data.msg;
			} else {
				errorMsg = error.message;
			}
			// console.log(error);
			setUploadingImg(false);
			showToast({
				alert_type: "danger",
				message: errorMsg,
			});
		}
	}
	return (
		<AdminWrapper>
			<div className="container space-y-5">
				<div className="relative max-w-lg h-80 mx-auto rounded-md overflow-hidden">
					<Image
						className="object-cover"
						fill
						src={"/images/placeholder-temp.gif"}
					/>
				</div>
				<div className="flex mt-4 overflow-x-auto gap-x-4">
					<div className="relative w-28 h-20 rounded-md overflow-hidden flex-shrink-0">
						<Image
							className="object-cover"
							fill
							src={"/images/placeholder-temp.gif"}
						/>
					</div>
					<div className="relative w-28 h-20 rounded-md overflow-hidden flex-shrink-0">
						<Image
							className="object-cover"
							fill
							src={"/images/placeholder-temp.gif"}
						/>
					</div>
					<div className="relative w-28 h-20 rounded-md overflow-hidden flex-shrink-0">
						<Image
							className="object-cover"
							fill
							src={"/images/placeholder-temp.gif"}
						/>
					</div>
					<div className="relative w-28 h-20 rounded-md overflow-hidden flex-shrink-0">
						<Image
							className="object-cover"
							fill
							src={"/images/placeholder-temp.gif"}
						/>
					</div>
					<div className="relative w-28 h-20 rounded-md overflow-hidden flex-shrink-0">
						<Image
							className="object-cover"
							fill
							src={"/images/placeholder-temp.gif"}
						/>
					</div>
					<div className="relative w-28 h-20 rounded-md overflow-hidden flex-shrink-0">
						<Image
							className="object-cover"
							fill
							src={"/images/placeholder-temp.gif"}
						/>
					</div>
					<div className="relative w-28 h-20 rounded-md overflow-hidden flex-shrink-0">
						<Image
							className="object-cover"
							fill
							src={"/images/placeholder-temp.gif"}
						/>
					</div>
					<div className="relative w-28 h-20 rounded-md overflow-hidden flex-shrink-0">
						<Image
							className="object-cover"
							fill
							src={"/images/placeholder-temp.gif"}
						/>
					</div>
				</div>
				<form
					onSubmit={handlerFileUpload}
					className="space-x-4 space-y-4 sm:space-y-0"
				>
					<input
						type="file"
						className="file-input file-input-bordered w-full max-w-xs"
						accept=".png, .gif, .jpg"
						// value={uploadedImg}
						onChange={(e) => setUploadedImg(e.target.files)}
						multiple
					/>
					<button
						disabled={uploadingImg}
						className="btn btn-primary space-x-2"
					>
						<span>Upload</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={24}
							height={24}
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
							strokeLinecap="round"
							strokeLinejoin="round"
							className="feather feather-upload"
						>
							<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
							<polyline points="17 8 12 3 7 8" />
							<line
								x1={12}
								y1={3}
								x2={12}
								y2={15}
							/>
						</svg>
					</button>
					{uploadingImg && (
						<div
							className="radial-progress"
							style={{ "--value": imgUploadingProgress }}
						>
							{imgUploadingProgress}%
						</div>
					)}
				</form>

				<div className="divider">Item Information</div>

				<form>
					<div className="form-control w-full max-w-xs">
						<label className="label">
							<span className="label-text">Name</span>
						</label>
						<input
							type="text"
							placeholder="Type here"
							className="input input-bordered w-full max-w-xs"
							disabled
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
						/>
					</div>
					<div className="form-control w-full max-w-xs">
						<label
							htmlFor=""
							className="label"
						>
							<span className="label-text">Available</span>
							<input
								type="checkbox"
								className="toggle toggle-success"
								// checked
							/>
						</label>
					</div>
					<div className="form-control flex-row gap-4 my-5 flex-wrap">
						<label
							// key={c.id}
							className="flex justify-center gap-2"
							htmlFor={``}
						>
							<span>Food</span>
							<input
								// id={`${c.name}-${c._id}`}
								type="checkbox"
								// checked={foodDetails.categories.includes(c._id)}
								className="checkbox"
								name="category"
								// onChange={() => toggleCategory({ id: c._id })}
							/>
						</label>
						<label
							// key={c.id}
							className="flex justify-center gap-2"
							htmlFor={``}
						>
							<span>Food</span>
							<input
								// id={`${c.name}-${c._id}`}
								type="checkbox"
								// checked={foodDetails.categories.includes(c._id)}
								className="checkbox"
								name="category"
								// onChange={() => toggleCategory({ id: c._id })}
							/>
						</label>
						<label
							// key={c.id}
							className="flex justify-center gap-2"
							htmlFor={``}
						>
							<span>Food</span>
							<input
								// id={`${c.name}-${c._id}`}
								type="checkbox"
								// checked={foodDetails.categories.includes(c._id)}
								className="checkbox"
								name="category"
								// onChange={() => toggleCategory({ id: c._id })}
							/>
						</label>
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
							// value={foodDetails.desc}
							// onChange={(e) =>
							// 	setFoodDetails({
							// 		...foodDetails,
							// 		[e.target.name]: e.target.value,
							// 	})
							// }
						/>
					</div>
					<button className="btn btn-primary mt-5">
						Update Item
					</button>
				</form>
				<div className="divider">Available Stock</div>
				<form>
					<div className="form-control w-full max-w-xs">
						<label className="label">
							<span className="label-text">
								Number of available item
							</span>
						</label>
						<input
							type="number"
							placeholder="Type here"
							className="input input-bordered w-full max-w-xs"
						/>
					</div>
					<button className="btn btn-primary mt-5">
						Update Count
					</button>
				</form>

				<div className="divider">Rating / Reviews</div>

				<div>
					<div>
						<span>Rating: </span>
						<span className="countdown">
							<span style={{ "--value": 52 }}></span>
						</span>
					</div>
					<div>
						<div>
							<div className="chat chat-start">
								<div className="chat-bubble chat-bubble-primary">
									What kind of nonsense is this
									<button className="btn btn-xs ml-2">
										<svg
											className="h-4 w-4"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 512 512"
										>
											{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
											<path d="M205 34.8c11.5 5.1 19 16.6 19 29.2v64H336c97.2 0 176 78.8 176 176c0 113.3-81.5 163.9-100.2 174.1c-2.5 1.4-5.3 1.9-8.1 1.9c-10.9 0-19.7-8.9-19.7-19.7c0-7.5 4.3-14.4 9.8-19.5c9.4-8.8 22.2-26.4 22.2-56.7c0-53-43-96-96-96H224v64c0 12.6-7.4 24.1-19 29.2s-25 3-34.4-5.4l-160-144C3.9 225.7 0 217.1 0 208s3.9-17.7 10.6-23.8l160-144c9.4-8.5 22.9-10.6 34.4-5.4z" />
										</svg>
									</button>
								</div>
							</div>
							<div className="chat chat-end">
								<div className="chat-bubble chat-bubble-secondary">
									Put me on the Council and not make me a
									Master!??
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</AdminWrapper>
	);
}

export default FoodDetails;
