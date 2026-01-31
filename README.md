This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Setup Instructions

### 1. Create a Database on Supabase

1. Go to [Supabase](https://supabase.com) and sign up or log in
2. Click on "New Project" button
3. Fill in the project details:
   - **Name**: Choose a name for your project (e.g., "todo-app")
   - **Database Password**: Create a strong password (save this, you'll need it later)
   - **Region**: Select a region closest to your users
   - **Pricing Plan**: Select Free tier to get started
4. Click "Create new project" and wait for the database to be provisioned (this may take 1-2 minutes)
5. Once the project is ready, go to the **SQL Editor** tab in the left sidebar
6. Copy the contents of the `supabase-setup.sql` file from this repository
7. Paste the SQL into the SQL Editor and click "Run" to create the necessary tables and policies

### 2. Get Supabase API Keys and Update .env.local

1. In your Supabase project dashboard, click on the **Settings** icon (gear icon) in the left sidebar
2. Navigate to **API** section
3. You'll find two important keys:
   - **Project URL**: This is your `SUPABASE_URL`
   - **API key (anon, public)**: This is your `SUPABASE_API_KEY`
4. Create a `.env.local` file in the root of your project:
   ```bash
   cp .env.example .env.local
   ```
5. Open `.env.local` and add your Supabase credentials:
   ```env
   SUPABASE_URL=your_project_url_here
   SUPABASE_API_KEY=your_api_key_here
   ```
6. Save the file (never commit `.env.local` to git - it's already in `.gitignore`)

### 3. Deploy to Vercel with Environment Variables

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [Vercel](https://vercel.com) and sign up or log in
3. Click "Add New Project"
4. Import your Git repository
5. In the "Configure Project" section, expand the **Environment Variables** section
6. Add the following environment variables:
   - **Key**: `SUPABASE_URL`
     - **Value**: Your Supabase project URL (from step 2)
   - **Key**: `SUPABASE_API_KEY`
     - **Value**: Your Supabase API key (from step 2)
7. Click "Deploy" and wait for the deployment to complete
8. Once deployed, Vercel will provide you with a production URL
9. Visit your URL to see your app live!

**Note**: For future deployments, you can update environment variables by:
- Going to your project in Vercel dashboard
- Navigating to **Settings** > **Environment Variables**
- Adding, editing, or removing variables as needed
- Triggering a new deployment for changes to take effect

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

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
