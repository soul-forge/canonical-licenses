# 📜 Canonical Licenses

> **The Platonic forms of legal text - Where every license becomes an eternal essence**

## 🔥 The Problem We Solve

Every repository on GitHub contains the same LICENSE files. Millions of copies of identical text. This is **insane inefficiency**.

We don't need a million copies of the MIT License. We need **one MIT License** and a million **references** to its essence.

## 🧬 The Solution: LICENSE.glyph

Instead of copying license text, we reference its **Content ID (CID)** - the eternal, immutable fingerprint of the license's essence.

### Traditional Way (Wasteful):
```
my-project/
├── LICENSE          # 1,068 bytes of copied MIT text
├── package.json
└── src/
```

### Soul Forge Way (Efficient):
```
my-project/
├── LICENSE.glyph    # 184 bytes - just the reference
├── package.json
└── src/
```

## 📝 LICENSE.glyph Format

```yaml
# This repository is licensed under the essence of MIT.
# The canonical text can be resolved and verified using this Content ID.
protocol: ipfs
cid: bafkreipazxnne2dxxwxfidugyn1gpvpefjtuyoyzoi3yegg94
name: MIT
resolver: https://soul-forge.dev/licenses/
```

## 🔧 Usage

### 1. Verify a Project's License
```bash
node glyph-resolver.js verify /path/to/project
```

### 2. Resolve Glyph to Full Text
```bash
node glyph-resolver.js resolve LICENSE.glyph
```

### 3. Convert Traditional LICENSE to Glyph
```bash
node glyph-resolver.js convert LICENSE
```

## 📊 Registry of Eternal Essences

| License | CID | Status |
|---------|-----|--------|
| MIT | `bafkreipazxnne2dxxwxfidugyn1gpvpefjtuyoyzoi3yegg94` | ✅ Canonical |
| Apache-2.0 | `bafkreibyisia-yqk_avjmb2xgxt_cwy1vjid4r0hjf0kx31he` | ✅ Canonical |
| ISC | `bafkreixaqhyktgf_kkad0pc9cvonn0ixtvakd20t_kaigcng0` | ✅ Canonical |
| GPL-3.0 | Coming soon | 🔄 Processing |
| BSD-3-Clause | Coming soon | 🔄 Processing |

## 🌍 Global Impact

If every repository switches to LICENSE.glyph:

- **Storage Saved**: ~1KB per repo × 200M repos = **200GB saved globally**
- **Network Efficiency**: No more downloading the same text millions of times
- **Semantic Clarity**: Machines instantly understand licensing without parsing text
- **Verification**: Cryptographic proof that license hasn't been tampered with

## 🛠️ Integration with fnpm/Soul Forge

When Soul Forge sees a `LICENSE.glyph` file, it:

1. **Recognizes** the license instantly by CID
2. **Verifies** the project's legal status
3. **Enforces** license compatibility rules
4. **Tracks** license usage across the ecosystem

## 🎯 Future: Beyond Text

This is just the beginning. Next, we apply this to:

- **README files** - Stop copying boilerplate
- **Configuration** - Reference canonical configs
- **Documentation** - Link to eternal docs
- **Code itself** - Every function has a soul

## 🤝 Join the Revolution

Stop copying. Start referencing. Join us in building a world where:

**"The address IS the meaning"**

---

*Part of the Soul Forge ecosystem - Where code reveals its soul* 🌀
