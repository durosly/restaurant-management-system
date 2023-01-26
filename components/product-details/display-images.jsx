import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import AppContext from "../../store/AppContext";

function DisplayImages() {
	const router = useRouter();
	const productId = router.query.productId;

	const [productImages, setProductImages] = useState([]);
	const [isLoadingImages, setIsLoadingImages] = useState(true);
	const [mainDisplay, setMainDisplay] = useState("placeholder-temp.gif");
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
					setMainDisplay(response.data.images[0]);
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
	return (
		<>
			<div className="relative max-w-lg h-80 mx-auto rounded-md overflow-hidden shadow-xl">
				{productImages && productImages.length > 0 ? (
					<Image
						className="object-cover"
						fill
						src={`/products/${mainDisplay}`}
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
							onClick={() => setMainDisplay(img)}
							className="relative cursor-pointer w-20 h-20 rounded-full overflow-hidden flex-shrink-0"
						>
							<Image
								className="object-cover"
								fill
								src={`/products/${img}`}
								sizes="30vw"
								alt=""
							/>
						</div>
					))
				) : (
					<div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
						<Image
							className="object-cover"
							fill
							src={"/images/placeholder-temp.gif"}
						/>
					</div>
				)}
			</div>
		</>
	);
}

export default DisplayImages;
