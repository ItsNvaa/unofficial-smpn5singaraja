# Auth API Spec

## Register USer

**Endpoint: POST/v1/auth/register**

Request Body:

```json
{
  "name": "Nova", // Required
  "email": "nova@gmail.com", // Required
  "password": "this is a password", // Required
  "gender": "Male", // Required
  "picture": "...",
  "age": 14,
  "role": "admin"
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

## Login User

**Endpoint: POST/v1/auth/login**

Request Body:

```json
{
  "name": "Nova", // Required
  "email": "nova@gmail.com", // Required
  "password": "this is a password" // Required
}
```

Response Body (Success)

```json
{
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

## Logout User

**Endpoint: POST/v1/auth/logout**

Response Body (Success)

```json
{
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

Note: The url endpoint is http secure with http cookies only so you can use this endpoint in your local. Alternatively you can use [Ngrok](https://ngrok.com) to tunnel the apps
