# Tafiti99 deployment checklist: VS Code → GitHub → Namecheap

Use the main [README.md](README.md) first to open and test the website on your computer. This checklist summarizes the online deployment stages.

## Before any deployment

- [ ] Open the extracted folder in VS Code.
- [ ] Start the local server with `py -m http.server 5500 --bind 127.0.0.1`.
- [ ] Run `python tools/check_site.py`.
- [ ] Run `node --check js/main.js`, `node --check js/blog.js`, and `node --check js/portfolio.js`.
- [ ] Manually check the homepage, book artwork and request link, founder story, project modal, article reader, responsive navigation and contact page.
- [ ] Confirm every project/image can be shown publicly and contains no identifiable participant or confidential client data.
- [ ] Confirm that you are comfortable publishing this source code in a public GitHub repository.

## Push to the Tafiti99 GitHub account

Create an empty repository at `https://github.com/tafiti99` named `tafiti99-website`, unless you prefer another name. From the project folder, run:

```powershell
git init
git add .
git commit -m "Prepare Tafiti99 website for local review"
git branch -M main
git remote add origin https://github.com/tafiti99/tafiti99-website.git
git push -u origin main
```

Only run `git init` and `git remote add origin` when they are appropriate. Check `git status` and `git remote -v` first if this folder has already been version-controlled.

## GitHub Pages preview

In GitHub, open **Settings → Pages**, choose deployment from `main` and the root folder, then save. For the suggested repository name, the preview is usually `https://tafiti99.github.io/tafiti99-website/`. Test that URL before switching the live domain.

## Namecheap production domain

1. In GitHub, verify ownership of `tafiti99.com` using the current GitHub Pages custom-domain verification instructions.
2. Save a record of the existing DNS settings in Namecheap before editing them.
3. Add `tafiti99.com` as the custom domain in GitHub Pages.
4. In Namecheap, configure the current GitHub Pages DNS values. Standard apex IPv4 records are `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`; the typical `www` CNAME points to `tafiti99.github.io`. Confirm the current official instructions for your setup before making changes.
5. Preserve the existing email service: do not delete MX records or SPF/DKIM/DMARC TXT records.
6. Wait for DNS/certificate provisioning, enable **Enforce HTTPS**, and test `https://tafiti99.com` and `https://www.tafiti99.com`.
7. Submit a real contact-form test and confirm delivery to `sadicktunda99@gmail.com`. FormSubmit may require first-time recipient verification.

## Important limitation

This project is ready for local review, but **no GitHub push, GitHub Pages deployment, or Namecheap DNS edit has been performed by preparing these files**. The production cutover remains an explicit step so it can be tested safely.

Official references:
- <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site>
- <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages>
- <https://www.namecheap.com/support/knowledgebase/article.aspx/9645/2208/how-do-i-link-my-domain-to-github-pages/>
