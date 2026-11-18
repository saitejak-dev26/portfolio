# Saiteja Kondakindi — Portfolio

Next.js 15 (App Router, TypeScript) portfolio, exported as a **static site** and deployed to **Hostinger** automatically from **GitHub** on every push to `main`.

```
app/            layout, page, global styles, sitemap & robots
components/     Nav, Hero, About, Skills, Projects, Experience, Contact, Footer …
data/site.ts    ← ALL content (projects, skills, experience, links). Edit here.
lib/icons.ts    brand logos from simple-icons, resolved at build time
public/         images, résumé PDF, favicon, contact.php, .htaccess
.github/workflows/deploy.yml   build + FTP upload to Hostinger
```

---

## 1. Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # creates the static site in ./out
npm start          # preview ./out locally
```

> Locally, `contact.php` can't run (no PHP), so the form falls back to opening your email app. On Hostinger it sends real emails.

---

## 2. Push to GitHub

```bash
git init
git add .
git commit -m "Portfolio: initial commit"
git branch -M main
git remote add origin https://github.com/saitejak-dev26/portfolio.git   # create this empty repo on GitHub first
git push -u origin main
```

---

## 3. Prepare Hostinger (one time)

1. **Website:** hPanel → *Websites* → add your domain (or use the free temporary domain).
2. **SSL:** hPanel → *Security* → *SSL* → install the free SSL certificate.
3. **FTP details:** hPanel → *Files* → *FTP Accounts*. Note the
   - **FTP IP / hostname** (e.g. `ftp.yourdomain.com` or an IP)
   - **FTP username** (e.g. `u123456789`)
   - **FTP password** (reset it here if you don't know it)
4. **Email for the contact form:** hPanel → *Emails* → create a mailbox such as `no-reply@yourdomain.com`.
   Then open `public/contact.php` and set:
   ```php
   const FROM_EMAIL = 'no-reply@yourdomain.com';
   ```
   (Hostinger only delivers mail sent *from* an address on your own domain.)

---

## 4. Connect GitHub → Hostinger

In your GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**, add:

| Secret name    | Value                                 |
|----------------|---------------------------------------|
| `FTP_SERVER`   | FTP hostname or IP from hPanel        |
| `FTP_USERNAME` | FTP username from hPanel              |
| `FTP_PASSWORD` | FTP password from hPanel              |

Now every `git push` to `main` will:
1. install dependencies, 2. run `next build` → `./out`, 3. upload `./out` to `public_html/` on Hostinger.

Watch progress under the repo's **Actions** tab. You can also run it manually with **Run workflow**.

**If the upload lands in the wrong folder:** when you log in with that FTP account, if you already start *inside* `public_html`, change `server-dir` in `.github/workflows/deploy.yml` to `./`.
**If FTPS fails to connect:** change `protocol: ftps` to `protocol: ftp`.

---

## 5. Final touches

- In `data/site.ts`, set `url` to your real domain (used for SEO, sitemap and social previews).
- Add live links to projects with `live: 'https://…'` in `data/site.ts` — a **Live ↗** link appears automatically.
- When YumCrm launches, remove `inDevelopment: true` from it in `data/site.ts`.
- Replace the résumé by overwriting `public/resume/Saiteja_Kondakindi_Resume.pdf`.

---

## Alternative: Hostinger's built-in Git deploy (no GitHub Actions)

hPanel → *Advanced* → *Git* can pull a repo directly, but it **does not run a build**. To use it, build locally (`npm run build`), commit the contents of `out/` to a separate branch (e.g. `deploy`), and point Hostinger's Git deployment at that branch. The GitHub Actions method above is simpler and fully automatic.
