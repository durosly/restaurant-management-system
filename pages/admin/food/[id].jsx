import AdminWrapper from "../../../components/layout/admin/layout/adminWrapper";
import FileUpload from "../../../components/layout/admin/file-upload";
import ProductInfo from "../../../components/layout/admin/product-info";
import AvailableStock from "../../../components/layout/admin/available-stock";
import { withSessionSsr } from "../../../lib/withSession";
import ProductRatingReview from "../../../components/layout/admin/product-rating-review";

function FoodDetails() {
	return (
		<AdminWrapper>
			<div className="container space-y-5">
				<FileUpload />
				<div className="divider">Item Information</div>

				<ProductInfo />
				<div className="divider">Available Stock</div>
				<AvailableStock />

				<div className="divider">Rating / Reviews</div>

				<ProductRatingReview />
			</div>
		</AdminWrapper>
	);
}

export default FoodDetails;

export const getServerSideProps = withSessionSsr(handler);

async function handler({ req }) {
	const user = req.session.user;

	if (!user || user.type !== "admin") {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}
