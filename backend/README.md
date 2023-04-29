# Easytags Backend

Running the project

```
go run cmd/main.go
```

### Testing

Create a page and project in the frontend. Get the project ID and then run

```
curl localhost:8080/projects/{project_id}/pages
```