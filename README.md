This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

----------------

# DB

npx drizzle-kit generate

npx drizzle-kit push

# init data

## add a event record

http://localhost:3000/api/events/test

## add many event records

http://localhost:3000/events/create

# Fix bug

## Error: Route "/news/[id]" used `params.id`. `params` should be awaited before using its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis

news/[id]/page.tsx

## Error: DATABASE_URL is not set in environment variables

数据库行为应在服务端，不能在客户端

## Error: React Hook "useCallback" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return? react-hooks/rules-of-hooks

React Hooks 使用规则的问题。React Hooks 有一个重要的规则：它们必须在每次渲染时以相同的顺序被调用，不能在条件语句中使用。

## vercel 部署

next.config.js 中配置 typescript 和 eslint 忽略错误

# TODO

useState useEffect 使用

在 schema 定义时就使用一致的命名规范，然后让所有接口和组件都遵循这个规范
