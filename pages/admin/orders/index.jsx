import { useState, useEffect, useContext, useRef } from "react";
import { DateTime } from "luxon";
import Link from "next/link";
import axios from "axios";
import AdminWrapper from "../../../components/layout/admin/layout/adminWrapper";
import { withSessionSsr } from "../../../lib/withSession";
import UserModel from "../../../models/user";
import OrderModel from "../../../models/order";
import AppContext from "../../../store/AppContext";

function Orders({ order }) {
	const {
		toast: { showToast },
	} = useContext(AppContext);
	const [orderData, setOrderData] = useState(order);
	const [query, setQuery] = useState("");
	const [isQuerying, setIsQuerying] = useState(false);
	const cancelToken = useRef(axios.CancelToken.source());

	useEffect(() => {
		async function loadOrders() {
			if (query.trim().length < 1) {
				setOrderData(order);
				return;
			}

			try {
				setIsQuerying(true);
				const response = await axios(`/api/order/${query}/get-by-code`);

				if (response.data.ok) {
					setOrderData(response.data.order);
					setIsQuerying(false);
				} else {
					throw new Error(response.data.msg);
				}
			} catch (error) {
				setOrderData([]);
				setIsQuerying(false);
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

		loadOrders();

		return () => {
			cancelToken.current.cancel();
		};
	}, [query]);

	return (
		<AdminWrapper>
			<form action="/search-order">
				<input
					type="search"
					name="search"
					id="search"
					className="input input-bordered w-full max-w-xs"
					placeholder="Search orders using code..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				{isQuerying && (
					<div
						className="radial-progress w-8 h-8 ml-4 animate-spin"
						style={{ "--value": 70 }}
					></div>
				)}
			</form>
			<div className="overflow-x-auto">
				<table className="table w-full">
					<thead>
						<tr>
							<th></th>
							<th>User</th>
							<th>Item count</th>
							<th>Status</th>
							<th>Date/Time</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orderData &&
							orderData.length > 0 &&
							orderData.map((o, i) => (
								<tr key={o.id}>
									<th>{i + 1}</th>
									<td>{o.user}</td>
									<td>{o.number_of_item}</td>
									<td>
										<span className="badge">
											{o.status}
										</span>
									</td>
									<td>
										{DateTime.fromISO(
											o.datetime
										).toRelative()}
									</td>
									<td>
										<Link
											href={`/admin/orders/${o.id}`}
											className="btn btn-sm btn-primary relative"
										>
											view order{" "}
											{o.seen === false && (
												<span className="w-2 h-2 ml-2 rounded-full bg-success absolute top-1 right-1"></span>
											)}
										</Link>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</AdminWrapper>
	);
}

export default Orders;

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

	const orderDB = await OrderModel.find({}).sort({
		created_at: -1,
	});

	const order = [];

	for (const item of orderDB) {
		const user = await UserModel.findById(item._userId);

		order.push({
			id: item.id,
			user: `${user.firstname} ${user.lastname}`,
			status: item.status,
			datetime: item.created_at,
			number_of_item: item.products.length,
			seen: item.seen,
		});
	}

	return {
		props: {
			order: JSON.parse(JSON.stringify(order)),
		},
	};
}
