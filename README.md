## Getting Started

1. First, install the dependencies (we use pnpm):

```bash
pnpm install
```

Notes : if you happen to install a new package, make sure to also commit the new `pnpm-lock.yaml` file

2. Pull environment variables from vercel

```bash
npm i -g vercel
```

```bash
vercel link
```

```bash
vercel env pull .env.local
```

3. Run development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Code Commits

Make sure your changes can be built successfully, and use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages

example :

`feat(flights): add new column to table`

## Code Formatter

Make sure you have the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension installed and enabled on your VS Code (for code style consistency)

## Helpful Extensions

Here the VS Code extensions we recommend for this project

- [Tailwind Intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) (tailwind css classes autocomplete)
- [Git Lens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) (so you know who to blame for bad code :D)
- [ES Lint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (to warn you about any potentially bug causing code)
