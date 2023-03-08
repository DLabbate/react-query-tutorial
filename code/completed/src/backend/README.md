# REST API

_For the purpose of this tutorial, we can consider everything in the `backend` folder as a blackbox!_

In particular, this folder implements a REST API using the following:

- [msw](https://mswjs.io/) for API Mocking
- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) for data persistence (to simulate using a real database)

## List TODOs

### Endpoint

`GET /api/todos`

### Response Body

```json
{
  "id": "1234567",
  "success": true,
  "description": "Subscribe to Dom the Engineer!"
}
```

## Create TODO

### Endpoint

`POST /api/todos`

### Response Body

If the TODO was created successfully, the server will return a `201 Created` (with the new todo item).

## Update TODO

### Endpoint

`PUT /api/todos/{id}`

### Response Body

If the TODO was updated successfully, the server will return a `200 Success` (with the updated todo item).

## Delete TODO

### Endpoint

`DELETE /api/todos/{id}`

### Response Body

If the TODO was deleted successfully, the server will return a `204 No Content`.
