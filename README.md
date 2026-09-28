# Potato Approved

A small, static Astro catalogue of PC games that run on modest hardware.

## Run locally

```sh
npm install
npm run dev
```

Astro prints the local URL, normally `http://localhost:4321`.

Build the static site with:

```sh
npm run build
```

## Content

Each game is one Markdown file in `src/content/games/`. Its `category` must be either `potato` (integrated graphics / very low-end hardware) or `fries` (an old or low-end dedicated GPU).

The Potato and Fries pages initially show only their own category. Once text is entered in the search box, the browser searches **all** games by title, genre, year, hardware, and description. Search is plain client-side JavaScript and uses no external service.

## Sveltia CMS

The CMS is available at `/admin/`. Before using it, replace `YOUR_GITHUB_USERNAME` in `public/admin/config.yml` with the owner of the GitHub repository. Uploaded covers are committed to `public/games/` and referenced as `/games/...`. No API secrets or tokens are stored in the repository.

Neocities deployment will be configured later.
