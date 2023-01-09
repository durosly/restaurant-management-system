import Link from "next/link";

function AdminWrapper({ children }) {
	return (
		<div className="drawer drawer-mobile">
			<input
				id="my-drawer-2"
				type="checkbox"
				className="drawer-toggle"
			/>
			<div className="drawer-content">
				{/* <!-- Page content here --> */}
				{children}
				<label
					htmlFor="my-drawer-2"
					className="btn btn-primary drawer-button lg:hidden fixed bottom-5 left-5"
				>
					<svg
						className="w-5 h-5 fill-current"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 448 512"
					>
						{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
						<path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
					</svg>
				</label>
			</div>
			<div className="drawer-side">
				<label
					htmlFor="my-drawer-2"
					className="drawer-overlay"
				></label>
				<ul className="menu p-4 w-80 bg-base-300 text-base-content">
					{/* <!-- Sidebar content here --> */}
					<li>
						<Link href="/admin/dashboard">
							<svg
								className="h-5 w-5 fill-current"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512"
							>
								{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
								<path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z" />
							</svg>
							Dashboard
						</Link>
					</li>
					<li>
						<a>Sidebar Item 2</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default AdminWrapper;
