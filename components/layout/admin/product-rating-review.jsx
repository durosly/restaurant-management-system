import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import AppContext from "../../../store/AppContext";
import RemarkReply from "./remark-reply";

function ProductRatingReview() {
	const router = useRouter();
	const productId = router.query.id;
	const {
		toast: { showToast },
	} = useContext(AppContext);

	const [rating, setRating] = useState(4.5);
	const [reviews, setReviews] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function loadData() {
			if (!productId) return;
			try {
				const response = await axios(
					`/api/product/${productId}/get-rating-review`
				);

				// console.log(productId);

				if (response.data.ok) {
					console.log(response.data);
					setRating(response.data.rating);
					setReviews(response.data.reviews);
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

		loadData();
	}, [productId]);

	return (
		<div>
			{!isLoading && (
				<>
					<div>
						<span>Rating: </span>
						{rating}
					</div>
					<div>
						{reviews && reviews.length > 0 && (
							<div>
								{reviews.map((r) => (
									<RemarkReply
										key={r._id}
										r={r}
									/>
								))}
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
}

export default ProductRatingReview;
