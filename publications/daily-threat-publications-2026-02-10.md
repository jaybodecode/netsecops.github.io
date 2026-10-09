# Urgent Patch Alert: Critical ConnectWise ScreenConnect Flaw (CVSS 10.0) Under Active Exploitation

**Published:** 2026-02-10 | **Articles:** 1

This advisory covers a critical cybersecurity event on February 10, 2026, centered on the active exploitation of two severe vulnerabilities in ConnectWise ScreenConnect. A CVSS 10.0 authentication bypass flaw (CVE-2026-1014) and a high-severity path traversal vulnerability (CVE-2026-1219) are being chained by attackers to achieve remote code execution on unpatched on-premise servers. CISA has added the critical flaw to its Known Exploited Vulnerabilities (KEV) catalog, mandating immediate action. Organizations using ScreenConnect versions 23.9.7 and older are urged to upgrade to version 23.9.8 or later immediately or take servers offline to prevent compromise.

## Articles in this publication
- [Patch Now: Critical ScreenConnect Auth Bypass (CVSS 10.0) Under Active Attack](https://cyber.netsecops.io/articles/critical-screenconnect-auth-bypass-vulnerability-cve-2026-1014-exploited/) (critical)
  ConnectWise has disclosed and patched two critical vulnerabilities affecting its ScreenConnect remote access software, with one flaw, CVE-2026-1014, receiving a maximum CVSS score of 10.0. This authentication bypass vulnerability allows a remote, unauthenticated attacker to create a new administrator account on an exposed server. A second path traversal flaw, CVE-2026-1219 (CVSS 8.4), allows an authenticated attacker to upload arbitrary files. Security researchers and CISA have confirmed that threat actors are actively chaining these vulnerabilities in the wild to gain initial access, upload malicious payloads, and achieve remote code execution on vulnerable on-premise instances. The flaws impact ScreenConnect versions 23.9.7 and older. ConnectWise has released version 23.9.8 to address the issues, and CISA has added CVE-2026-1014 to its Known Exploited Vulnerabilities (KEV) catalog, underscoring the urgency for immediate patching.

---
Source: https://cyber.netsecops.io/publications/daily-threat-publications-2026-02-10/
