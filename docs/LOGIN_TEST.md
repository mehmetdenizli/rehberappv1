# Login Test Guide

## Test Credentials

Use any of these accounts to test the login:

### Guides (Rehberler)
1. **Ahmet Yılmaz** (Istanbul)
   - Email: `ahmet.yilmaz@example.com`
   - Password: `password123`

2. **Zeynep Kaya** (Cappadocia)
   - Email: `zeynep.kaya@example.com`
   - Password: `password123`

3. **Mehmet Demir** (Aegean)
   - Email: `mehmet.demir@example.com`
   - Password: `password123`

4. **Ayşe Çelik** (Antalya)
   - Email: `ayse.celik@example.com`
   - Password: `password123`

5. **Can Öztürk** (Black Sea)
   - Email: `can.ozturk@example.com`
   - Password: `password123`

### Tourists (Turistler)
1. **Ali**
   - Email: `ali@example.com`
   - Password: `password123`

2. **Elif**
   - Email: `elif@example.com`
   - Password: `password123`

3. **Burak**
   - Email: `burak@example.com`
   - Password: `password123`

4. **Selin**
   - Email: `selin@example.com`
   - Password: `password123`

5. **Emre**
   - Email: `emre@example.com`
   - Password: `password123`

## How to Test

1. Open your browser and go to: http://localhost:3000/auth/login
2. Enter one of the email addresses above
3. Enter password: `password123`
4. Click "Giriş Yap"
5. You should be redirected to the feed page

## Troubleshooting

If you see a 404 error:
1. Open browser console (F12)
2. Check the Network tab
3. Look for the failed request to see the actual error
4. The error details will help identify the issue

If you see CORS errors:
- Make sure both frontend and backend containers are running
- Check: `docker-compose ps`

If you see connection refused:
- Make sure the backend is accessible: `curl http://localhost:3001/api/auth/login`
- Check backend logs: `docker logs geoguide-backend`

## API Endpoint

The login endpoint is: `POST http://localhost:3001/api/auth/login`

Request body:
```json
{
  "email": "ahmet.yilmaz@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "user": {
    "id": "...",
    "email": "ahmet.yilmaz@example.com",
    "username": "ahmetyilmaz",
    "role": "GUIDE",
    ...
  },
  "access_token": "eyJhbGc..."
}
```
