import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AppContext from "../../store/AppContext";

function TodayOrderItems({ o, p }) {
	const {
		toast: { showToast },
	} = useContext(AppContext);
	// const [isLoading, setIsLoading] = useState(false);
	const [img, setImg] = useState("temp.gif");
	const [info, setInfo] = useState({
		available: false,
		long_summary: "",
		short_summary: "",
		name: "",
		_categoriesIds: [],
		price: null,
	});

	console.log(o);

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
					</div>
				</div>
			</div>
		</li>
	);
}

export default TodayOrderItems;
