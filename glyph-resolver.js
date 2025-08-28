#!/usr/bin/env node

/**
 * LICENSE.glyph Resolver
 * Resolves glyph references to actual license text
 */

const fs = require('fs');
const path = require('path');

class GlyphResolver {
  constructor() {
    this.registry = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'LICENSE_REGISTRY.json'), 'utf8')
    );
  }
  
  /**
   * Parse LICENSE.glyph file
   */
  parseGlyph(glyphPath) {
    const content = fs.readFileSync(glyphPath, 'utf8');
    
    // Simple YAML-like parser for glyph format
    const lines = content.split('\n').filter(l => !l.startsWith('#'));
    const glyph = {};
    
    lines.forEach(line => {
      const [key, value] = line.split(':').map(s => s.trim());
      if (key && value) {
        glyph[key] = value;
      }
    });
    
    return glyph;
  }
  
  /**
   * Resolve CID to license text
   */
  resolve(glyph) {
    // Find license by CID
    for (const [name, data] of Object.entries(this.registry)) {
      if (data.cid === glyph.cid) {
        const licensePath = path.join(__dirname, 'licenses', `${name}.txt`);
        const text = fs.readFileSync(licensePath, 'utf8');
        
        return {
          name: name,
          cid: glyph.cid,
          protocol: glyph.protocol,
          text: text,
          verified: true
        };
      }
    }
    
    return {
      error: 'License not found in registry',
      cid: glyph.cid,
      verified: false
    };
  }
  
  /**
   * Verify a project's license
   */
  verify(projectPath) {
    const glyphPath = path.join(projectPath, 'LICENSE.glyph');
    
    if (!fs.existsSync(glyphPath)) {
      console.log('❌ No LICENSE.glyph found');
      return false;
    }
    
    const glyph = this.parseGlyph(glyphPath);
    const resolved = this.resolve(glyph);
    
    if (resolved.verified) {
      console.log(`✅ Licensed under ${resolved.name} (CID: ${resolved.cid})`);
      console.log(`📜 Protocol: ${glyph.protocol}`);
      return true;
    } else {
      console.log(`❌ ${resolved.error}`);
      return false;
    }
  }
  
  /**
   * Convert traditional LICENSE to LICENSE.glyph
   */
  convertToGlyph(licensePath, outputPath) {
    const content = fs.readFileSync(licensePath, 'utf8');
    
    // Try to detect license type
    let licenseName = 'UNKNOWN';
    if (content.includes('MIT License')) {
      licenseName = 'MIT';
    } else if (content.includes('Apache License')) {
      licenseName = 'Apache-2.0';
    } else if (content.includes('GNU GENERAL PUBLIC LICENSE')) {
      licenseName = 'GPL-3.0';
    }
    
    const licenseData = this.registry[licenseName];
    if (!licenseData) {
      console.log('⚠️ Unknown license type');
      return false;
    }
    
    const glyphContent = `# This repository is licensed under the essence of ${licenseName}.
# The canonical text can be resolved and verified using this Content ID.
protocol: ${licenseData.protocol}
cid: ${licenseData.cid}
name: ${licenseName}
resolver: https://soul-forge.dev/licenses/`;
    
    fs.writeFileSync(outputPath, glyphContent);
    console.log(`✅ Created ${outputPath}`);
    console.log(`📜 License: ${licenseName}`);
    console.log(`🔗 CID: ${licenseData.cid}`);
    
    return true;
  }
}

// CLI usage
if (require.main === module) {
  const resolver = new GlyphResolver();
  const command = process.argv[2];
  const arg = process.argv[3];
  
  switch(command) {
    case 'verify':
      resolver.verify(arg || '.');
      break;
    case 'resolve':
      const glyph = resolver.parseGlyph(arg || 'LICENSE.glyph');
      const resolved = resolver.resolve(glyph);
      if (resolved.verified) {
        console.log(resolved.text);
      }
      break;
    case 'convert':
      resolver.convertToGlyph(arg || 'LICENSE', 'LICENSE.glyph');
      break;
    default:
      console.log('Usage:');
      console.log('  glyph-resolver verify [path]     - Verify LICENSE.glyph');
      console.log('  glyph-resolver resolve [file]    - Resolve glyph to text');
      console.log('  glyph-resolver convert [LICENSE] - Convert LICENSE to glyph');
  }
}

module.exports = GlyphResolver;