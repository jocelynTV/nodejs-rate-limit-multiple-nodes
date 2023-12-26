# Rate limit with cluster mode

## Requires

- Node.js >=16
- Typescript
- Yarn
- PM2

## Usage

```bash
yarn install
yarn build
pm2 start dist/index.js -i max
```
