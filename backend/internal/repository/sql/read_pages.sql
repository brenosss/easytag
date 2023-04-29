SELECT
    id,
    path,
    title,
    image,
    description,
    createdAt,
    updatedAt,
    projectId
FROM Page WHERE projectId = $1;