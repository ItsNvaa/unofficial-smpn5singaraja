# Achivement API Spec

## Get All Achivement Datas

**Endpoint: GET/v1/achievements**

Response Body (Success)

```json
{
  "achievements": [
    {
      "id": "...",
      "title": "...",
      "decsription": "...",
      "picture": "..."
    }
  ],
  "status": "OK",
  "total": 5 // For Example
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

## Get Single Achivement Data

**Endpoint: GET/v1/teachers/:id**

Url Parameter:

```txt
acde070d-8c4c-4f0d-9d8a-162843c10333 (UUID)
```

Response Body (Success)

```json
{
  "achievement": {
    "id": "...",
    "title": "...",
    "decsription": "...",
    "picture": "..."
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

## Add Achivement

**Endpoint: POST/v1/achivements**

Request Body:

```json
{
  "id": "...",
  "title": "...",
  "decsription": "...",
  "picture": "..."
}
```

Response Body (Success)

```json
{
  "created": true,
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

## Update Achivement

**Endpoint: PATCH/v1/achivements/:id**

```txt
acde070d-8c4c-4f0d-9d8a-162843c10333 (UUID)
```

Request Body:

```json
{
  "title": "This is a title"
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

## Delete Achivement

**Endpoint: DELETE/v1/achivements/:id**

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
