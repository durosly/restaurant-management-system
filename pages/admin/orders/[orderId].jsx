import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { withSessionSsr } from "../../../lib/withSession";
import AppContext from "../../../store/AppContext";
import AdminWrapper from "../../../components/layout/admin/layout/adminWrapper";

function OrderDetails() {
	const router = useRouter();
	const orderId = router.query.orderId;
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState({});
	const [customer, setCustomer] = useState({});
	const [status, setStatus] = useState("pending");
	const [isUpdating, setIsUpdating] = useState(false);
	const {
		toast: { showToast },
	} = useContext(AppContext);

	async function updateStatus(e) {
		e.preventDefault();

		if (isUpdating) return;
		// console.log("...fired...");

		setIsUpdating(true);
		try {
			const response = await axios.put(
				`/api/order/${orderId}/update-status`,
				{ status }
			);

			// console.log(productId);

			if (response.data.ok) {
				// console.log(response.data);
				showToast({
					alert_type: "success",
					message: "Status updated",
				});
				setIsUpdating(false);
			} else {
				throw new Error(response.data.msg);
			}
		} catch (error) {
			setIsUpdating(false);
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

	useEffect(() => {
		async function loadData() {
			if (!orderId) return;
			try {
				const response = await axios(`/api/order/get/${orderId}`);

				// console.log(productId);

				if (response.data.ok) {
					// console.log(response.data);
					setData(response.data.order);
					setCustomer(response.data.customer);
					setStatus(response.data.order.status);
					setIsLoading(false);
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

				showToast({
					alert_type: "danger",
					message: errorMsg,
				});
			}
		}

		loadData();
	}, [orderId]);

	return (
		<AdminWrapper>
			<h2 className="text-4xl">Order Details</h2>
			<div className="space-y-4">
				{isLoading ? (
					<p className="bg-primary mx-auto max-w-[100px] p-1 rounded-full animate-ping">
						Loading...
					</p>
				) : (
					<>
						<p>
							User:{" "}
							<span className="font-bold">
								{customer.firstname} {customer.lastname}
							</span>
						</p>
						<p>
							Date:{" "}
							<span className="font-bold">10/12/2023 4:00pm</span>
						</p>
						<div className="space-y-2">
							<h3>Products</h3>
							<ul className="list-disc list-inside">
								{data &&
									data.products &&
									data.products.length > 0 &&
									data.products.map((p) => (
										<li key={p._id}>
											{p.name}({p.price}) x{p.quantity} -
											&#8358;
											{Intl.NumberFormat("en-US").format(
												p.price * p.quantity
											)}
										</li>
									))}
							</ul>
							<p>
								Total:{" "}
								<span className="font-bold">
									&#8358;
									{Intl.NumberFormat("en-US").format(
										data.totalPrice
									)}
								</span>
							</p>
						</div>
						<div className="divider">Information</div>
						<p>
							Method of payment:{" "}
							<span className="font-bold">
								{data.method_of_payment === "pay-now"
									? "Paid with gateway"
									: "Pay on delivery"}
							</span>
						</p>
						<p>
							Method of Delivery:{" "}
							<span className="font-bold">
								{data.method_of_delivery === "home"
									? "Home delivery"
									: data.method_of_delivery === "pickup"
									? "Shop Pickup"
									: "Reservation"}
							</span>
						</p>
						<p>
							Address:{" "}
							<span className="font-bold">{data.address}</span>
						</p>
						<div className="divider">Update Order Status</div>
						<form
							onSubmit={updateStatus}
							action="/order-status"
						>
							<div className="form-control w-full max-w-xs">
								<label className="label">Status</label>
								<select
									value={status}
									onChange={(e) => setStatus(e.target.value)}
									className="select select-bordered"
								>
									<option
										disabled
										value="pending"
									>
										Pending
									</option>
									<option
										disabled={
											status === "successful" ||
											status === "delivering" ||
											status === "preparing"
										}
										value="preparing"
									>
										Preparing
									</option>
									<option
										disabled={
											status === "successful" ||
											status === "delivering"
										}
										value="delivering"
									>
										Delivering
									</option>
									<option
										disabled={status === "successful"}
										value="successful"
									>
										Successful
									</option>
								</select>
							</div>
							<button
								disabled={isUpdating || status === "successful"}
								className={`btn btn-primary mt-4 disabled:cursor-not-allowed ${
									isUpdating && "animate-pulse"
								}`}
							>
								{isUpdating ? "Loading..." : "Update"}
							</button>
						</form>
					</>
				)}
			</div>
		</AdminWrapper>
	);
}

export default OrderDetails;

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
