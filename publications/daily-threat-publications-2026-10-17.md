# Healthcare & Government Data Breaches, Exploited Vulnerabilities Highlighted

**Published:** 2026-10-17 | **Articles:** 8

**Critical Vulnerabilities Under Active Exploitation**:

- **BeyondTrust Zero-Day Exploited by China-Linked Group**: CISA has added CVE-2026-102764, a critical authentication bypass in BeyondTrust Remote Support, to its KEV catalog. This mandates immediate patching for FCEB agencies due to confirmed active exploitation for initial access and lateral movement.

**New Threats and Advisories**:

- **ConnectWise Cloud Backup Supply Chain Attack**: An active supply chain attack is leveraging a compromised Microsoft 365 credential for ConnectWise Cloud Backup, allowing threat actors to access customer M365 environments and potentially create backdoors.
- **Rhysida Ransomware Hits Anne Arundel County**: The Rhysida ransomware gang claims responsibility for an August 2026 attack, alleging the theft of 2.6TB of sensitive data, including medical and payroll records, and is demanding a $2 million ransom.
- **Florida DMV Data Breach**: The Florida Department of Highway Safety and Motor Vehicles is notifying drivers of a data breach resulting from compromised credentials, with the ShinyHunters group claiming responsibility for over 500,000 files.
- **Medical Data Rx Breach Under Investigation**: A class action law firm is investigating a ransomware attack by 'The Gentlemen/VYPR' on Medical Data Rx, a healthcare IT service company, which disrupted data access and may have exposed personal and health information.

**Industry & Sector Impacts**:

- **Q3 2026 Ransomware Attacks Surge in Healthcare**: A new report indicates a 64% surge in ransomware attacks against the U.S. healthcare sector in Q3 2026, with over 600,000 patient records compromised, highlighting significant patient safety and financial risks.
- **California Student Data Exposed in Testing Provider Breach**: A breach at ETS, California's testing provider, has exposed the personal information of millions of current and former students, including names, addresses, and disability records, dating back to 2023.
- **Microsoft & Partners Disrupt Phishing-as-a-Service Operation**: Microsoft and international partners have disrupted a major Chinese-language Phishing-as-a-Service marketplace, taking down infrastructure for three criminal businesses that supplied phishing kits to threat actors worldwide.

## Articles in this publication
- [Q3 2026 Shatters Records with 2,627 Ransomware Attacks](https://cyber.netsecops.io/articles/q3-2026-sets-new-record-for-ransomware-attacks/) (high)
  The third quarter of 2026 experienced the highest volume of ransomware attacks ever recorded, with 2,627 incidents claimed by threat groups. This represents a 27% increase from Q2 2026 and a 61% rise year-over-year. The finance and technology sectors were the most heavily impacted, seeing increases of 72% and 70% respectively. The report also notes a rise in 'triple extortion' tactics, where attackers pressure individuals affected by a data breach to coerce victim organizations into paying.
- [China-Linked Group Exploits BeyondTrust Zero-Day in Espionage Attacks](https://cyber.netsecops.io/articles/china-linked-hackers-exploit-beyondtrust-zero-day-in-espionage-campaign/) (critical)
  A China-linked cyber espionage group known as Armory Castle (UNC5221) has been exploiting a critical zero-day vulnerability, CVE-2026-102764, in BeyondTrust Remote Support appliances. The flaw, with a CVSS score of 9.3, allows unauthenticated attackers to gain root-level control. The campaign, which began in late August 2026, involved deploying custom malware like the SAWFLY web shell and BARECLAW tunneler to achieve persistence, escalate privileges, and exfiltrate credentials from the device's secrets database. The attackers also wiped logs to cover their tracks. BeyondTrust has released patches and urges self-hosted customers to update immediately, rebuild compromised appliances from clean images, and rotate all associated credentials. The campaign targeted legal, technology, and government sectors, consistent with intelligence collection motives.
- [ConnectWise Cloud Backup Supply Chain Attack Hits M365 Tenants](https://cyber.netsecops.io/articles/connectwise-cloud-backup-supply-chain-attack-compromises-m365-tenants/) (high)
  An active supply chain attack is leveraging a compromised Microsoft 365 credential for the ConnectWise Cloud Backup application (AppId: 506e08f9-6e9a-4da4-942b-a099a03644ae). Threat actors are abusing the app's high-privilege OAuth permissions to access customer M365 environments, read mailboxes and files, and attempt to create backdoors. The activity was observed originating from the IP address 144.172.64.128.
- [Microsoft & Partners Disrupt Major Phishing-as-a-Service Operation](https://cyber.netsecops.io/articles/microsoft-and-partners-disrupt-major-phishing-as-a-service-marketplace/) (high)
  Microsoft, Health-ISAC, and international partners have disrupted a major Chinese-language Phishing-as-a-Service (PhaaS) marketplace. The operation took down infrastructure for three criminal businesses—YAM Store, CoGUI, and Iron Man—that supplied phishing kits and services to threat actors worldwide, enabling over one billion malicious messages targeting more than 75,000 organizations.
- [Millions of California Students' Data Exposed in Testing Provider Breach](https://cyber.netsecops.io/articles/california-student-data-breach-exposes-millions-of-records/) (high)
  A major data breach at ETS, California's standardized testing provider, has exposed the personal information of millions of current and former public school students. The breach, which occurred over several months via a compromised login credential, exposed names, addresses, demographic details, and disability records. Data dates back to 2023, affecting far more than the state's current 5.7 million students. Free identity protection services are being offered.
- [Rhysida Ransomware Gang Hits Anne Arundel County, Steals 2.6TB of Data](https://cyber.netsecops.io/articles/rhysida-ransomware-gang-hits-anne-arundel-county-maryland/) (high)
  The Rhysida ransomware gang has claimed responsibility for an August 2026 cyberattack on Anne Arundel County, Maryland. The group alleges it stole 2.6 terabytes of data, including sensitive medical, payroll, and jail records, and is demanding a $2 million ransom (25 BTC). The county has confirmed the data theft and is investigating the scope of the incident, which affects its nearly 600,000 residents.
- [Florida DMV Notifies Drivers of Data Breach; ShinyHunters Claims Leak](https://cyber.netsecops.io/articles/florida-dmv-data-breach-shinyhunters-claims-leak/) (high)
  The Florida Department of Highway Safety and Motor Vehicles (FLHSMV) is notifying drivers of a data breach detected on September 4, 2026. The breach occurred after an attacker used compromised credentials to access department records. The notorious extortion group ShinyHunters has claimed responsibility, alleging the theft and posting of over 500,000 files. State officials maintain they have no evidence of data misuse as the investigation continues.
- [Law Firm Investigates Class Action Following Medical Data Rx Breach](https://cyber.netsecops.io/articles/law-firm-investigates-class-action-lawsuit-following-medical-data-rx-breach/) (medium)
  The national class action law firm Edelson Lechtzin LLP has launched an investigation into a data breach at Medical Data Rx, a Michigan-based healthcare IT service company. The incident was reportedly a ransomware attack by a group known as 'The Gentlemen/VYPR,' which disrupted healthcare data access. The investigation is exploring potential legal remedies for individuals whose personal and health information may have been exposed.

---
Source: https://cyber.netsecops.io/publications/daily-threat-publications-2026-10-17/
