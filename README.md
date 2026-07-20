# behind7proxies

Developer portfolio for **Ryan Morris** ([@hackmods](https://github.com/hackmods)) — open-source projects, Axo Alley, and technical write-ups.

## Stack

- Next.js (App Router)
- React
- Tailwind CSS
- Lucide React

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint

## CapRover

This repo is packaged for CapRover (`captain-definition` + multi-stage `Dockerfile` with Next.js `output: "standalone"`).

1. Create an app in CapRover (e.g. `behind7proxies`).
2. Set the container HTTP port to **3000**.
3. Deploy (CLI or CapRover UI git/tarball).
4. Attach custom domain `behind7proxies.com` and enable HTTPS.

```bash
# one-time: npm i -g caprover
caprover login
caprover deploy
```

CapRover’s dashboard stays on host `:3000`. Public traffic for the site goes through CapRover nginx on `:80`/`:443`.
