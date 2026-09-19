#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { buildReport, compareParity, paritySnapshot, readGlb } from './museum-asset-lib.mjs';

const args = process.argv.slice(2);
const valueFor = (name) => { const index = args.indexOf(name); return index >= 0 ? args[index + 1] : undefined; };
const assetPath = resolve(valueFor('--asset') || 'public/museum.glb');
const baselinePath = valueFor('--baseline') ? resolve(valueFor('--baseline')) : null;
const writeBaseline = valueFor('--write-baseline') ? resolve(valueFor('--write-baseline')) : null;
const jsonOnly = args.includes('--json');

function fail(message) { if (!jsonOnly) console.error(`VALIDATION FAILED: ${message}`); process.exitCode = 1; }
let asset; let report;
try { asset = readGlb(assetPath); report = buildReport(asset, assetPath); } catch (error) { fail(error.message); process.exit(); }

const failures = [];
if (!report.structural.glbValid || !report.structural.validBounds) failures.push('invalid structural bounds');
if (!report.structural.protectedInteraction) failures.push('protected interaction node resolution is incomplete or ambiguous');
if (!report.structural.protectedCollision) failures.push('protected collision node resolution is incomplete or ambiguous');
if (report.bytes === 0 || report.counts.nodes === 0 || report.counts.images === 0) failures.push('asset is empty');

const snapshot = paritySnapshot(asset);
if (writeBaseline) { mkdirSync(dirname(writeBaseline), { recursive: true }); writeFileSync(writeBaseline, `${JSON.stringify(snapshot, null, 2)}\n`); }
if (baselinePath) {
  try {
    const baseline = JSON.parse(readFileSync(baselinePath, 'utf8'));
    failures.push(...compareParity(baseline, snapshot));
  } catch (error) { failures.push(`could not compare baseline: ${error.message}`); }
}

const output = { ...report, baseline: baselinePath, parityFailures: failures };
if (jsonOnly) console.log(JSON.stringify(output, null, 2));
else {
  console.log(`Museum asset: ${assetPath}`);
  console.log(`SHA-256: ${report.sha256}`);
  console.log(`Bytes: ${report.bytes.toLocaleString()} (${(report.bytes / 1024 / 1024).toFixed(2)} MiB)`);
  console.log(`Structure: ${report.counts.scenes} scene, ${report.counts.nodes} nodes, ${report.counts.meshes} meshes, ${report.counts.primitives} primitives, ${report.counts.triangles.toLocaleString()} triangles`);
  console.log(`Resources: ${report.counts.materials} materials, ${report.counts.textures} textures, ${report.counts.images} images (${Object.entries(report.imageFormats).map(([format, count]) => `${format} ${count}`).join(', ')})`);
  console.log(`Embedded image bytes: ${report.imageBytes.toLocaleString()} (${(report.imageBytes / report.bytes * 100).toFixed(1)}%)`);
  console.log(`Duplicate image groups: ${report.duplicateGroups.length}; theoretically duplicate bytes: ${report.duplicateBytes.toLocaleString()}`);
  console.log(`Protected interactions: ${Object.values(report.protectedInteraction).filter((entries) => entries.length === 1).length}/9`);
  console.log(`Protected collision meshes: ${Object.values(report.protectedCollision).filter((entries) => entries.length === 1).length}/4`);
  console.log(`Compression extensions: ${report.compressionExtensions.length ? report.compressionExtensions.join(', ') : 'none'}`);
  if (baselinePath) console.log(`Parity baseline: ${failures.length ? 'FAILED' : 'passed'} (${baselinePath})`);
  if (writeBaseline) console.log(`Wrote parity baseline: ${writeBaseline}`);
  if (failures.length) console.error(`Failures: ${failures.join('; ')}`); else console.log('Structural and protected-node validation passed.');
}
if (failures.length) process.exitCode = 1;
