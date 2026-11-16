# Zero-Days, Data Breaches, and AI's Impact on Cybersecurity

**Published:** 2026-11-14 | **Articles:** 9

**Critical Vulnerabilities Under Active Exploitation:**

*   **Check Point Zero-Day Exploited to Gain Root Access, Deploy Wiper (CVE-2026-123039):** A critical zero-day in Check Point's Gaia OS is being actively exploited, allowing attackers to gain root access and deploy wiper malware on VMware ESXi hosts. CISA has added this to its KEV catalog, mandating urgent patching.
*   **CISA Warns of Actively Exploited Critical Flaw in UnrealIRCd (CVE-2026-114713):** CISA has added a critical command injection vulnerability in UnrealIRCd to its KEV catalog. This flaw allows unprivileged users to execute commands with server-level authority and was exploited in the wild shortly after a patch was released.

**Data Breaches and Targeted Attacks:**

*   **TSMC Confirms Employee Data Breach via Third-Party Cloud Vendor:** Taiwan Semiconductor Manufacturing Company (TSMC) has confirmed a data breach affecting current and former employees, originating from an unnamed third-party cloud vendor. A threat actor is reportedly selling a database containing employee information.
*   **Kempinski Hotels Guests Targeted by Phishing After Vendor Breach:** Luxury hotel group Kempinski has confirmed a data breach originating from a compromised third-party technology partner, exposing guest reservation details. This information is now being used for phishing campaigns targeting guests.
*   **[UPDATE] Falcon C2 Framework Compromises Browsers to Target Governments:** Further analysis of the Falcon C2 framework reveals targeting of Roundcube webmail servers via JavaScript injection. Attackers used malicious browser extensions and fake updates for payload delivery, with new MITRE ATT&CK techniques identified.
*   **BlackNevas Ransomware Wipes VMware Estate Using Stolen Credentials:** The BlackNevas ransomware group destroyed a company's VMware environment by using stolen credentials to access vCenter and abuse legitimate administrative tools to deploy their encryptor.

**Industry Trends and Policy Developments:**

*   **White House AI Task Force Urges Cyber Liability Relief for Firms:** The Trump administration's AI task force is recommending limited regulatory liability for companies that voluntarily report cybersecurity incidents in good faith, proposing a safe harbor period.
*   **Forescout Research: AI Finds 66 New TCP/IP Stack Flaws in 90 Hours:** Forescout's research demonstrates that commercial AI models can find critical vulnerabilities in foundational networking software significantly faster than manual methods, identifying 66 previously unknown flaws.
*   **FAA Outage Not a Cyberattack; FBI Investigates Software Update:** The nationwide ground stop issued by the FAA was not a cyberattack, according to U.S. officials. The FBI is reportedly investigating a software update as a potential cause for the communications failure.

