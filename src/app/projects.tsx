import { cookies } from 'next/headers'
import { env } from "src/env/server.mjs";
import { getJWTSession } from "src/domain/JWT";

async function getProject() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(env.NEXTAUTH_COOKIE)
  if (!sessionCookie) throw new Error('No session cookie found')
  const session = sessionCookie.value
  const jwtData = await getJWTSession(session)
  if (!jwtData.selectedProject) throw new Error('No session cookie found')
  return jwtData.selectedProject;
}

export { getProject };