This is a website for juniors to search development entry-level jobs and manage personal recruitment processes.

![image](https://github.com/user-attachments/assets/ea48b3c2-8958-47ad-9524-554fdfff4379)


## Getting Started
Build the server (afetr every change at initDB.sql):

```bash
npm run build
```
Create .env.local file and environment variables in it.

In case that the environment variables are empty, run:

```bash
export $(grep -v '^#' .env.local | xargs)
```

Run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack
* Full Stack -> [nextjs](https://nextjs.org/)

* Frontend -> [reactJS](https://react.dev/), [tailwind](https://tailwindcss.com/)

* Backend -> [nodejs](https://nodejs.org/en)

* Database -> [postgresql](https://www.postgresql.org/)

