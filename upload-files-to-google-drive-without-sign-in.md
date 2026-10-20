---
title: How to let people upload files to your Google Drive without a Google account (free)
description: Google Forms' file upload question requires respondents to sign in. This free Apps Script upload page saves files to your Drive folder with no account needed, and logs each upload.
image: https://decodedxr.github.io/drive-upload-form/assets/cover.png
---
{% raw %}

# How to let people upload files to your Google Drive without a Google account (free)

Google Forms has a file-upload question, but anyone answering it **must sign in to a Google account**, and the files land in the form owner's Drive under a fixed folder layout. That rules it out for many real uses: clients sending documents, students without school Google accounts, event photo collection, job applications.

This guide sets up a free upload page that anyone can use, with no account. Files go into a Drive folder you choose, and each upload is logged in a spreadsheet. It uses [Drive Upload Form](https://github.com/DecodedXR/drive-upload-form), a free, MIT-licensed Apps Script.

## What you'll end up with

A web page with **Name**, **Email** (optional), **Note** (optional), an optional **Password**, and a **Files** picker that accepts several files at once. Uploads appear in your Drive folder as `Name - filename.pdf`, and a log sheet records who sent what and when, with a link to each file.

## Step 1: Make the folder and the log sheet

1. In Google Drive, create a folder for uploads and open it. The folder ID is the long code after `/folders/` in the address bar. Copy it.
2. Create a new Google Sheet. It will hold the upload log.

## Step 2: Add the script

1. In the sheet: **Extensions → Apps Script**.
2. Replace the contents of `Code.gs` with [`Code.gs`](https://github.com/DecodedXR/drive-upload-form/blob/main/Code.gs).
3. Click **+** next to Files → **HTML**, name it `Page` (exactly), and paste in [`Page.html`](https://github.com/DecodedXR/drive-upload-form/blob/main/Page.html).
4. At the top of `Code.gs`, paste your folder ID into `FOLDER_ID`.

## Step 3: Set the guardrails

A public upload page is a door into your Drive, so the script includes four settings at the top of `Code.gs`:

- `MAX_MB`: the largest file allowed, 10 MB by default.
- `ALLOWED`: allowed file extensions. Remove the ones you don't need.
- `PASSWORD`: empty means anyone with the link can upload. Set a word and share it only with the people who should upload.
- `MAX_UPLOADS_PER_HOUR`: a total cap, so nobody can flood your Drive.

## Step 4: Publish the page

1. **Deploy → New deployment**. Click the gear and choose **Web app**.
2. **Execute as: Me**, **Who has access: Anyone**. "Anyone" is what lets people upload without signing in.
3. Click **Deploy**, approve the permission prompt ("Google hasn't verified this app" → **Advanced → Go to (your project name) → Allow**; it's your own script), and copy the **Web app URL**.

Open the URL, upload a test file, and check that it arrives in the folder and appears in the **Uploads** tab of your sheet.

## Common uses

- **Client documents:** a password-protected link in your email signature.
- **Class assignments:** students without Google accounts submit PDFs, and the log doubles as a submission list.
- **Event photos:** allow `jpg`, `jpeg`, `png` and `heic`, and share the link on a QR code.
- **Job applications:** allow `pdf` and `docx` only, and use the note field for the role.

## FAQ

**Is it really free?** Yes. It runs on your Google account and uses your Drive storage.

**How big can files be?** Keep `MAX_MB` at 30 or below. Larger uploads through an Apps Script web page are unreliable.

**Can I change how the page looks?** Yes. Edit `Page.html`, then **Deploy → Manage deployments → Edit → Version: New version**.

**Who owns the uploaded files?** You do, because the page runs as you.

**How is this safer than an open shared folder?** Uploaders can't see, open or delete anything in the folder, including each other's files. They can only add files, within your limits.

---

[Get the script on GitHub](https://github.com/DecodedXR/drive-upload-form) · [More free Google Sheets scripts](https://decodedxr.github.io/free-google-sheets-scripts/)
{% endraw %}
