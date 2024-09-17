## Introduction

PathoGeneLit is a web server harnessing the open access scientific literature
on bacterial pathogens for gene functional analysis.

## Background

The core concept for this project is based on the excellent
[Rummagene](https://github.com/MaayanLab/rummagene), which allows for mining
of human gene lists in the literature. Up to this point, to my knowledge,
there is no other prokaryote-specific tool available for this purpose, hence
the development of PathoGeneLit.

The code for the data retrieval bot was adapted from the Rummagene bot
and is used here non-commercially, under the
[Attribution-NonCommercial-ShareAlike 4.0](https://github.com/MaayanLab/rummagene/blob/main/LICENSE)
license. It has been adapted to retrieve prokaryote gene lists. Additionally,
some modifications have been made to the filtering of gene lists (to reduce
the maximum length allowed, given the smaller genome sizes of bacteria) and
database provisioning (which is here performed here using pure sql).

This project is built with [Next.js](https://nextjs.org).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
