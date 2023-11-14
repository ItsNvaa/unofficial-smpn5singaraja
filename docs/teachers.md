# Teachers API Spec

## Get All Teachers Datas

**Endpoint: GET/v1/teachers**

Response Body (Success)

```json
{
  "teachers": [
    {
      "id": "...",
      "fullname": "...",
      "picture": "...",
      "NIP": 15,
      "gender": "...",
      "grade": "...",
      "class": "...",
      "email": "...",
      "profile": "..."
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

## Get Single Teacher Data

**Endpoint: GET/v1/teachers/:id**

Url Parameter:

```txt
acde070d-8c4c-4f0d-9d8a-162843c10333 (UUID)
```

Response Body (Success)

```json
{
  "teachers": {
    "id": "...",
    "fullname": "...",
    "picture": "...",
    "NIP": 15,
    "gender": "...",
    "grade": "...",
    "class": "...",
    "email": "...",
    "profile": "..."
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

## Search Teachers

**Endpoint: GET/v1/teachers/search?q=your keyword here...**

Response Body (Success)

```json
{
  "teachers": [
    {
      "id": "...",
      "fullname": "...",
      "picture": "...",
      "NIP": 15,
      "gender": "...",
      "grade": "...",
      "class": "...",
      "email": "...",
      "profile": "..."
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

## Add Teacher

**Endpoint: POST/v1/teachers**

Request Body:

```json
{
  "id": "...",
  "fullname": "...",
  "picture": "...",
  "NIP": 15,
  "gender": "...",
  "grade": "...",
  "class": "..."
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

## Update Teacher

**Endpoint: PATCH/v1/teachers/:id**

```txt
acde070d-8c4c-4f0d-9d8a-162843c10333 (UUID)
```

Request Body:

```json
{
  "NIP": 78
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

## Delete Teacher

**Endpoint: DELETE/v1/teachers/:id**

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
