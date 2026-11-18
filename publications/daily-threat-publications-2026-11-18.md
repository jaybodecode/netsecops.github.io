# Microsoft Patches Outlook Zero-Day, CISA Warns of Java4Shell

**Published:** 2026-11-18 | **Articles:** 6

**Critical Vulnerabilities Under Active Exploitation:**

*   **[UPDATE] Microsoft's Record Patch Tuesday Fixes 1,235 Flaws, Including Outlook Zero-Day:** Microsoft's November Patch Tuesday addresses 1,235 vulnerabilities, including a critical RCE in Windows LDAP (CVE-2026-119958), SharePoint Server (CVE-2026-120002), and Exchange Server (CVE-2026-118207). Defenders should monitor Outlook for outbound SMB/WebDAV, look for successful NTLM logons, and detect specific rundll32.exe commands. Enforcing SMB signing is a key remediation step.
*   **[NEW] CISA Issues Urgent Warning for Critical "Java4Shell" RCE Flaw:** A critical RCE vulnerability (CVE-2026-114938), dubbed "Java4Shell," in OpenJDK's Base64 decoder affects specific x86-64 CPUs and enterprise applications like Jira and Jenkins. CISA urges immediate patching.
*   **[NEW] Critical RCE Flaw in Perforce Puppet (CVE-2026-115731) Actively Exploited:** A critical RCE vulnerability (CVE-2026-115731) in Perforce Puppet's infrastructure management platform is being actively exploited. This deserialization flaw allows code execution on Puppet servers with a CA-signed certificate.

**New Threats and Advisories:**

*   **[NEW] Russian APT Star Blizzard Impersonates Hacked Firm to Attack New Target:** The Russian APT group Star Blizzard is using data stolen from a previous victim to launch new attacks, impersonating an employee of a breached U.S. organization to target another entity. The initial compromise involved MFA fatigue attacks.

**Policy & Industry Notes:**

*   **[NEW] Pentagon Mandates AI Training for All Cybersecurity Personnel:** The U.S. Department of Defense will require AI training for its entire cybersecurity workforce to combat AI-driven threats and address a significant cyber professional shortage.
*   **[NEW] CISA Head: Recent Tech Outages Highlight Need for Broader Resilience:** Following recent widespread technology outages, CISA's acting director emphasized the importance of building resilient systems capable of withstanding both malicious cyber incidents and technical failures.

## Articles in this publication
- [Microsoft's Record Patch Tuesday Fixes 1,235 Flaws, Including Outlook Zero-Day](https://cyber.netsecops.io/articles/microsoft-november-2026-patch-tuesday-fixes-exploited-outlook-zero-day/) (critical)
  Microsoft has released its November 2026 Patch Tuesday update, addressing a record-breaking 1,235 vulnerabilities across its products. The most critical fix is for CVE-2026-124194, an actively exploited zero-day spoofing vulnerability in Microsoft Outlook. The flaw allows attackers to steal NTLM authentication hashes with a single click from a victim, bypassing security warnings. CISA has added the vulnerability to its Known Exploited Vulnerabilities (KEV) catalog, mandating a patch for federal agencies by November 24.
- [CISA Issues Urgent Warning for Critical "Java4Shell" RCE Flaw](https://cyber.netsecops.io/articles/cisa-warns-critical-java4shell-rce-vulnerability-cve-2026-114938/) (critical)
  A critical remote code execution vulnerability (CVE-2026-114938), dubbed "Java4Shell," has been discovered in OpenJDK's Base64 decoder, affecting versions 17.0.6+ on specific x86-64 CPUs. The flaw, rated 9.2 CVSS, allows for unauthenticated RCE and impacts major enterprise applications like Jira, Confluence, and Jenkins. The U.S. Cybersecurity and Infrastructure Security Agency (CISA) has issued an urgent advisory for organizations to apply patches immediately.
- [Pentagon Mandates AI Training for All Cybersecurity Personnel](https://cyber.netsecops.io/articles/pentagon-mandates-ai-training-for-cybersecurity-workforce/) (informational)
  The U.S. Department of Defense (DOD) has announced that artificial intelligence training will become a mandatory requirement for its entire cybersecurity workforce. This move aims to equip defense personnel with the skills needed to counter increasingly sophisticated AI-driven threats from adversaries. The new policy is part of a broader shift towards skills-based hiring to address a significant shortage of 24,000 cyber professionals.
- [CISA Head: Recent Tech Outages Highlight Need for Broader Resilience](https://cyber.netsecops.io/articles/cisa-urges-focus-on-resilience-beyond-cyberattacks-after-outages/) (informational)
  Following a series of disruptive technology outages, including a global Microsoft Outlook failure and airline ground stops, CISA's acting director, Nick Andersen, stated the events underscore the need for building resilient systems. He argued that the focus should be on withstanding any disruption, whether it's a malicious cyber incident or a technical failure like a bad patch.
- [Russian APT Star Blizzard Impersonates Hacked Firm to Attack New Target](https://cyber.netsecops.io/articles/russian-apt-star-blizzard-impersonates-victim-in-new-attack/) (high)
  The Russian FSB-linked APT group Star Blizzard (also known as Cold River and UNC4057) is weaponizing data stolen from a previous victim to launch new attacks. According to Google, the group impersonated an employee of a U.S. organization it had breached in late 2025 to phish a separate U.S. entity. The initial compromise was achieved using MFA fatigue attacks.
- [Critical RCE Flaw in Perforce Puppet (CVE-2026-115731) Actively Exploited](https://cyber.netsecops.io/articles/critical-perforce-puppet-rce-vulnerability-actively-exploited/) (critical)
  A critical remote code execution (RCE) vulnerability, CVE-2026-115731, in Perforce Puppet's infrastructure management platform is being actively exploited in the wild. The flaw, rated 9.4 CVSS, is an untrusted data deserialization issue that allows a client with any CA-signed certificate to execute code on the Puppet server, potentially leading to a full infrastructure compromise.

---
Source: https://cyber.netsecops.io/publications/daily-threat-publications-2026-11-18/
