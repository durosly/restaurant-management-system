// import Image from "next/image";
import UserWrapper from "../../components/layout/userWrapper";
import DisplayImages from "../../components/product-details/display-images";
import ProductInfo from "../../components/product-details/product-info";
import { withSessionSsr } from "../../lib/withSession";

function ProductDetails({ user }) {
	return (
		<UserWrapper user={user}>
			<div className="container mx-auto px-5 my-10">
				<DisplayImages />
				<div className="divider">Details</div>
				<ProductInfo />
				<div className="divider">Reviews</div>
				<div>
					<div className="chat chat-start">
						<div className="chat-image avatar">
							<div className="w-10 rounded-full">
								<img src="https://placeimg.com/192/192/people" />
							</div>
						</div>
						<div className="chat-header">
							Obi-Wan Kenobi
							<time className="text-xs opacity-50">12:45</time>
						</div>
						<div className="chat-bubble">
							You were the Chosen One!
						</div>
						<div className="chat-footer opacity-50">Delivered</div>
					</div>
					<div className="chat chat-end">
						<div className="chat-image avatar">
							<div className="w-10 rounded-full">
								<img src="https://placeimg.com/192/192/people" />
							</div>
						</div>
						<div className="chat-header">
							Anakin
							<time className="text-xs opacity-50">12:46</time>
						</div>
						<div className="chat-bubble">I hate you!</div>
						<div className="chat-footer opacity-50">
							Seen at 12:46
						</div>
					</div>
				</div>
			</div>
		</UserWrapper>
	);
}

export default ProductDetails;

export const getServerSideProps = withSessionSsr(
	async function getServerSideProps({ req }) {
		// const user = req.session.user;

		// console.log(user, "user");

		// if (!user) {
		// 	return {
		// 		redirect: {
		// 			destination: "/login",
		// 			permanent: false,
		// 		},
		// 	};
		// }

		// const categories = await CategoryModel.find({});

		return {
			props: {
				user: req?.session?.user || null,
				// categories: JSON.parse(JSON.stringify(categories)),
			},
		};
	}
);
