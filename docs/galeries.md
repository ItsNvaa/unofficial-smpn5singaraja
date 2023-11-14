# Galeries API Spec

## Get All Galeries Datas

**Endpoint: GET/v1/galeries**

Response Body (Success)

```json
{
  "galeries": [
    {
      "id": "...",
      "title": "...",
      "picture": "...",
      "description": "",
      "createdAt": "...",
      "updatedAt": "..."
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

## Get Single Galery Data

**Endpoint: GET/v1/galeries/:id**

Url Parameter:

```txt
acde070d-8c4c-4f0d-9d8a-162843c10333 (UUID)
```

Response Body (Success)

```json
{
  "galeries": {
    "id": "...",
    "title": "...",
    "picture": "...",
    "description": "",
    "createdAt": "...",
    "updatedAt": "..."
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

## Search Galeries

**Endpoint: GET/v1/galeries/search?q=your keyword here...**

Response Body (Success)

```json
{
  "galeries": [
    {
      "id": "...",
      "title": "...",
      "picture": "...",
      "description": "",
      "createdAt": "...",
      "updatedAt": "..."
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

## Add Galery

**Endpoint: POST/v1/galeries**

Request Body:

```json
{
  "title": "...", // Required
  "picture": "...", // Required
  "description": "" // Required
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
  "status": "KO",
  "created": false
}
```

## Update Galery

**Endpoint: PATCH/v1/galeries/:id**

```txt
acde070d-8c4c-4f0d-9d8a-162843c10333 (UUID)
```

Request Body:

```json
{
  "title": "This is a title" // For Example
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
  "status": "KO",
  "updated": false
}
```

## Delete Galery

**Endpoint: DELETE/v1/galeries/:id**

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
  "status": "KO",
  "deleted": false
}
```
