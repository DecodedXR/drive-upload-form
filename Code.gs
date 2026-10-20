/** @OnlyCurrentDoc */ // asks Google for access to this spreadsheet only, not all your sheets

/**
 * Drive Upload Form: a public web page where anyone can upload files into a folder in your
 * Google Drive, without a Google account. Each upload is logged as a row in this spreadsheet.
 *
 * Setup (in this spreadsheet's Apps Script editor):
 *   1. Set FOLDER_ID below to the Drive folder that should receive uploads.
 *   2. Deploy → New deployment → Web app → Execute as: Me, Who has access: Anyone → Deploy.
 *   3. Share the web app URL.
 * Guardrails: size cap, allowed file types, optional password, and an hourly limit.
 */

const FOLDER_ID = 'PASTE_YOUR_FOLDER_ID_HERE';
const PAGE_TITLE = 'Upload your files';
const MAX_MB = 10;                    // per file; Apps Script handles up to ~30 MB per upload reliably
const ALLOWED = ['pdf', 'jpg', 'jpeg', 'png', 'heic', 'doc', 'docx', 'xls', 'xlsx', 'csv', 'txt', 'zip'];
const PASSWORD = '';                  // set to require a password, e.g. 'class-2026'
const MAX_UPLOADS_PER_HOUR = 60;      // across everyone, to stop a flood filling your Drive
const LOG_SHEET = 'Uploads';

function doGet() {
  const t = HtmlService.createTemplateFromFile('Page');
  t.config = { title: PAGE_TITLE, maxMb: MAX_MB, allowed: ALLOWED, needsPassword: !!PASSWORD };
  return t.evaluate().setTitle(PAGE_TITLE).addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/** Called from the page for each file. Returns a short message for the uploader. */
function upload(form) {
  const err = checkUpload_(form, { maxMb: MAX_MB, allowed: ALLOWED, password: PASSWORD });
  if (err) throw new Error(err);
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const cache = CacheService.getScriptCache();
    const hour = 'n' + Math.floor(Date.now() / 3600000);
    const n = Number(cache.get(hour) || 0);
    if (n >= MAX_UPLOADS_PER_HOUR) throw new Error('Too many uploads right now. Please try again in an hour.');
    cache.put(hour, String(n + 1), 3700);
  } finally {
    lock.releaseLock();
  }

  const name = safeName_(form.name, form.fileName);
  const blob = Utilities.newBlob(Utilities.base64Decode(form.data), form.mimeType || 'application/octet-stream', name);
  const file = DriveApp.getFolderById(FOLDER_ID).createFile(blob);
  file.setDescription('Uploaded by ' + form.name + (form.email ? ' <' + form.email + '>' : '') + (form.note ? '\n' + form.note : ''));
  log_([new Date(), form.name, form.email, form.note, form.fileName, Math.round(blob.getBytes().length / 1024) + ' KB', file.getUrl()]);
  return 'Uploaded ' + form.fileName + '. Thank you!';
}

/** Validation shared by the server; returns an error message or ''. */
function checkUpload_(form, cfg) {
  if (cfg.password && form.password !== cfg.password) return 'Wrong password.';
  if (!String(form.name || '').trim()) return 'Please enter your name.';
  const ext = String(form.fileName || '').split('.').pop().toLowerCase();
  if (!String(form.fileName || '').includes('.') || !cfg.allowed.includes(ext)) return 'File type not allowed: .' + ext + '. Allowed: ' + cfg.allowed.join(', ') + '.';
  const bytes = Math.floor(String(form.data || '').length * 3 / 4);
  if (!bytes) return 'The file is empty.';
  if (bytes > cfg.maxMb * 1024 * 1024) return 'File is larger than ' + cfg.maxMb + ' MB.';
  return '';
}

/** "Ana Lopez - report.pdf", with characters Drive and email clients dislike removed. */
function safeName_(person, fileName) {
  const clean = s => String(s).replace(/[\\/:*?"<>|\u0000-\u001f]/g, '').trim().slice(0, 80);
  return (clean(person) ? clean(person) + ' - ' : '') + clean(fileName);
}

/** Uploader-typed text must never become a formula (e.g. a name like =IMPORTDATA(...)). */
function asText_(v) {
  return typeof v === 'string' && /^[=+\-@]/.test(v) ? "'" + v : v;
}

function log_(row) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(LOG_SHEET) || ss.insertSheet(LOG_SHEET);
  if (!sheet.getLastRow()) sheet.appendRow(['Time', 'Name', 'Email', 'Note', 'File', 'Size', 'Link']);
  sheet.appendRow(row.map(asText_));
}
