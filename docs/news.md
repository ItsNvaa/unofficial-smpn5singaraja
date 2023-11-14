# News API Spec

## Search News

**Endpoint: GET/v1/news/search?q=your keyword here...**

Response Body (Success)

```json
{
  "news": [
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

## Add News

**Endpoint: POST/v1/news**

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
  "status": "KO"
}
```

## Update News

**Endpoint: PATCH/v1/news/:id**

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
  "status": "KO"
}
```

## Delete News

**Endpoint: DELETE/v1/news/:id**

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
