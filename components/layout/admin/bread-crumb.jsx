import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function BreadCrumb() {
	const router = useRouter();
	const [paths, setPaths] = useState([]);

	useEffect(() => {
		console.log(router.pathname);
		const pathArr = router.pathname.split("/");
		pathArr.shift();

		setPaths(pathArr);
	}, [router.pathname]);

	return (
		<div className="text-sm breadcrumbs">
			<ul>
				{paths.map((path) => (
					<li key={path}>
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
							{path}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}

export default BreadCrumb;
