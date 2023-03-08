# React Query Tutorial

This tutorial will cover [React Query](), a data fetching library you must try out!

We'll cover the following topics

- Queries
- Mutations
- Query Invalidations
- Optimistic Updates

_Consider that we have the following REST API_

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
