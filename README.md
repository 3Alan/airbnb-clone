# AriBnb Clone

It is for learning purpose only. All image from unsplash.(https://source.unsplash.com/random)

## Tech Stack

- Expo SDK 50
- Expo Router V3
- React Query
- MongoDB
- Prisma

## Screenshots

<img src="./screenshots/首页1.png" width="280" /><img src="./screenshots/首页2.png" width="280" /><img src="./screenshots/首页3.png" width="280" /><img src="./screenshots/calendar.png" width="280" /><img src="./screenshots/categorySheet.png" width="280" /><img src="./screenshots/search.png" width="280" /><img src="./screenshots/详情页1.png" width="280" /><img src="./screenshots/详情页2.png" width="280" />

## Local Development

### Install Dependencies

```bash
yarn
```

### Set Environment

```bash
mkdir .env
```

```bash
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster-url>/airbnb"
```

### Run MongoDB Replica Set

```bash
docker compose up --wait
```

### Init Database

```bash
npx prisma db push
```

### Start

```bash
yarn start
```
