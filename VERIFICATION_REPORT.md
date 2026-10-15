# Tafiti99 website verification report

**Verification date:** 14 October 2026

## Automated checks passed

- Parsed all 8 main HTML pages with Python's HTML parser.
- Verified that local HTML links, script references, stylesheets, images and form-action references point to existing local files where applicable.
- Parsed both JSON data files and checked for duplicate item IDs.
- Verified that all portfolio thumbnails, portfolio project images and Markdown article files exist locally.
- Verified the existing CSS brand variables were preserved: `--primary-blue: #002244`, `--accent-teal: #008080`, and `--teal-dark: #006666`.
- Verified the homepage uses the supplied `SPSS & R for Health Research` promotional artwork.
- Verified the corrected `sadicktunda99@gmail.com` contact destination, the Tafiti99 GitHub profile, and the requested LinkedIn, Instagram and TikTok links in all 8 page footers.
- Verified the corrected origin-story date, `#BilaKuchoka` wording, and absence of a co-founder designation in the HTML pages.
- Checked all three JavaScript files with Node.js syntax validation.
- Parsed the homepage's JSON-LD structured data.
- Checked that all 8 main pages have unique HTML IDs and that contact-form labels point to their controls.
- Local HTTP smoke test returned HTTP 200 for the 8 pages and 8 key CSS/JavaScript/data/image resources tested.

## Checks not completed in this environment

A full browser-based visual and interaction test could not be completed here. The available headless Chromium build refused to navigate to both local `file://` pages and the local development server with `ERR_BLOCKED_BY_ADMINISTRATOR`. That is a limitation of this test environment, not evidence that the website itself is broken.

Before production deployment, open the project in VS Code, run the local server, and manually confirm the visual layout, mobile navigation, scroll reveals, portfolio project viewer, article reader, book-request button and contact form in your own browser. The contact form uses FormSubmit, so actual email delivery must be tested online; its first submission may require recipient verification.

## Local-preview dependency note

The HTML and local project assets are in this package, but some Bootstrap/Font Awesome styles/scripts and article/hero images are loaded from external URLs. The local website preview therefore needs an internet connection for those assets. A fully disconnected/off-grid preview would require copying those dependencies into the project and changing the external URLs to local paths.
