# Articles API Spec

## Search Articles

**Endpoint: GET/v1/articles/search?q=your keyword here...**

Response Body (Success)

```json
{
  "articles": [
    {
      "id": "...",
      "title": "...",
      "decsription": "...",
      "author": "...",
      "picture": "...",
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

## Add Articles

**Endpoint: POST/v1/articles**

Request Body:

```json
{
  "id": "...",
  "title": "...",
  "decsription": "...",
  "author": "...",
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
  "status": "KO",
  "created": false
}
```

## Update Articles

**Endpoint: PATCH/v1/articles/:id**

```txt
acde070d-8c4c-4f0d-9d8a-162843c10333 (UUID)
```

Request Body:

```json
{
  "decsription": "This is decsription" // For Example
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

## Delete Articles

**Endpoint: DELETE/v1/articles/:id**

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
