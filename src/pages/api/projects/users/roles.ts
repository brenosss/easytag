import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerAuthSession } from "src/server/common/get-server-auth-session";

import { changeUserInProjectRole, canUserEditRole } from "src/domain/projects/users/users-in-projects";

async function patch(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  changeUserInProjectRole(req.body.userInProjectId, req.body.role);
  res.status(200).json({ message: "Page updated" });
}

const roles = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (!session || !session.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const canEdit = await canUserEditRole(session.user.id, req.body.userInProjectId)
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