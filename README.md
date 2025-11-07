# Setting up

## Without Docker

1. Clone the repo.
```bash
git clone https://github.com/MoeySeanJean/gic.git
```

2. Install [Node.js](https://nodejs.org/en/download) and [PostgreSQL](https://www.postgresql.org/download/).
```

3. Setup a database in PostgreSQL locally.

4. Setup .env in backend folder as follows:
```env
DATABASE_URL=postgresql://postgres:[password]@localhost:5432/[database]
PORT=3000
DATA_DIR=./data
```

5. Open 2 terminals for frontend and backend respectively.

6. For backend, run:
```bash
cd backend
npm install
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

7. For backend data seed, run:
```bash
npm run seed
```

8. For frontend, run:
```bash
cd frontend
npm install
npm run dev
```

9. Go to the [app](localhost:5173).

## With Docker

1. Clone the repo.
```bash
git clone https://github.com/MoeySeanJean/gic.git
```

2. Install [Docker](https://www.docker.com/).

3. Run:
```bash
docker-compose up --build
```

4. Go to the [app](http://localhost:5173).