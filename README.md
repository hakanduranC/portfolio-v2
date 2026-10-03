# Hakan Duran — Portfolio

Personal portfolio at [hakanduran.me](https://hakanduran.me), built with Astro, Tailwind CSS v4, and MDX. The existing Vercel deployment publishes changes pushed to `main`.

## Development

```sh
pnpm install --frozen-lockfile
pnpm dev
```

`pnpm test` builds the static site and checks its main routes, document links, and PDF assets. `pnpm preview` serves the production build for a visual check before pushing.

## Content

- `src/content/`: experience, education, projects, skills, references, and blog posts.
- `src/pages/index.astro`: homepage and introduction.
- `src/pages/thesis.astro`: thesis overview and native browser PDF reader, with direct open/download links for unsupported browsers.
- `src/components/Header.astro`: shared navigation and CV download.

## Updating documents

- Replace `public/files/cv.pdf` with the latest CV. Its stable URL preserves existing links. Update the version query in the CV links when replacing it to avoid serving a cached copy.
- Replace `public/files/hakan-duran-masters-thesis.pdf` with the approved public thesis. Update the metadata and `public/files/thesis-cover.png` if its cover or page count changes.
- Keep only publication-ready documents here. Company datasets, private evaluation records, credentials, and implementation archives do not belong in this repository.

The older thesis announcement remains at its original URL with an update pointing readers to the completed work. The `/v1` rewrites in `vercel.json` retain access to the first portfolio.
