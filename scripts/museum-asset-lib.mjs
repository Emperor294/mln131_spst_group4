import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

export const PROTECTED_INTERACTION_NAMES = [
  'bacho', 'aonau', 'tuyenngon', 'aodai', 'anh3', 'Cone', 'anh1', 'anh2', 'CoffeeTable',
];
export const PROTECTED_COLLISION_NAMES = [
  'Plane042_Material_0', 'Plane057_Material_0', 'Plane058_Material_0', 'Plane059_Material_0',
];
export const LEGACY_ROOTS = [
  ...PROTECTED_INTERACTION_NAMES,
  'aotim', 'vietnam_flag.glb', 'braised_meat.glb', 'banh_chung.glb', 'banh_mi.glb',
  'coffee.glb', 'rice.glb', 'vegetables.glb', 'fruit.glb',
];

const EPSILON = 1e-5;
const align4 = (value) => (value + 3) & ~3;
const identity = () => [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

export function sha256(bytes) { return createHash('sha256').update(bytes).digest('hex'); }
export function readGlb(filename) {
  const bytes = readFileSync(filename);
  if (bytes.length < 20 || bytes.readUInt32LE(0) !== 0x46546c67 || bytes.readUInt32LE(4) !== 2) {
    throw new Error('Not a valid glTF 2.0 binary asset');
  }
  const declaredLength = bytes.readUInt32LE(8);
  if (declaredLength !== bytes.length) throw new Error(`GLB length mismatch (${declaredLength} != ${bytes.length})`);
  let offset = 12; let json; let binary;
  while (offset < bytes.length) {
    const length = bytes.readUInt32LE(offset); const type = bytes.readUInt32LE(offset + 4);
    const chunk = bytes.subarray(offset + 8, offset + 8 + length); offset += 8 + length;
    if (type === 0x4e4f534a) json = JSON.parse(new TextDecoder().decode(chunk).replace(/\s+$/, ''));
    if (type === 0x004e4942) binary = chunk;
  }
  if (!json || !binary) throw new Error('GLB must contain JSON and BIN chunks');
  return { bytes, json, binary, declaredLength };
}

function matMul(a, b) {
  const out = new Array(16).fill(0);
  for (let c = 0; c < 4; c += 1) for (let r = 0; r < 4; r += 1)
    out[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
  return out;
}
function nodeMatrix(node) {
  if (node.matrix) return [...node.matrix];
  const [x, y, z, w] = node.rotation || [0, 0, 0, 1];
  const [sx, sy, sz] = node.scale || [1, 1, 1];
  const [tx, ty, tz] = node.translation || [0, 0, 0];
  const xx = x * x; const yy = y * y; const zz = z * z; const xy = x * y; const xz = x * z; const yz = y * z; const wx = w * x; const wy = w * y; const wz = w * z;
  return [
    (1 - 2 * (yy + zz)) * sx, (2 * (xy + wz)) * sx, (2 * (xz - wy)) * sx, 0,
    (2 * (xy - wz)) * sy, (1 - 2 * (xx + zz)) * sy, (2 * (yz + wx)) * sy, 0,
    (2 * (xz + wy)) * sz, (2 * (yz - wx)) * sz, (1 - 2 * (xx + yy)) * sz, 0,
    tx, ty, tz, 1,
  ];
}
function transformPoint(m, p) { return [m[0] * p[0] + m[4] * p[1] + m[8] * p[2] + m[12], m[1] * p[0] + m[5] * p[1] + m[9] * p[2] + m[13], m[2] * p[0] + m[6] * p[1] + m[10] * p[2] + m[14]]; }
function transformBounds(m, bounds) {
  if (!bounds) return null;
  const points = [];
  for (const x of [bounds[0][0], bounds[1][0]]) for (const y of [bounds[0][1], bounds[1][1]]) for (const z of [bounds[0][2], bounds[1][2]]) points.push(transformPoint(m, [x, y, z]));
  return unionBounds(points);
}
export function unionBounds(bounds) {
  const points = bounds.flatMap((value) => value && value.length === 2 && Array.isArray(value[0]) ? [value[0], value[1]] : [value]).filter(Boolean);
  if (!points.length) return null;
  const min = [Infinity, Infinity, Infinity]; const max = [-Infinity, -Infinity, -Infinity];
  for (const point of points) for (let i = 0; i < 3; i += 1) { min[i] = Math.min(min[i], point[i]); max[i] = Math.max(max[i], point[i]); }
  return [min, max];
}
function accessorValues(asset, accessorIndex) {
  const accessor = asset.json.accessors?.[accessorIndex];
  if (!accessor) return [];
  if (accessor.min && accessor.max) return [accessor.min.slice(0, 3), accessor.max.slice(0, 3)];
  const view = asset.json.bufferViews?.[accessor.bufferView]; if (!view) return [];
  const componentBytes = [1, 1, 2, 2, 4, 4, 4][accessor.componentType === 5120 ? 0 : accessor.componentType === 5121 ? 1 : accessor.componentType === 5122 ? 2 : accessor.componentType === 5123 ? 3 : accessor.componentType === 5125 ? 4 : accessor.componentType === 5126 ? 5 : 0] || 4;
  const components = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 }[accessor.type] || 3;
  const stride = view.byteStride || componentBytes * components; const start = (view.byteOffset || 0) + (accessor.byteOffset || 0);
  const values = []; const count = accessor.count || 0;
  const read = (offset) => { if (accessor.componentType === 5126) return asset.binary.readFloat32LE(offset); if (accessor.componentType === 5125) return asset.binary.readUInt32LE(offset); if (accessor.componentType === 5123) return asset.binary.readUInt16LE(offset); if (accessor.componentType === 5121) return asset.binary.readUInt8(offset); if (accessor.componentType === 5122) return asset.binary.readInt16LE(offset); return asset.binary.readInt8(offset); };
  for (let n = 0; n < count; n += 1) values.push(Array.from({ length: Math.min(3, components) }, (_, c) => read(start + n * stride + c * componentBytes)));
  return unionBounds(values);
}
function primitiveBounds(asset, primitive) { const position = primitive.attributes?.POSITION; return position === undefined ? null : accessorValues(asset, position); }
function meshTriangles(asset, mesh) { return (mesh.primitives || []).reduce((sum, primitive) => { const accessor = asset.json.accessors?.[primitive.indices]; if (accessor) return sum + (accessor.count || 0) / 3; const pos = asset.json.accessors?.[primitive.attributes?.POSITION]; return sum + (pos?.count || 0) / 3; }, 0); }

function buildNodes(asset) {
  const nodes = asset.json.nodes || []; const children = new Map(); const parents = new Map();
  nodes.forEach((node, index) => (node.children || []).forEach((child) => { children.set(index, node.children || []); parents.set(child, index); }));
  const roots = (asset.json.scenes?.[asset.json.scene || 0]?.nodes || []);
  const world = new Map(); const visit = (index, parent) => { const matrix = matMul(parent, nodeMatrix(nodes[index])); world.set(index, matrix); (nodes[index].children || []).forEach((child) => visit(child, matrix)); }; roots.forEach((index) => visit(index, identity()));
  const paths = new Map(); const pathVisit = (index, path) => { paths.set(index, `${path}/${nodes[index].name || `node-${index}`}`); (nodes[index].children || []).forEach((child) => pathVisit(child, paths.get(index))); }; roots.forEach((index) => pathVisit(index, ''));
  return { nodes, children, parents, roots, world, paths };
}
function nodeBounds(asset, info, index, cache = new Map()) {
  if (cache.has(index)) return cache.get(index);
  const node = info.nodes[index]; const bounds = [];
  if (node.mesh !== undefined) for (const primitive of asset.json.meshes?.[node.mesh]?.primitives || []) bounds.push(transformBounds(info.world.get(index), primitiveBounds(asset, primitive)));
  for (const child of node.children || []) bounds.push(nodeBounds(asset, info, child, cache));
  const result = unionBounds(bounds); cache.set(index, result); return result;
}
function nodeSubtree(index, info) { const result = [index]; for (const child of info.nodes[index].children || []) result.push(...nodeSubtree(child, info)); return result; }

export function createNodeInventory(asset) {
  const info = buildNodes(asset); const cache = new Map(); const byName = new Map();
  const entries = info.nodes.map((node, index) => { const entry = { index, name: node.name || `node-${index}`, path: info.paths.get(index) || `unreachable/node-${index}`, mesh: node.mesh, localMatrix: nodeMatrix(node), worldMatrix: info.world.get(index) || identity(), translation: node.translation || [0, 0, 0], rotation: node.rotation || [0, 0, 0, 1], scale: node.scale || [1, 1, 1], bounds: nodeBounds(asset, info, index, cache), triangleCount: node.mesh === undefined ? 0 : meshTriangles(asset, asset.json.meshes[node.mesh]), subtreeIndices: nodeSubtree(index, info) }; if (!byName.has(entry.name)) byName.set(entry.name, []); byName.get(entry.name).push(entry); return entry; });
  return { ...info, entries, byName };
}
function imageBytes(asset, image) { if (image.bufferView === undefined) return new Uint8Array(); const view = asset.json.bufferViews?.[image.bufferView]; return view ? asset.binary.subarray(view.byteOffset || 0, (view.byteOffset || 0) + view.byteLength) : new Uint8Array(); }
function detectImageShape(bytes, mimeType) {
  if (mimeType === 'image/png' && bytes.length >= 26) return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20), colorType: bytes[25], alpha: [4, 6].includes(bytes[25]) ? 'present' : 'absent' };
  if (mimeType === 'image/jpeg') {
    let offset = 2;
    while (offset + 9 < bytes.length) {
      if (bytes[offset] !== 0xff) { offset += 1; continue; }
      const marker = bytes[offset + 1]; const length = bytes.readUInt16BE(offset + 2);
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) return { width: bytes.readUInt16BE(offset + 7), height: bytes.readUInt16BE(offset + 5), colorType: null, alpha: 'absent' };
      offset += 2 + length;
    }
  }
  return { width: null, height: null, colorType: null, alpha: 'unknown' };
}
function imageMeta(asset, index) { const image = asset.json.images?.[index] || {}; const bytes = imageBytes(asset, image); const mimeType = image.mimeType || (bytes[0] === 0x89 ? 'image/png' : bytes[0] === 0xff ? 'image/jpeg' : 'unknown'); const shape = detectImageShape(bytes, mimeType); return { index, width: image.width || shape.width, height: image.height || shape.height, colorType: shape.colorType, alpha: shape.alpha, mimeType, bytes: bytes.length, hash: sha256(bytes) }; }
function materialTextureIndices(asset, material) { const out = []; for (const value of Object.values(material || {})) if (value && typeof value === 'object') { if (Number.isInteger(value.index)) out.push(value.index); for (const nested of Object.values(value)) if (nested && Number.isInteger(nested.index)) out.push(nested.index); } return [...new Set(out)]; }
export function createResourceMap(asset, inventory) {
  const images = (asset.json.images || []).map((_, index) => imageMeta(asset, index)); const textures = (asset.json.textures || []).map((texture, index) => ({ index, image: texture.source, sampler: texture.sampler, texCoord: texture.texCoord }));
  const materials = (asset.json.materials || []).map((material, index) => ({ index, name: material.name || `material-${index}`, images: materialTextureIndices(asset, material).map((textureIndex) => textures[textureIndex]?.image).filter(Number.isInteger) }));
  const imageOwners = images.map((image) => ({ ...image, textures: textures.filter((texture) => texture.image === image.index).map((texture) => texture.index), materials: materials.filter((material) => material.images.includes(image.index)).map((material) => material.index), primitives: [], nodes: [] }));
  (asset.json.meshes || []).forEach((mesh, meshIndex) => (mesh.primitives || []).forEach((primitive, primitiveIndex) => { const material = materials[primitive.material]; if (!material) return; for (const imageIndex of material.images) { const owner = imageOwners[imageIndex]; if (owner) { owner.primitives.push({ mesh: meshIndex, primitive: primitiveIndex }); for (const entry of inventory.entries.filter((candidate) => candidate.mesh === meshIndex)) owner.nodes.push(entry.name); } } }));
  return { images, textures, materials, imageOwners };
}
function protectedEntries(inventory, names) { return Object.fromEntries(names.map((name) => [name, inventory.byName.get(name) || []])); }
function formatCounts(asset) { const primitiveCount = (asset.json.meshes || []).reduce((sum, mesh) => sum + (mesh.primitives || []).length, 0); const triangles = (asset.json.meshes || []).reduce((sum, mesh) => sum + meshTriangles(asset, mesh), 0); return { scenes: asset.json.scenes?.length || 0, nodes: asset.json.nodes?.length || 0, meshes: asset.json.meshes?.length || 0, primitives: primitiveCount, triangles: Math.round(triangles), materials: asset.json.materials?.length || 0, textures: asset.json.textures?.length || 0, images: asset.json.images?.length || 0, cameras: asset.json.cameras?.length || 0, animations: asset.json.animations?.length || 0, skins: asset.json.skins?.length || 0, lights: asset.json.extensions?.KHR_lights_punctual?.lights?.length || 0 }; }
function boundsForEntries(entries) { return unionBounds(entries.map((entry) => entry.bounds)); }
function imageDuplicates(images) { const groups = new Map(); images.forEach((image) => { const key = `${image.hash}:${image.mimeType}:${image.width}x${image.height}:${image.bytes}`; if (!groups.has(key)) groups.set(key, []); groups.get(key).push(image); }); return [...groups.values()].filter((group) => group.length > 1).map((group) => ({ imageIndices: group.map((image) => image.index), bytesEach: group[0].bytes, duplicateBytes: group[0].bytes * (group.length - 1), hash: group[0].hash })); }
export function buildReport(asset, filename = null) {
  const inventory = createNodeInventory(asset); const resources = createResourceMap(asset, inventory); const counts = formatCounts(asset); const duplicateGroups = imageDuplicates(resources.images); const allBounds = boundsForEntries(inventory.entries); const collisionEntries = PROTECTED_COLLISION_NAMES.flatMap((name) => inventory.byName.get(name) || []); const interaction = protectedEntries(inventory, PROTECTED_INTERACTION_NAMES); const collision = protectedEntries(inventory, PROTECTED_COLLISION_NAMES);
  const meshes = (asset.json.meshes || []).map((mesh, index) => ({ index, name: mesh.name || `mesh-${index}`, triangles: Math.round(meshTriangles(asset, mesh)), primitives: mesh.primitives?.length || 0 })).sort((a, b) => b.triangles - a.triangles);
  const materials = (asset.json.materials || []).map((material, index) => ({ index, name: material.name || `material-${index}`, alphaMode: material.alphaMode || 'OPAQUE', doubleSided: Boolean(material.doubleSided), emissive: material.emissiveFactor || [0, 0, 0] }));
  const legacyCosts = Object.fromEntries(LEGACY_ROOTS.map((name) => { const entries = inventory.byName.get(name) || []; const nodeIndices = new Set(entries.flatMap((entry) => entry.subtreeIndices)); const meshIndices = new Set([...nodeIndices].map((index) => asset.json.nodes[index]?.mesh).filter(Number.isInteger)); const imageIndices = new Set(); for (const meshIndex of meshIndices) for (const primitive of asset.json.meshes?.[meshIndex]?.primitives || []) for (const imageIndex of resources.materials[primitive.material]?.images || []) imageIndices.add(imageIndex); return [name, { resolved: entries.length, triangles: Math.round([...meshIndices].reduce((sum, index) => sum + meshTriangles(asset, asset.json.meshes[index]), 0)), meshes: [...meshIndices], uniqueImageBytes: [...imageIndices].reduce((sum, index) => sum + (resources.images[index]?.bytes || 0), 0), bounds: boundsForEntries(entries) }]; }));
  return { file: filename, sha256: sha256(asset.bytes), bytes: asset.bytes.length, counts, extensionsUsed: asset.json.extensionsUsed || [], extensionsRequired: asset.json.extensionsRequired || [], compressionExtensions: (asset.json.extensionsUsed || []).filter((extension) => /draco|meshopt|basis|ktx/i.test(extension)), imageFormats: resources.images.reduce((out, image) => { out[image.mimeType] = (out[image.mimeType] || 0) + 1; return out; }, {}), imageBytes: resources.images.reduce((sum, image) => sum + image.bytes, 0), duplicateGroups, duplicateBytes: duplicateGroups.reduce((sum, group) => sum + group.duplicateBytes, 0), images: resources.images, imageOwners: resources.imageOwners, materials, topMeshes: meshes.slice(0, 15), wholeBounds: allBounds, collisionBounds: boundsForEntries(collisionEntries), protectedInteraction: interaction, protectedCollision: collision, legacyCosts, structural: structuralChecks(asset, inventory) };
}
export function structuralChecks(asset, inventory = createNodeInventory(asset)) { const duplicateNames = [...inventory.byName.entries()].filter(([, entries]) => entries.length > 1).map(([name, entries]) => ({ name, count: entries.length })); const protectedInteraction = PROTECTED_INTERACTION_NAMES.every((name) => inventory.byName.get(name)?.length === 1); const protectedCollision = PROTECTED_COLLISION_NAMES.every((name) => inventory.byName.get(name)?.length === 1); const validBounds = inventory.entries.every((entry) => !entry.bounds || entry.bounds.flat().every(Number.isFinite)); return { glbValid: true, protectedInteraction, protectedCollision, duplicateNames, validBounds, bufferByteLength: asset.binary.length }; }
export function paritySnapshot(asset) { const inventory = createNodeInventory(asset); const pick = (names) => Object.fromEntries(names.map((name) => { const entries = inventory.byName.get(name) || []; return [name, entries.map((entry) => ({ index: entry.index, localMatrix: entry.localMatrix, worldMatrix: entry.worldMatrix, bounds: entry.bounds }))]; })); return { sha256: sha256(asset.bytes), bytes: asset.bytes.length, wholeBounds: boundsForEntries(inventory.entries), collisionBounds: boundsForEntries(PROTECTED_COLLISION_NAMES.flatMap((name) => inventory.byName.get(name) || [])), protectedInteraction: pick(PROTECTED_INTERACTION_NAMES), protectedCollision: pick(PROTECTED_COLLISION_NAMES) }; }
function close(a, b, epsilon = EPSILON) { if (!a || !b || a.length !== b.length) return false; return a.every((value, index) => Math.abs(value - b[index]) <= epsilon); }
function closeBounds(a, b, epsilon = EPSILON) { return (!a && !b) || Boolean(a && b && close(a[0].flat(), b[0].flat(), epsilon) && close(a[1].flat(), b[1].flat(), epsilon)); }
export function compareParity(before, after, epsilon = EPSILON) { const failures = []; if (!closeBounds(before.wholeBounds, after.wholeBounds, epsilon)) failures.push('whole-scene bounds changed'); if (!closeBounds(before.collisionBounds, after.collisionBounds, epsilon)) failures.push('collision bounds changed'); for (const group of ['protectedInteraction', 'protectedCollision']) for (const [name, beforeEntries] of Object.entries(before[group])) { const afterEntries = after[group][name] || []; if (beforeEntries.length !== afterEntries.length) failures.push(`${name} resolution changed`); beforeEntries.forEach((entry, index) => { const candidate = afterEntries[index]; if (!candidate || !close(entry.localMatrix, candidate.localMatrix, epsilon) || !close(entry.worldMatrix, candidate.worldMatrix, epsilon) || !closeBounds(entry.bounds, candidate.bounds, epsilon)) failures.push(`${name} transform/bounds changed`); }); } return failures; }

