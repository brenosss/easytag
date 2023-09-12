import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerAuthSession } from "src/server/common/get-server-auth-session";

import { changeUserInProjectRole, canUserEditRole } from "src/domain/projects/users/users-in-projects";
import { getToken } from "next-auth/jwt";
import { env } from "src/env/server.mjs";


async function patch(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  changeUserInProjectRole(req.body.userInProjectId, req.body.role);
  res.status(200).json({ message: "Page updated" });
}

const roles = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret: env.NEXTAUTH_SECRET });
  if (!token || !token.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const canEdit = await canUserEditRole(token.userId, req.body.userInProjectId)
  if (!canEdit) {
    return res.status(403).json({ error: "Not authorized" });
  }
  try {
    if (req.method === "PATCH") await patch(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default roles