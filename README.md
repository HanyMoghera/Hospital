# ICU & Hospital Forms Guide

Single-page React (Vite) reference for nursing, medical, procedural, OR, transfer, and discharge forms — styled with animations and section imagery.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy on Vercel

1. Push this folder to GitHub (or GitLab / Bitbucket).
2. In [Vercel](https://vercel.com), **Add New Project** → import the repo.
3. Framework preset: **Vite** (auto-detected). Root: repository root.
4. Build command: `npm run build`. Output directory: `dist`.
5. Deploy.

No extra `vercel.json` is required for a standard Vite SPA. If you add client-side routing later, add SPA rewrites as needed.

## Stack

- React 18
- Vite 5
- Plain CSS (animations, sticky header, intersection reveal)

Images load from Unsplash URLs (network required for photos in the browser).
