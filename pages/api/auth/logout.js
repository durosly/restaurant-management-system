import { withSessionRoute } from "../../../lib/withSession";

export default withSessionRoute(logoutRoute);

function logoutRoute(req, res, session) {
	req.session.destroy();
	res.send({ ok: true });
}
