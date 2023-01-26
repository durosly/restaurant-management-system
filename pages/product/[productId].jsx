import Image from "next/image";
import UserWrapper from "../../components/layout/userWrapper";
import DisplayImages from "../../components/product-details/display-images";
import { withSessionSsr } from "../../lib/withSession";

function ProductDetails({ user }) {
	return (
		<UserWrapper user={user}>
			<div className="container mx-auto px-5 my-10">
				<DisplayImages />
				<div className="divider">Details</div>
				<div className="space-y-5">
					<div className="flex flex-wrap gap-10 items-center">
						<h2 className="text-xl">Chicken Vege</h2>
						<span className="text-4xl text-white">
							&#8358;3,000.00
						</span>
					</div>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Adipisci, necessitatibus?
					</p>
					<div className="flex gap-4">
						<div className="badge badge-info gap-2 py-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
								className="w-4 h-4"
							>
								<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
							</svg>
							4.5
						</div>
						<div className="badge badge-info gap-2 py-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
								className="w-4 h-4"
							>
								<circle
									cx={12}
									cy={12}
									r={10}
								/>
								<polyline points="12 6 12 12 16 14" />
							</svg>
							30 - 40 min
						</div>
					</div>
					<button className="btn btn-primary">Add to cart</button>
					<div className="shadow-2xl rounded-md px-5 py-2">
						<h2>Details</h2>
						<pre>- nice - fresh - grow</pre>
					</div>
				</div>
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
