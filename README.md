# Free Drive Upload Form (no Google account needed)

![Free Drive Upload Form](assets/cover.png)

A simple public upload page that drops files straight into a folder in **your** Google Drive. People uploading **don't need a Google account**, unlike Google Forms' file-upload question, which requires sign-in. Each upload is logged in a spreadsheet with the uploader's name, email, note and a link to the file. Free, no add-on, two small files.

- Name, optional email and note, multiple files at once
- **Guardrails** against abuse: a size limit, an allowed-file-types list, an optional password, and a cap on uploads per hour
- Files are named `Uploader Name - file.pdf`, and the uploader's details are saved in the file's description

New to this? Read the [step-by-step guide](https://decodedxr.github.io/drive-upload-form/upload-files-to-google-drive-without-sign-in.html).

## Setup (10 minutes)

1. Make a Google Drive folder for uploads, open it, and copy the folder ID from the address bar (the part after `/folders/`).
2. Create a Google Sheet for the upload log. **Extensions → Apps Script**.
3. Replace `Code.gs` with this repo's `Code.gs`. Click **+ → HTML** and create a file named exactly `Page`, then paste in `Page.html`.
4. At the top of `Code.gs`, set `FOLDER_ID`. Optionally change `PAGE_TITLE`, `MAX_MB`, `ALLOWED` and `PASSWORD`.
5. **Deploy → New deployment → Select type: Web app**, then set **Execute as: Me** and **Who has access: Anyone**, and click **Deploy**. Approve the permission prompt ("Google hasn't verified this app" → **Advanced → Go to (your project name) → Allow**; it's your own script).
6. Copy the **Web app URL** and share it. That's the upload page.

After editing the code, use **Deploy → Manage deployments → Edit → Version: New version** so the live page picks up the change.

## Settings

| Setting | Default | What it does |
|---|---|---|
| `MAX_MB` | 10 | Largest file allowed. Keep it under ~30 MB; browser uploads through Apps Script get unreliable above that |
| `ALLOWED` | common documents, images, zip | Allowed file extensions |
| `PASSWORD` | off | Set one to keep strangers out, and share it with the people who should upload |
| `MAX_UPLOADS_PER_HOUR` | 60 | A total cap across everyone, so a flood can't fill your Drive |

## Things to know

- Anyone with the link can use the page. Use `PASSWORD` if the link might travel.
- Uploads are saved as **you**: they count against your Drive storage, and you own them.
- The uploader's name and note are stored as plain text; anything that looks like a formula is escaped.
- Page text is in `Page.html` if you want to change the wording or colors.

## More free Google tools

- [All free Google Sheets scripts](https://github.com/DecodedXR/free-google-sheets-scripts): mail merge, PDF merge, reminders, Sheets to Calendar, CSV import, Forms tools, dropdowns.

## License

MIT. See `LICENSE`.