## Articles in this publication
- [Falcon C2 Framework Compromises Browsers to Target Governments](https://cyber.netsecops.io/articles/the-xg-files-falcon-c2-flying-under-the-browser-radar/) (high)
  Unit 42 has identified a browser-based command and control (C2) framework named Falcon (also known as XG or Xiàng Gē). The threat actor leverages this framework to compromise government webmail portals and applications by injecting malicious JavaScript. Operating entirely within the browser, Falcon can sideload malicious Chrome extensions and exfiltrate sensitive information. The campaign, observed between March and May 2026, targeted government ministries in the Middle East and Southeast Asia. The framework also serves as a delivery mechanism for a secondary implant called Antino, which uses Microsoft OneDrive for C2 communications. Analysis reveals a high-confidence link between Falcon and the PeckBirdy framework previously reported by Trend Micro.
- [Check Point Zero-Day Exploited to Gain Root Access, Deploy Wiper](https://cyber.netsecops.io/articles/check-point-zero-day-cve-2026-123039-exploited-to-deploy-wiper/) (critical)
  A high-severity zero-day vulnerability in Check Point's Gaia OS (CVE-2026-123039) is being actively exploited in the wild. Attackers are chaining it with other flaws for initial access, escalating to root privileges, and pivoting to VMware ESXi hosts to deploy destructive wiper malware. The U.S. Cybersecurity and Infrastructure Security Agency (CISA) has added the flaw to its Known Exploited Vulnerabilities (KEV) catalog, mandating urgent patching for federal agencies.
- [CISA Warns of Actively Exploited Critical Flaw in UnrealIRCd](https://cyber.netsecops.io/articles/cisa-warns-of-actively-exploited-unrealircd-flaw-cve-2026-114713/) (high)
  The U.S. Cybersecurity and Infrastructure Security Agency (CISA) has added a critical command injection vulnerability in the UnrealIRCd server, CVE-2026-114713, to its Known Exploited Vulnerabilities (KEV) catalog. The flaw allows unprivileged users on linked servers to execute commands with server-level authority. Exploitation was observed in the wild just one day after a patch was released, prompting an urgent call to update.
- [TSMC Confirms Employee Data Breach via Third-Party Cloud Vendor](https://cyber.netsecops.io/articles/tsmc-confirms-employee-data-breach-via-cloud-provider/) (high)
  Taiwan Semiconductor Manufacturing Company (TSMC), the world's largest chipmaker, has confirmed a data breach exposing the personal data of current and former employees. The breach originated from an unnamed third-party cloud service provider, not from TSMC's internal systems. A threat actor is reportedly selling a 6.9 GB database containing information on 46,000 employees on a cybercrime forum.
- [White House AI Task Force Urges Cyber Liability Relief for Firms](https://cyber.netsecops.io/articles/white-house-ai-task-force-recommends-cyber-liability-relief/) (informational)
  The Trump administration's AI task force is recommending that U.S. federal agencies limit regulatory liability for companies that voluntarily report cybersecurity incidents in good faith. The proposed safe harbor period would last for at least 12 months, acknowledging that the rapid evolution of AI has significantly altered the risk landscape for businesses.
- [Forescout Research: AI Finds 66 New TCP/IP Stack Flaws in 90 Hours](https://cyber.netsecops.io/articles/forescout-research-ai-finds-critical-flaws-20x-faster/) (medium)
  Groundbreaking research from Forescout's Vedere Labs demonstrates that commercial AI models can find critical vulnerabilities in foundational networking software up to 20 times faster than traditional manual methods. The AI-assisted process identified 99 vulnerabilities, including 66 previously unknown flaws, in widely used TCP/IP stacks in just 90 hours—a task that would typically take nine months. This dramatically lowers the barrier to entry for finding impactful bugs for both defenders and attackers.
- [Kempinski Hotels Guests Targeted by Phishing After Vendor Breach](https://cyber.netsecops.io/articles/kempinski-hotels-guests-targeted-after-third-party-data-breach/) (high)
  Luxury hotel group Kempinski has confirmed a data breach originating from a compromised third-party technology partner. Attackers accessed guest reservation details, including names, contact information, and stay dates. This information is now being used to launch highly convincing phishing campaigns requesting fraudulent payments from guests via email, SMS, and WhatsApp.
- [BlackNevas Ransomware Wipes VMware Estate Using Stolen Credentials](https://cyber.netsecops.io/articles/blacknevas-ransomware-wipes-vmware-environment-with-stolen-credentials/) (critical)
  The BlackNevas ransomware group conducted a devastating attack, destroying a company's entire VMware environment without exploiting a single vulnerability. According to Kaspersky, the attackers used stolen credentials to access vCenter, abused legitimate administrative tools like vCenter Host Profiles to enable SSH, and then deployed their encryptor to wipe ESXi hosts, virtual machines, and backups over a 10-day period.
- [FAA Outage Not a Cyberattack; FBI Investigates Software Update](https://cyber.netsecops.io/articles/faa-outage-not-a-cyberattack-software-update-investigated/) (informational)
  The nationwide ground stop issued by the Federal Aviation Administration (FAA) on November 13, which caused thousands of flight disruptions, was not the result of a cyberattack, according to U.S. officials. The FBI is reportedly investigating a software update as a potential cause of the communications failure, with legacy equipment also cited as a contributing factor.

---
Source: https://cyber.netsecops.io/publications/daily-threat-publications-2026-11-14/
