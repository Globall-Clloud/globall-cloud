# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are
currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 5.1.x   | :white_check_mark: |
| 5.0.x   | :x:                |
| 4.0.x   | :white_check_mark: |
| < 4.0   | :x:                |

## Reporting a Vulnerability

Use this section to tell people how to report a vulnerability.

Tell them where to go, how often they can expect to get an update on a
reported vulnerability, what to expect if the vulnerability is accepted or
declined, etc.
# سیاسەتی ئاسایش Global Cloud

## ڤێرژنەکانی پشتگیری‌شراو

| ڤێرژن | حالەت | پایانی پشتگیری |
|--------|--------|-----------------|
| 2.x.x | ✅ فراوان | 2026-12-31 |
| 1.9.x | ⚠️ محدود | 2025-12-31 |
| 1.8.x | ❌ پایان | 2025-06-30 |
| < 1.8 | ❌ پایان | - |

## خطرەکانی ئاسایش درنجام

### Firebase & Firestore
- **Rules Validation:** تەمام read/write rules پاسڕاسگری دەکرێن
- **Auth Bypass:** Firebase Authentication bypass دەبڵۆکرێت
- **Data Exposure:** shipment data نهێنی پێکراوە

### PWA & Service Worker
- **Cache Poisoning:** offline cache تێپۆلکراو
- **XSS Injection:** localStorage sanitization
- **CORS Violations:** API endpoint validation

### Multilingual RTL/LTR
- **Script Injection:** RTL override attacks
- **Encoding Bypass:** UTF-8 validation

## رێپۆرتکردنی خطری ئاسایش

**هیچ issue علنی نابێ!**

### Step 1: رێپۆرت بکە

### Step 2: تفسیل بدە

### Step 3: سەبمیت بکە
- GitHub Security Advisory (private)
- یاخود direct email

## چەپەل و زمان‌سازی

| Severity | Response Time | Patch Time |
|----------|---------------|------------|
| Critical | 4 hours | 24 hours |
| High | 24 hours | 7 days |
| Medium | 2 days | 14 days |
| Low | 1 week | 30 days |

## سیاسەتی دیسکلۆژەری

1. **Private Disclosure:** رێپۆرتکەر + Team Security (7 days)
2. **Patch Release:** ڤێرژنی نوێ دەربازکراو
3. **Public Disclosure:** نوێنۆی علنی + credits

## مەنیعت‌کردن‌های ئاسایش

### Firebase Firestore Rules

### Authentication

### Data Encryption

### PWA Security

## Compliance

- ✅ GDPR Ready (customer data)
- ✅ Firebase Terms
- ✅ OWASP Top 10
- ✅ PCI-DSS (if payments added)

## Security Team

👤 **Ali (Owner)** - security@globallcloud.com
- Response: علنی 48 ساعت
- Patch: فرولۆکی 7 ڕۆژ

---

**سپاس بۆ پاراستنی Global Cloud! 🔒**

آخری نوێنۆی: 2026-07-15
