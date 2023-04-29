SELECT
    id,
    "path",
    title,
    image,
    description,
    "createdAt",
    "updatedAt",
    public."Page"."projectId"
FROM public."Page" WHERE public."Page"."projectId" = $1;