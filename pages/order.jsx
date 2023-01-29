import { DateTime } from "luxon";
import TodayOrderItems from "../components/order/today-order-items";
import UserWrapper from "../components/layout/userWrapper";
import { withSessionSsr } from "../lib/withSession";
import OrderModel from "../models/order";

function Order({ user, orders }) {
	return (
		<UserWrapper user={user}>
			<div className="container mx-auto px-2">
				<h2 className="text-2xl text-center">Orders</h2>
				<ul className="list-none my-5 space-y-4 max-w-lg mx-auto">
					{orders &&
						orders.length > 0 &&
						orders.map((o) => (
							<>
								<div className="divider">
									{DateTime.fromISO(
										o.created_at
									).toRelative()}
								</div>
								{o.products.map((p) => (
									<TodayOrderItems
										key={`${p.id}-${o._id}`}
										o={o}
										p={p}
									/>
								))}
							</>
						))}
				</ul>
			</div>
		</UserWrapper>
	);
}

export default Order;

export const getServerSideProps = withSessionSsr(
	async function getServerSideProps({ req }) {
		const user = req.session.user;

		const today = new Date();
		const date = `${today.getFullYear()}-${
			today.getMonth() + 1
		}-${today.getDate()}`;
		const orders = await OrderModel.find({
			created_at: { $gte: date },
		}).sort({ created_at: 1 });

		console.log(orders);

		// const categories = await CategoryModel.find({});

		return {
			props: {
				user: user || null,
				orders: JSON.parse(JSON.stringify(orders)),
			},
		};
	}
);
