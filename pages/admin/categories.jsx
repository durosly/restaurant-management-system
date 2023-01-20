import { useState, useContext } from "react";
import axios from "axios";
import AppContext from "../../store/AppContext";
import AdminWrapper from "../../components/layout/admin/layout/adminWrapper";
import { withSessionSsr } from "../../lib/withSession";
import CategoryModel from "../../models/category";

function Categories({ categoriesData }) {
	const {
		toast: { showToast },
	} = useContext(AppContext);
	const [newCategory, setNewCategory] = useState("");

	const [isDeleting, setIsDeleting] = useState(false);
	const [deletingId, setDeletingId] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [categories, setCategories] = useState(categoriesData);

	async function addCategory(e) {
		e.preventDefault();

		if (isLoading) return;

		setIsLoading(true);
		try {
			const response = await axios.post("/api/category/create", {
				category: newCategory,
			});

			// console.log(response);
			if (response.data.ok) {
				setNewCategory("");
				const { name, _id } = response.data.category;
				setCategories([
					{ name, id: _id, numberOfFood: 0 },
					...categories,
				]);
				showToast({
					alert_type: "success",
					message: "Category added successfully",
				});
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
			console.log(error);
			setIsLoading(false);
			showToast({
				alert_type: "danger",
				message: errorMsg,
			});
		}
	}

	async function deleteCategory({ id }) {
		if (isLoading) return;

		setDeletingId(id);

		setIsDeleting(true);
		try {
			const response = await axios.delete(`/api/category/delete/${id}`);

			// console.log(response);
			if (response.data.ok) {
				setNewCategory("");
				const newItems = categories.filter((item) => item.id !== id);
				setCategories(newItems);
				showToast({
					alert_type: "success",
					message: "Category added successfully",
				});
				setIsDeleting(false);
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
			// console.log(error);
			setIsDeleting(false);
			showToast({
				alert_type: "danger",
				message: errorMsg,
			});
		}
	}

	return (
		<AdminWrapper>
			<div className="container px-5 space-y-5 mb-10">
				<div className="text-sm breadcrumbs">
					<ul>
						<li>
							<a>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									className="w-4 h-4 mr-2 stroke-current"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
									></path>
								</svg>
								Home
							</a>
						</li>
						<li>
							<a>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									className="w-4 h-4 mr-2 stroke-current"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
									></path>
								</svg>
								Documents
							</a>
						</li>
						<li>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								className="w-4 h-4 mr-2 stroke-current"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								></path>
							</svg>
							Add Document
						</li>
					</ul>
				</div>
				<form
					onSubmit={addCategory}
					action="/admin/categories/add"
					className="bg-slate-700 px-5 py-5 mx-auto rounded-lg"
				>
					<h2 className="mb-4">Add new category</h2>
					<div className="flex gap-x-4">
						<input
							type="text"
							placeholder="Type here"
							className="input w-full max-w-xs"
							value={newCategory}
							onChange={(e) => setNewCategory(e.target.value)}
						/>
						<button
							disabled={isLoading}
							className={`btn btn-primary ${
								isLoading && "btn-disabled animate-pulse"
							}`}
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
								className="feather feather-plus"
							>
								<line
									x1={12}
									y1={5}
									x2={12}
									y2={19}
								/>
								<line
									x1={5}
									y1={12}
									x2={19}
									y2={12}
								/>
							</svg>
						</button>
					</div>
				</form>
				<div className="overflow-x-auto">
					<table className="table w-full">
						{/* <!-- head --> */}
						<thead>
							<tr>
								<th></th>
								<th>Name</th>
								<th>Number of Items</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{categories.map((item, i) => (
								<tr key={item.id}>
									<th>{i + 1}</th>
									<td>{item.name}</td>
									<td>
										<span className="badge badge-primary">
											{item.numberOfFood}
										</span>
									</td>
									<td>
										<button
											disabled={isDeleting}
											onClick={() =>
												deleteCategory({ id: item.id })
											}
											className={`btn btn-sm btn-error ${
												deletingId === item.id &&
												isDeleting &&
												"btn-disabled"
											}`}
										>
											{deletingId === item.id &&
											isDeleting ? (
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
													className="w-h h-4 animate-spin"
												>
													<polyline points="23 4 23 10 17 10" />
													<path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
												</svg>
											) : (
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
													className="h-4 w-4"
													// className="feather feather-trash-2"
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
											)}
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</AdminWrapper>
	);
}

export default Categories;

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

	const categoriesDB = await CategoryModel.find({});

	const categories = categoriesDB.map((category) => ({
		id: category.id,
		name: category.name,
		numberOfFood: 0,
	}));

	return {
		props: {
			categoriesData: categories,
		},
	};
}
