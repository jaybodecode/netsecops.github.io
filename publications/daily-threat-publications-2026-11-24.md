# N-able, MONAI Label Exploits Added to CISA KEV; Industrial Ransomware Surges

**Published:** 2026-11-24 | **Articles:** 8

**Critical Vulnerabilities Under Active Exploitation:**

*   **N-able Server Breach and Mail Assure/SpamExperts Outage:** CISA has added CVE-2026-134624, a critical vulnerability in N-able's Mail Assure and SpamExperts, to its Known Exploited Vulnerabilities (KEV) catalog. This flaw was actively exploited, leading to a server breach and service disruptions, with a directive for U.S. federal agencies to patch by Thanksgiving.
*   **AI Agents Exploit MONAI Label Zero-Day:** The critical path traversal vulnerability, CVE-2026-133968, autonomously exploited by AI agents in MONAI Label, is now on CISA's KEV catalog. This signifies active exploitation and requires immediate remediation for organizations using MONAI Label.

**New Threats and Advisories:**

*   **Industrial Ransomware Attacks Surge 11% in Q3 2026:** Reports indicate a record quarter for ransomware, with a significant 11% surge in industrial attacks. The threat landscape is fragmented, with smaller groups now responsible for the majority of incidents, and the US remains the most targeted nation.
*   **Google Patches Critical Chrome Flaw Allowing Sandbox Escape:** Google has released an emergency update for CVE-2026-134401, a critical 9.6 CVSS vulnerability in Chrome's Variations component that could allow sandbox escape and arbitrary code execution.
*   **VMware Patches Critical 9.8-Rated vCenter Auth Bypass Flaw:** Broadcom has addressed a critical authentication bypass vulnerability (CVE-2026-123903) in VMware vCenter Server, rated 9.8, which could allow unauthenticated attackers network access to gain unauthorized control.
*   **Elecbrakes Flaws Allow Remote Hijacking of Trailer Brakes:** Three critical vulnerabilities in Elecbrakes trailer brake controllers could permit a nearby attacker to remotely control trailer brakes via Bluetooth, posing a risk of accidents.
*   **European Commission Confirms Personal Data Stolen in Cyberattack:** A cyberattack on the EU Academy, the Commission's online learning platform, resulted in the theft of personal data and wider disruptions. The platform has been taken offline for security upgrades until January 2027.

**Policy & Industry Notes:**

*   **Australia and Singapore Partner on AI and Cybersecurity Governance:** Australia and Singapore have formalized an agreement to enhance cooperation on AI and cybersecurity governance, focusing on protecting critical digital infrastructure and promoting responsible AI standards.

## Articles in this publication
- [N-able Confirms Server Breach Caused Email Security Service Outage](https://cyber.netsecops.io/articles/n-able-cloud-server-breach-disrupts-global-email-security-services/) (high)
  N-able has confirmed a security incident involving unauthorized access to a server supporting its Mail Assure and SpamExperts hosted cloud platforms. The breach, which began on November 16, 2026, led to a multi-day service disruption across the Americas, Europe, and APAC. As a precaution, N-able disabled management interfaces, APIs, and quarantine access. While core email filtering remained operational, administrators were unable to manage the services. An investigation is ongoing to determine the attack vector and full impact, though N-able has stated there is currently no evidence of customer data compromise. This incident is reportedly separate from a recent vulnerability in its N-central RMM product.
- [AI Agents Autonomously Find and Exploit Zero-Day Vulnerability](https://cyber.netsecops.io/articles/ai-agents-autonomously-find-and-exploit-zero-day-in-medical-software/) (critical)
  In a watershed moment for offensive AI, Amazon Threat Intelligence has reported that a suspected China-linked actor used an AI framework called 'Cairn' to autonomously discover and exploit a zero-day vulnerability (CVE-2026-133968) in MONAI Label, an open-source medical imaging server. The AI agents achieved root access on a university server in minutes, demonstrating a significant leap in automated cyberattack capabilities.
- [Industrial Ransomware Attacks Surge 11% in Q3 2026, Dragos Reports](https://cyber.netsecops.io/articles/industrial-ransomware-attacks-surge-11-percent-in-q3-2026/) (high)
  Ransomware attacks targeting industrial organizations and critical infrastructure rose by 11% in the third quarter of 2026, totaling 1,266 incidents globally. A report from cybersecurity firm Dragos highlights that the manufacturing sector was the most heavily impacted, accounting for 69% of all attacks (876 incidents). North America was the most targeted region, with the United States alone experiencing 473 incidents. The ransomware group Qilin was the most active, followed by a group known as 'The Gentlemen'. The primary attack vectors remain exploitation of internet-facing devices and stolen credentials.
- [Google Patches Critical Chrome Flaw Allowing Sandbox Escape](https://cyber.netsecops.io/articles/google-patches-critical-chrome-sandbox-escape-vulnerability-cve-2026-134401/) (critical)
  Google has released an emergency security update for a critical vulnerability, CVE-2026-134401, affecting its Chrome web browser. The flaw, rated 9.6, is in the Variations component and could allow a remote attacker to execute arbitrary code, bypassing the browser's sandbox. The update is available for Windows, macOS, Linux, and Android. While no active exploitation has been confirmed, users are urged to update immediately.
- [VMware Patches Critical 9.8-Rated vCenter Auth Bypass Flaw](https://cyber.netsecops.io/articles/vmware-vcenter-hit-by-critical-authentication-bypass-flaw-cve-2026-123903/) (critical)
  Broadcom has patched a critical authentication bypass vulnerability (CVE-2026-123903) in VMware vCenter Server, rated 9.8 on the CVSS scale. The flaw in the VMware Directory Service (vmdir) could allow an unauthenticated attacker with network access to gain unauthorized control. This follows the recent exploitation of a similar zero-day (CVE-2026-123890) by the Armory Castle threat actor, highlighting the urgent need for patching.
- [Elecbrakes Flaws Allow Remote Hijacking of Trailer Brakes](https://cyber.netsecops.io/articles/critical-bluetooth-flaws-in-elecbrakes-controllers-allow-remote-brake-hijacking/) (critical)
  Researchers have found three critical vulnerabilities in Elecbrakes trailer brake controllers (EB2, VM1, ELBC 2000). The flaws, primarily in the Bluetooth communication protocol, could allow a nearby attacker to remotely engage or disengage a trailer's brakes, creating a risk of catastrophic 'jackknife' accidents. The issues stem from missing authentication and protection against replay attacks.
- [European Commission Confirms Personal Data Stolen in Cyberattack](https://cyber.netsecops.io/articles/european-commission-confirms-personal-data-stolen-in-cyberattack/) (high)
  The European Commission has confirmed that a cyberattack first detected in October led to the theft of personal data. The breach targeted the EU Academy, the Commission's online learning platform. The attack, which reportedly involved AI tools, also caused wider disruptions. The EU Academy platform has been taken offline and will not be restored until January 2027 to allow for security upgrades.
- [Australia and Singapore Partner on AI and Cybersecurity Governance](https://cyber.netsecops.io/articles/australia-and-singapore-partner-on-ai-and-cybersecurity-governance/) (informational)
  Australia and Singapore have announced a formal agreement to strengthen cooperation on artificial intelligence (AI) and cybersecurity governance. The partnership aims to protect critical digital infrastructure, promote international standards for responsible AI, and ensure advanced AI systems remain under human control. The collaboration will include knowledge sharing on AI model evaluation and joint risk mitigation efforts.

---
Source: https://cyber.netsecops.io/publications/daily-threat-publications-2026-11-24/
