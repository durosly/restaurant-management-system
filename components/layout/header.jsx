import Link from "next/link";

function Header() {
	return (
		<div className="navbar bg-base-100">
			<div className="navbar-start">
				<div className="dropdown">
					<label
						tabIndex={0}
						className="btn btn-ghost lg:hidden"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</label>
					<ul
						tabIndex={0}
						className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<Link href="/menu">Menu</Link>
						</li>
						<li tabIndex={0}>
							<Link href="/about-us">About Us</Link>
						</li>
						<li>
							<Link href="/faq">FAQ</Link>
						</li>
					</ul>
				</div>
				<a className="btn btn-ghost normal-case text-xl">daisyUI</a>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1">
					<li>
						<Link href="/menu">Menu</Link>
					</li>
					<li tabIndex={0}>
						<Link href="/about-us">About Us</Link>
					</li>
					<li>
						<Link href="/faq">FAQ</Link>
					</li>
					<li>
						<Link
							href="/cart"
							className="indicator"
						>
							<span className="indicator-item indicator-middle badge badge-secondary">
								<span className="countdown">
									<span style={{ "--value": 6 }}></span>
								</span>
							</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 576 512"
								className="w-5 h-5"
							>
								{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
								<path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
							</svg>
							{/* <button className="">
							</button> */}
						</Link>
					</li>
				</ul>
			</div>
			<div className="navbar-end">
				<Link
					className="btn"
					href="/login"
				>
					Join Us
				</Link>
				{/* <a className="btn">Get started</a> */}
			</div>
		</div>
	);
}

export default Header;
