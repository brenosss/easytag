SELECT EXISTS(SELECT 1 FROM User
WHERE id = $1 AND id IN (SELECT userId FROM ProjectUser WHERE projectId = $2)