# Tafiti99 Website

Tafiti99's static website, prepared for local review in Visual Studio Code before a production deployment. It preserves the existing brand palette and identity, uses the supplied **SPSS & R for Health Research** promotional artwork, and includes scroll-reveal interactions.

## 1. Open the project locally in VS Code

1. Download and extract this ZIP file into a normal folder, for example `C:\Projects\tafiti99-website`. Do not work from inside the ZIP viewer.
2. Open Visual Studio Code.
3. Select **File → Open Folder** and choose the extracted `tafiti99_release` folder (or rename it to `tafiti99-website`).
4. Open **Terminal → New Terminal**.
5. On Windows, run:

   ```powershell
   py -m http.server 5500 --bind 127.0.0.1
   ```

   If the `py` command is unavailable but Python is installed, try `python -m http.server 5500 --bind 127.0.0.1`.

6. In your browser, open `http://127.0.0.1:5500/`.
7. Keep the terminal running while previewing the site. To stop the local server, return to the terminal and press **Ctrl+C**.

Use a local server rather than double-clicking `index.html`. The Knowledge Hub and Portfolio fetch JSON files, and browsers may block those requests when pages are opened with the `file://` protocol.

### What “local/offline setup” means for this version

The website files and the local preview server are on your computer, so you can review and edit before publishing. The current pages still load Bootstrap, Font Awesome, and some article/hero images from external URLs; **an internet connection is needed for those CDN assets and remote images to appear**. The static HTML, local CSS/JS, project data, and article Markdown files themselves are stored in this project. If you need the site to render with no internet connection at all, the external libraries and remote images must first be copied into the project and their URLs changed to local paths.

## 2. Check the site before publishing

Run these checks from the project folder:

```powershell
python tools/check_site.py
node --check js/main.js
node --check js/blog.js
node --check js/portfolio.js
```

The checker validates the required HTML files, local asset references, JSON data, portfolio image paths, article Markdown paths, key links, and the original CSS brand-color variables. These checks cannot verify remote service availability, email delivery, or the visual result on every screen size; those need manual browser tests.

Manually test these pages:

- `index.html` — homepage, supplied book promo artwork, Claim Your Copy button, animations.
- `about.html` — origin story and founder biography.
- `services.html` — service sections and mobile navigation.
- `portfolio.html` — project cards and project viewer.
- `blog.html` and an article opened from the Knowledge Hub — article cards and Markdown reader.
- `contact.html` — email/phone/WhatsApp links and form appearance.

The contact form uses FormSubmit and therefore cannot deliver messages from an offline preview. Once the site is deployed, submit one real test and complete any first-use recipient verification FormSubmit requests. Do not claim it works until the email is received.

## 3. Personal details and links configured in this version

- Email: `sadicktunda99@gmail.com`
- GitHub profile: <https://github.com/tafiti99>
- LinkedIn: <https://www.linkedin.com/in/tafiti99>
- Instagram: <https://instagram.com/tafiti99_research?exln=NGs1Y2ZhNXgwMmJi>
- TikTok: <https://tiktok.com/@tafiti99_research>

Email links use Gmail's compose URL. Device behavior varies; the URL opens Gmail in a browser or may hand off to the Gmail app depending on the user's browser and app settings. A web page cannot force Gmail to be installed or configured on every device.

## 4. Initialize Git and push to the Tafiti99 GitHub account

First create an **empty** GitHub repository under the `tafiti99` account. A suggested repository name is `tafiti99-website`. Do not choose “Add a README” when creating it, because this folder already has project files.

Before the first push, inspect the project for confidential data, passwords, private API keys, real patient information, and confidential client deliverables. Do not commit these.

Then run the following commands from the project folder. If you have already initialized Git or configured a remote, inspect `git status` and `git remote -v` first instead of repeating these commands blindly.

```powershell
git init
git add .
git commit -m "Prepare Tafiti99 website for local review"
git branch -M main
git remote add origin https://github.com/tafiti99/tafiti99-website.git
git push -u origin main
```

If you give the repository another name, use that exact repository URL in the `git remote add origin` command. GitHub authentication may prompt you to sign in through a browser or credential manager; do not put your GitHub password into the command.

## 5. Publish a preview with GitHub Pages

1. Open the repository on GitHub.
2. Select **Settings → Pages**.
3. Select publishing from the `main` branch and the root (`/`) folder, then save.
4. Wait for the deployment to finish and open the generated GitHub Pages address. For the suggested repository name, it should resemble `https://tafiti99.github.io/tafiti99-website/`.
5. Test the entire site on that preview URL. This is important because project and article URLs are relative paths.
6. Verify ownership of `tafiti99.com` in GitHub Pages before associating the production domain.

## 6. Connect `tafiti99.com` through Namecheap only after the preview passes

Do not change DNS while you are still working on the redesign. Before changing anything, take screenshots or export the existing Namecheap DNS records so the current website/email configuration can be restored if required.

For a standard GitHub Pages custom-domain setup, follow GitHub's current instructions and verify the domain first. The usual apex IPv4 records are:

| Type | Host | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

The usual `www` record is a CNAME pointing to `tafiti99.github.io` (not to the repository path). Confirm current values in GitHub's documentation before using them.

**Preserve email DNS. Do not delete MX records or email authentication TXT records (SPF, DKIM, DMARC) when changing website records.** Only replace records that conflict with the chosen website hosting configuration. Once DNS is correct and GitHub issues the certificate, enable **Enforce HTTPS** in GitHub Pages settings.

## Official documentation

- GitHub Pages publishing source: <https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site>
- GitHub Pages custom domain: <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site>
- GitHub Pages custom-domain verification: <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages>
- Namecheap GitHub Pages setup: <https://www.namecheap.com/support/knowledgebase/article.aspx/9645/2208/how-do-i-link-my-domain-to-github-pages/>

## Project structure

```text
.
├── .vscode/                 # Local preview task and extension suggestions
├── content/                 # Article Markdown files
├── css/style.css            # Existing brand styling and page animations
├── data/                    # Portfolio and article metadata (JSON)
├── images/                  # Logo, founder/project images and book promo
├── js/                      # Shared, blog and portfolio scripts
├── tools/check_site.py      # Local integrity checker
├── index.html
├── about.html
├── services.html
├── portfolio.html
├── blog.html
├── article.html
├── contact.html
└── thank-you.html
```
