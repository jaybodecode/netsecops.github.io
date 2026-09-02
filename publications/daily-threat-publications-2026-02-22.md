# Public Exploit for Critical Ray AI Framework RCE Puts Thousands of Servers at Risk

**Published:** 2026-02-22 | **Articles:** 1

This edition covers a critical remote code execution vulnerability (CVE-2023-48022) in the popular Ray AI/ML framework. With a CVSS score of 9.8 and a publicly available proof-of-concept exploit, thousands of internet-exposed Ray servers are now at immediate risk of complete takeover. The vulnerability stems from a lack of authentication in the Ray Dashboard, allowing unauthenticated attackers to execute arbitrary code. Administrators are urged to patch to Ray version 2.7.0 or implement network-level mitigations without delay.

## Articles in this publication
- [Critical RCE Flaw in Ray AI Framework Actively Exploited After PoC Release](https://cyber.netsecops.io/articles/public-exploit-for-critical-ray-rce-vulnerability-threatens-ai-ml-servers/) (critical)
  A critical remote code execution vulnerability, CVE-2023-48022 (CVSS score 9.8), in the open-source Ray AI/ML framework is under active threat following the public release of a proof-of-concept exploit. The flaw, stemming from a lack of authentication in the Ray Dashboard, allows unauthenticated attackers to execute arbitrary code and take full control of vulnerable Ray clusters. Security researchers report thousands of internet-exposed Ray instances are at immediate risk. The vulnerability affects Ray versions 2.6.3 and earlier, and users are urged to upgrade to version 2.7.0 or later immediately.

---
Source: https://cyber.netsecops.io/publications/daily-threat-publications-2026-02-22/
