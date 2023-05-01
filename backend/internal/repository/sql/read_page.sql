SELECT "Page".*
FROM public."Page"
join "Project" on "Page"."projectId" = "Project".id
join "UsersInProjects" on "Project".id = "UsersInProjects"."projectId"
where "Page"."path" = $1
and "UsersInProjects"."userId" = $2