# Users API Spec

## Get Single User

**Endpoint: GET/v1/users/:id**

Url Parameter:

```txt
acde070d-8c4c-4f0d-9d8a-162843c10333 (UUID)
```

Response Body (Success)

```json
{
  "user": {
    "id": "...",
    "name": "...",
    "email": "...",
    "password": "...",
    "gender": "...",
    "picture": "...",
    "age": 14,
    "role": "...",
    "refreshToken": "..."
  },
  "status": "OK"
}
```

Response Body (Error)

```json
{
  "TypeError": "...",
  "messege": "...",
  "status": "KO"
}
```

## Update User

**Endpoint: PATCH/v1/users/:id**

Url Parameter:

```txt
acde070d-8c4c-4f0d-9d8a-162843c10333 (UUID)
```

Request Body:

```json
{
  "name": "Nova" // For Example
}
```

Response Body (Success)

```json
{
  "updated": true,
  "status": "OK"
}
```

Response Body (Error)

```json
{
  "TypeError": "...",
  "messege": "...",
  "status": "KO"
}
```

## Delete User

**Endpoint: DELETE/v1/users/:id**

Url Parameter:

```txt
acde070d-8c4c-4f0d-9d8a-162843c10333 (UUID)
```

Response Body (Success)

```json
{
  "deleted": true,
  "status": "OK"
}
```

Response Body (Error)

```json
{
  "TypeError": "...",
  "messege": "...",
  "status": "KO"
}
```
