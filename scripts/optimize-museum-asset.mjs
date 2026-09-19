#!/usr/bin/env node
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildDeduplicatedGlb, readGlb, sha256 } from './museum-asset-lib.mjs';

const args = process.argv.slice(2);
const valueFor = (name) => { const index = args.indexOf(name); return index >= 0 ? args[index + 1] : undefined; };
const inputPath = resolve(valueFor('--input') || 'public/museum.glb');
const outputValue = valueFor('--output');
if (!outputValue) throw new Error('Usage: node scripts/optimize-museum-asset.mjs --input <asset.glb> --output <candidate.glb> [--expected-sha <sha256>]');
const outputPath = resolve(outputValue);
if (inputPath === outputPath) throw new Error('Refusing to overwrite the input asset; write a candidate first and validate it.');
const input = readGlb(inputPath);
const expectedSha = valueFor('--expected-sha');
const inputSha = sha256(input.bytes);
if (expectedSha && inputSha !== expectedSha.toLowerCase()) throw new Error(`Input SHA-256 mismatch: expected ${expectedSha}, received ${inputSha}`);
const result = buildDeduplicatedGlb(input);
if (!result.changed) throw new Error('No safe duplicate-image cleanup was available; no output was written.');
writeFileSync(outputPath, result.bytes);
console.log(`Input:  ${inputPath}`);
console.log(`Output: ${outputPath}`);
console.log(`Duplicate groups repacked: ${result.groups.length}`);
console.log(`Input bytes:  ${input.bytes.length.toLocaleString()}`);
console.log(`Output bytes: ${result.bytes.length.toLocaleString()}`);
console.log(`Bytes saved:  ${(input.bytes.length - result.bytes.length).toLocaleString()}`);
console.log(`Output SHA-256: ${sha256(result.bytes)}`);
