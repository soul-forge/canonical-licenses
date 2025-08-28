#!/usr/bin/env node

/**
 * Generate CIDs for canonical license texts
 * Using IPFS hashing algorithm (SHA-256 + CIDv1)
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Simplified CID generation (for demonstration)
// In production, use ipfs-http-client or js-ipfs
function generateCID(content) {
  // Create multihash (simplified version)
  const hash = crypto.createHash('sha256').update(content).digest();
  
  // Create CIDv1 base32 representation (simplified)
  // Real implementation would use proper multiformats library
  const cid = 'bafkrei' + hash.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
    .toLowerCase()
    .substring(0, 52);
  
  return cid;
}

// Process all license files
const licensesDir = path.join(__dirname, 'licenses');
const registry = {};

fs.readdirSync(licensesDir).forEach(file => {
  if (file.endsWith('.txt')) {
    const licenseName = path.basename(file, '.txt');
    const content = fs.readFileSync(path.join(licensesDir, file), 'utf8');
    const cid = generateCID(content);
    
    registry[licenseName] = {
      cid: cid,
      protocol: 'ipfs',
      hash_algorithm: 'sha256',
      size: Buffer.byteLength(content, 'utf8'),
      timestamp: new Date().toISOString()
    };
    
    console.log(`📜 ${licenseName}: ${cid}`);
  }
});

// Save registry
fs.writeFileSync(
  path.join(__dirname, 'LICENSE_REGISTRY.json'),
  JSON.stringify(registry, null, 2)
);

console.log('\n✅ License registry generated!');
console.log('📁 Saved to LICENSE_REGISTRY.json');