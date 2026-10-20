// Self-check for upload validation and file naming: node test.js
const vm = require('vm'), fs = require('fs'), assert = require('assert');
const ctx = {}; vm.runInNewContext(fs.readFileSync(__dirname + '/Code.gs', 'utf8'), ctx);
const cfg = { maxMb: 1, allowed: ['pdf', 'png'], password: '' };
const ok = { name: 'Ana', fileName: 'a.PDF', data: 'AAAA' };
assert.equal(ctx.checkUpload_(ok, cfg), '');
assert.match(ctx.checkUpload_({ ...ok, name: ' ' }, cfg), /name/);
assert.match(ctx.checkUpload_({ ...ok, fileName: 'x.exe' }, cfg), /not allowed: \.exe/);
assert.match(ctx.checkUpload_({ ...ok, fileName: 'pdf' }, cfg), /not allowed/);           // no extension
assert.match(ctx.checkUpload_({ ...ok, data: '' }, cfg), /empty/);
assert.match(ctx.checkUpload_({ ...ok, data: 'A'.repeat(1.5 * 1024 * 1024) }, cfg), /larger than 1 MB/);
assert.match(ctx.checkUpload_(ok, { ...cfg, password: 'pw' }), /password/i);
assert.equal(ctx.checkUpload_({ ...ok, password: 'pw' }, { ...cfg, password: 'pw' }), '');
assert.equal(ctx.safeName_('Ana / Lopez', 're:port?.pdf'), 'Ana  Lopez - report.pdf');
assert.equal(ctx.safeName_('', 'a.pdf'), 'a.pdf');
console.log('ok');
assert.equal(ctx.asText_('=IMPORTDATA("x")'), "'=IMPORTDATA(\"x\")");
assert.equal(ctx.asText_('-1'), "'-1");
assert.equal(ctx.asText_('Ana'), 'Ana');
assert.equal(ctx.asText_(5), 5);
console.log('ok formula-escape');
