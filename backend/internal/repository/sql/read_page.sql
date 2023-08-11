SELECT "Page".*
FROM public."Page"
where LOWER("Page"."path") = LOWER($1)
and "Page"."projectId" = $2