# AriBnb Clone

## Tech Stack

- Expo
- Expo Router
- React Query
- MongoDB
- Prisma

## Data

- 数据来自 opendatasoft
- 所有图片来自 unsplash

## Screenshots

<img src="./screenshots/首页1.png" width="280" /><img src="./screenshots/首页2.png" width="280" /><img src="./screenshots/calendar.png" width="280" /><img src="./screenshots/categorySheet.png" width="280" /><img src="./screenshots/search.png" width="280" /><img src="./screenshots/详情页1.jpg" width="280" /><img src="./screenshots/详情页2.jpg" width="280" />

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
