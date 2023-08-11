SELECT "Page".*
FROM public."Page"
where "Page"."path" = $1
and "Page"."projectId" = $2