'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('every inline index script parses as JavaScript', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const inlineScripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
    .map(match => match[1])
    .filter(source => source.trim());

  assert.ok(inlineScripts.length > 0);
  inlineScripts.forEach(source => assert.doesNotThrow(() => new Function(source)));
});

test('mission dashboard assets load before the main inline application', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const recordsIndex = html.indexOf('js/mission-records.js');
  const dashboardIndex = html.indexOf('js/mission-dashboard.js');
  const appIndex = html.indexOf('const APP_VERSION =');
  assert.ok(recordsIndex > 0);
  assert.ok(dashboardIndex > recordsIndex);
  assert.ok(appIndex > dashboardIndex);
  assert.match(html, /css\/mission-dashboard\.css/);
});
