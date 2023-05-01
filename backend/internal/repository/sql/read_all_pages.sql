select "Page".*
from "Page"
join "Project" on "Page"."projectId" = "Project".id
join "UsersInProjects" on "Project".id = "UsersInProjects"."projectId"
where "UsersInProjects"."userId" = $1