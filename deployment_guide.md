# Deployment Guide to Vercel

Follow these steps to make your "Kundalik" project live on the web using Vercel.

## Step 1: Push latest changes to GitHub

Open your terminal in the project folder and run:

```bash
git add .
git commit -m "Finalizing project for deployment"
git push origin master
```

## Step 2: Deploy to Vercel

There are two ways to deploy:

### Option A: Using the Vercel Website (Recommended)

1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New"** -> **"Project"**.
3. Import your repository: `kundalik_com`.
4. In the Project Settings, Vercel will automatically detect the `vercel.json` file.
5. Click **"Deploy"**.
6. Once finished, you will get a public link like `https://kundalik-online.vercel.app`.

### Option B: Using Vercel CLI

If you have Vercel CLI installed:

```bash
vercel --prod
```

## Step 3: Verification

Once deployed, visit your new link and check:
- Is the design looking correct?
- Do the logins work? (Try using `admin`/`admin` or `1`/`1`).
- Does the theme toggle work?

---

**Note**: Your current `vercel.json` is configured to serve the `frontend` folder as the root of the website. This means anyone visiting the URL will see your HTML interface immediately.