function glbBytes(json, binary) { const jsonBytes = new TextEncoder().encode(JSON.stringify(json)); const paddedJson = new Uint8Array(align4(jsonBytes.length)); paddedJson.set(jsonBytes); paddedJson.fill(0x20, jsonBytes.length); const paddedBin = new Uint8Array(align4(binary.length)); paddedBin.set(binary); const output = new Uint8Array(12 + 8 + paddedJson.length + 8 + paddedBin.length); const view = new DataView(output.buffer); view.setUint32(0, 0x46546c67, true); view.setUint32(4, 2, true); view.setUint32(8, output.length, true); let offset = 12; view.setUint32(offset, paddedJson.length, true); view.setUint32(offset + 4, 0x4e4f534a, true); output.set(paddedJson, offset + 8); offset += 8 + paddedJson.length; view.setUint32(offset, paddedBin.length, true); view.setUint32(offset + 4, 0x004e4942, true); output.set(paddedBin, offset + 8); return output; }
export function buildDeduplicatedGlb(asset) {
  const images = (asset.json.images || []).map((_, index) => imageMeta(asset, index));
  const groups = imageDuplicates(images);
  const duplicateViews = new Map();
  for (const group of groups) {
    const canonical = asset.json.images[group.imageIndices[0]]?.bufferView;
    if (canonical === undefined) continue;
    for (const index of group.imageIndices.slice(1)) {
      const view = asset.json.images[index]?.bufferView;
      if (view !== undefined && view !== canonical) duplicateViews.set(view, canonical);
    }
  }
  const json = JSON.parse(JSON.stringify(asset.json));
  const chunks = [];
  const offsets = new Map();
  let length = 0;
  for (let index = 0; index < (asset.json.bufferViews || []).length; index += 1) {
    if (duplicateViews.has(index)) continue;
    const view = asset.json.bufferViews[index];
    const start = view.byteOffset || 0;
    const payload = asset.binary.subarray(start, start + view.byteLength);
    length = align4(length);
    chunks.push({ offset: length, payload });
    offsets.set(index, length);
    length += payload.length;
  }
  for (const [duplicate, canonical] of duplicateViews) offsets.set(duplicate, offsets.get(canonical));
  const binary = new Uint8Array(align4(length));
  for (const chunk of chunks) binary.set(chunk.payload, chunk.offset);
  json.bufferViews = (json.bufferViews || []).map((view, index) => ({ ...view, byteOffset: offsets.get(index) }));
  if (json.buffers?.[0]) json.buffers[0].byteLength = binary.length;
  const bytes = glbBytes(json, binary);
  const savedBytes = asset.bytes.length - bytes.length;
  return { bytes, json, binary, groups: groups.filter((group) => group.imageIndices.some((index) => duplicateViews.has(asset.json.images[index]?.bufferView))), savedBytes, changed: savedBytes > 0 };
}
