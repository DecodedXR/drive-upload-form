---
title: "Collect files without Google sign-in, free: a Formfacade file-upload alternative"
description: Let anyone upload files into your Google Drive without a Google account, with a log in Google Sheets, for free. An honest comparison with Formfacade's file upload plan.
image: https://decodedxr.github.io/drive-upload-form/assets/cover.png
---
{% raw %}

# Collect files without Google sign-in, free: a Formfacade file-upload alternative

Google Forms' file-upload question makes every respondent sign in to a Google account, which stops many clients, applicants and customers. [Formfacade](https://formfacade.com/) solves that with its file upload plan. On [its pricing page](https://formfacade.com/pricing.html) (checked October 2026) it's **from $28 a month**, with up to 1 GB per file. There's no free plan, only a 7-day trial.

If you just need a public page where people upload files into your Drive, a free script can do it.

## Side by side

| | Formfacade file upload | Free Drive Upload Form |
|---|---|---|
| Price | From $28 a month after a 7-day trial | Free (MIT license) |
| Uploaders need a Google account | No | No |
| Files stored in | Formfacade's file storage (1 TB on that plan) | A folder in your own Google Drive |
| Largest file | Up to 1 GB | Set by you; keep it under about 30 MB for reliable uploads |
| Log of who uploaded what | With the form responses | A Google Sheet row per upload: name, email, note, file link |
| Customize the form | Full form builder, your Google Form's questions | Name, email, note and files; edit the HTML for more |
| Abuse guardrails | Not compared | File-size and type limits, optional password, uploads-per-hour cap |
| How it's set up | Sign up and connect your form | Paste two files into Apps Script and deploy as a web app (10 minutes) |

## When Formfacade is the better buy

- **Large files** (videos, big design files) over about 30 MB.
- You want the upload inside a **full Google Form** with your other questions, styled to your brand.
- You'd rather not deploy a script.

## Set up the free upload page (10 minutes)

1. Make a Drive folder for uploads and copy its ID from the address bar.
2. Create a Google Sheet for the log, then **Extensions → Apps Script**. Paste in [`Code.gs`](https://github.com/DecodedXR/drive-upload-form/blob/main/Code.gs) and an HTML file named `Page` with [`Page.html`](https://github.com/DecodedXR/drive-upload-form/blob/main/Page.html). Set `FOLDER_ID` at the top.
3. **Deploy → New deployment → Web app**, with **Execute as: Me** and **Who has access: Anyone**, then share the web app URL.

The full walkthrough is in the [step-by-step guide](upload-files-to-google-drive-without-sign-in.html).

---

[Get the script on GitHub](https://github.com/DecodedXR/drive-upload-form) · [Step-by-step guide](upload-files-to-google-drive-without-sign-in.html) · [More free Google Sheets scripts](https://decodedxr.github.io/free-google-sheets-scripts/)
{% endraw %}
