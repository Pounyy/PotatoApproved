# Potato Approved

A small, static Astro catalogue of PC games that run on modest hardware.

## Catalogue CMS

Game content lives in `src/content/games/`, and game images live in `public/games/` with public URLs such as `/games/example.webp`.

Pages CMS is used to edit catalogue entries:

1. Open [Pages CMS](https://app.pagescms.org/) and sign in with GitHub.
2. Open the `Pounyy/PotatoApproved` repository.
3. Edit an existing game or create a new one in the **Games** collection.
4. Save the entry. Pages CMS commits the change to GitHub.
5. The existing GitHub Actions workflow rebuilds Potato Approved and deploys it to Neocities automatically.

