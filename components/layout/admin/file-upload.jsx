import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import AppContext from "../../../store/AppContext";

function FileUpload() {
	const router = useRouter();
	const productId = router.query.id;
	const {
		toast: { showToast },
	} = useContext(AppContext);
	const [uploadedImg, setUploadedImg] = useState(null);
	const [uploadingImg, setUploadingImg] = useState(false);
	const [imgUploadingProgress, setImgUploadingProgress] = useState(0);
	const [productImages, setProductImages] = useState([]);
	const [isLoadingImages, setIsLoadingImages] = useState(true);
	const [isDeletingImage, setIsDeletingImage] = useState(false);
	// console.log(router);

	useEffect(() => {
		async function loadImages() {
			if (!productId) return;
			try {
				const response = await axios(
					`/api/product/${productId}/get-images`
				);

				// console.log(productId);

				if (response.data.ok) {
					// console.log(response.data);
					setProductImages(response.data.images);
					setIsLoadingImages(false);
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

		loadImages();
	}, [productId]);

	async function deleteImage({ img }) {
		if (isDeletingImage) return;
		setIsDeletingImage(true);
		try {
			const response = await axios.delete(
				`/api/product/${productId}/delete-images`,
				{
					data: img,
				}
			);
			// console.log(response);
			setIsDeletingImage(false);

			if (response.data.ok) {
				const newProductImages = productImages.filter((i) => i !== img);
				setProductImages(newProductImages);
				showToast({
					alert_type: "success",
					message: "Image removed successfully",
				});
			} else {
				throw new Error(response.data.msg);
			}
		} catch (error) {
			let errorMsg = "";

			if (error?.response) {
				errorMsg = error.response.data.msg;
			} else {
				errorMsg = error.message;
			}

			setIsDeletingImage(false);

			showToast({
				alert_type: "danger",
				message: errorMsg,
			});
		}
	}

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
				formData,
				{
					onUploadProgress: (progressEvent) => {
						const progress = parseInt(
							Math.round(
								(progressEvent.loaded * 100) /
									progressEvent.total
							)
						);
						// Update state here
						setImgUploadingProgress(progress);
					},
				}
			);

			// console.log(response);
			setUploadingImg(false);
			setUploadedImg(null);

			setProductImages([...productImages, ...response.data.files]);

			showToast({
				alert_type: "success",
				message: response.data.msg,
			});
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
		<>
			<div className="relative max-w-lg h-80 mx-auto rounded-md overflow-hidden">
				{productImages && productImages.length > 0 ? (
					<Image
						className="object-cover"
						fill
						src={`/products/${productImages[0]}`}
						sizes="80vw"
						alt=""
					/>
				) : (
					<Image
						className="object-cover"
						fill
						src={"/images/placeholder-temp.gif"}
						sizes="80vw"
						alt=""
					/>
				)}
			</div>
			<div className="flex mt-4 overflow-x-auto gap-x-4">
				{productImages && productImages.length > 0 ? (
					productImages.map((img) => (
						<div
							key={img}
							className="relative w-28 h-20 rounded-md overflow-hidden flex-shrink-0"
						>
							<Image
								className="object-cover"
								fill
								src={`/products/${img}`}
								sizes="30vw"
								alt=""
							/>
							<button
								onClick={() => deleteImage({ img })}
								className="absolute bottom-2 right-2"
							>
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
									className="feather feather-trash-2"
								>
									<polyline points="3 6 5 6 21 6" />
									<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
									<line
										x1={10}
										y1={11}
										x2={10}
										y2={17}
									/>
									<line
										x1={14}
										y1={11}
										x2={14}
										y2={17}
									/>
								</svg>
							</button>
						</div>
					))
				) : (
					<div className="relative w-28 h-20 rounded-md overflow-hidden flex-shrink-0">
						<Image
							className="object-cover"
							fill
							src={"/images/placeholder-temp.gif"}
						/>
					</div>
				)}
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
		</>
	);
}

export default FileUpload;
