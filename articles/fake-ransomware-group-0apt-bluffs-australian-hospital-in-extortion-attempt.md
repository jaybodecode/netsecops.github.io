# New '0APT' Extortion Group Fakes Data Breach in Bluff Attack on Australian Hospital

**Severity:** medium | **Category:** Ransomware,Threat Actor,Data Breach | **Updated:** 2026-02-09 | **Reading time:** 5 min

A new extortion group calling itself '0APT' has targeted Australia's Epworth HealthCare, claiming to have stolen 920GB of sensitive patient and financial data. The group listed the hospital on its darknet leak site on February 4, 2026, threatening to publish the data if a ransom was not paid. However, Epworth HealthCare conducted a thorough investigation with external cybersecurity experts and found "no verified evidence of any impact to our systems or data." Cybersecurity researchers have corroborated this, assessing that 0APT is likely a "fake" ransomware operation. The group's modus operandi involves posting a high volume of victims without providing credible proof of a breach, instead using empty files or random data streams. This tactic relies on psychological pressure and the threat of reputational damage to extort payment, representing a shift from technical intrusion to pure intimidation.

## Executive Summary
In early February 2026, a new extortion group named **0APT** targeted **[Epworth HealthCare](https://www.epworth.org.au/)**, a major Australian private hospital network, with a public extortion attempt. The group claimed on its darknet leak site to have exfiltrated 920GB of sensitive data, including patient records and financial information, threatening to release it if a ransom was not paid. Following an immediate and thorough investigation, Epworth HealthCare found no evidence of a system compromise or data breach. Cybersecurity researchers have analyzed 0APT's activities and concluded the group is a "fake" ransomware operation. Instead of performing actual data theft, 0APT fabricates claims and uses psychological tactics and public pressure to coerce victims into paying, marking an evolution in extortion techniques that bypasses the need for sophisticated technical intrusions.

## Threat Overview
- **Threat Actor:** 0APT (a newly emerged group)
- **Target:** Epworth HealthCare, Victoria's largest not-for-profit private hospital group.
- **Timeline:**
    - **Late January 2026:** 0APT group first appears.
    - **February 4, 2026:** 0APT lists Epworth HealthCare on its leak site.
    - **February 6, 2026:** Deadline threatened by 0APT for data publication.
- **Claim:** The attackers alleged the theft of 920GB of data, including patient databases, surgical records, clinical notes, and private billing details.
- **Attack Vector:** This is not a traditional cyberattack involving network intrusion. The primary vector is psychological manipulation and public relations warfare. The group creates a public crisis for the target organization, hoping the fear of reputational damage and potential regulatory fines will be enough to secure a payment.

## Technical Analysis
Unlike traditional ransomware gangs, **0APT** does not appear to engage in network exploitation, deploying malware, or exfiltrating data. The technical analysis focuses on their disinformation tactics:
- **Leak Site Operations:** The group maintains a darknet leak site, mimicking the infrastructure of legitimate ransomware groups like LockBit or ALPHV. This provides a veneer of credibility to their claims.
- **Lack of Proof:** A key indicator of 0APT's fraudulent nature is the consistent failure to provide valid proof-of-compromise. When legitimate groups list a victim, they typically provide a small sample of stolen data to substantiate their claims. Researchers analyzing 0APT's supposed leaks found them to be empty files or infinite streams of random, meaningless data.
- **High Volume, Low Quality:** The group posts a large number of victims in a short period, a pattern inconsistent with the time and effort required for actual network intrusions and large-scale data exfiltration.

> The 0APT operation represents a low-cost, high-leverage extortion model. It bypasses the significant technical hurdles of breaching a secure network and instead weaponizes fear, uncertainty, and doubt (FUD) as its primary tool.

### MITRE ATT&CK Techniques (Observed/Attempted)
While no technical intrusion occurred, the group's actions align with the objectives of several ATT&CK techniques:
- [`T1591.004 - Gather Victim Org Information: Identify Roles`](https://attack.mitre.org/techniques/T1591/004/): The group likely performs basic reconnaissance to identify high-value targets in sensitive sectors like healthcare, where the reputational impact of a data breach is severe.
- [`T1589 - Gather Victim Identity Information`](https://attack.mitre.org/techniques/T1589/): The attackers gather enough information about the organization to make their claims appear plausible.
- [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/): Although no data was encrypted, the group's entire operation is predicated on the *threat* of data being made public, which is the second stage of modern double-extortion ransomware attacks that this technique covers.

## Impact Assessment
Even though no data was stolen, the impact on a targeted organization can be significant:
- **Incident Response Costs:** Epworth HealthCare had to activate its incident response plan, consuming valuable time and resources from its IT and security teams. They also engaged independent cybersecurity specialists, incurring direct financial costs.
- **Reputational Damage:** The public claim of a breach, even if false, can erode trust among patients, partners, and the public. News of the alleged attack was reported by multiple outlets, requiring the hospital to manage a public relations response.
- **Business Disruption:** While patient care was not impacted, internal teams were diverted to investigate the claim, causing a temporary disruption to normal business operations.
- **Psychological Toll:** The incident creates significant stress and uncertainty for employees, leadership, and stakeholders.

## Detection & Response
Detecting a bluff attack is challenging as there are no technical indicators of compromise (IOCs) on the network. Response must focus on verification and communication.

### Detection Strategies
- **Threat Intelligence Monitoring:** Continuously monitor the dark web, criminal forums, and threat actor leak sites for mentions of your organization's name or assets. This provides the earliest possible warning of such a claim.
- **Internal Verification:** Upon receiving a threat or seeing a public claim, immediately initiate an internal investigation to look for evidence of a breach. This includes reviewing logs from firewalls, EDR, SIEM, and data loss prevention (DLP) systems for any signs of anomalous activity, such as large data egress or unauthorized access.

### Response Actions
1.  **Do Not Panic:** Treat the claim as potentially credible but unverified. Avoid making immediate public statements until an initial internal assessment is complete.
2.  **Activate Incident Response:** Immediately convene the IR team to begin a formal investigation.
3.  **Preserve Evidence:** Secure all relevant logs and system images, even if no breach is found. This data is crucial for proving a negative (i.e., that no breach occurred).
4.  **Engage Experts:** Bring in third-party digital forensics and incident response (DFIR) specialists to conduct an independent investigation. This adds credibility to your findings.
5.  **Communicate Clearly:** Once the investigation confirms no evidence of a breach, issue a clear, confident, and transparent statement to all stakeholders, including employees, customers, and the media. As Epworth did, state plainly that "no verified evidence of any impact" was found.

## Mitigation
Mitigation against bluff attacks is primarily about preparedness and resilience.
- **Strong Security Posture:** The best defense is being able to quickly and confidently determine that a breach has not occurred. This requires having a mature security program with comprehensive logging, monitoring, and detection capabilities. If you can prove you are secure, you can call the bluff.
- **Incident Response Plan:** Have a well-defined IR plan that specifically includes a playbook for handling public data breach claims and extortion attempts, including those that may be fake.
- **Public Relations Strategy:** Develop a crisis communication plan in advance. Know who is authorized to speak to the media and have template statements ready for various scenarios.
- **Backup and Recovery:** While not directly applicable to a bluff, having robust, tested backups is a critical control for genuine ransomware attacks and allows an organization to resist paying a ransom.

**Tags:** 0APT, Ransomware, Extortion, Bluff Attack, Healthcare, Australia, Cybercrime

## Sources
- [Exclusive: Epworth HealthCare finds no evidence of data breach as hackers allege 920GB stolen in ransomware attack](https://www.cyberdaily.au/security/10188-exclusive-epworth-healthcare-finds-no-evidence-of-data-breach-as-hackers-allege-920gb-stolen-in-ransomware-attack) — CyberDaily.au (2026-02-08)
- [0apt Ransomware Attack on Epworth Private Healthcare in Australia](https://www.dexpose.io/blog/0apt-ransomware-attack-on-epworth-private-healthcare-in-australia-2026-02-05) — DEXPOSE (2026-02-08)
- [9th February 2026 Cyber Update: Fake Ransomware Group Targets Epworth HealthCare in Data Extortion Bluff](https://www.cybernewscentre.com/9th-february-2026-cyber-update-fake-ransomware-group-targets-epworth-healthcare-in-data-extortion-bluff/) — Cyber News Centre (2026-02-09)
- [Australia Cyber Security: DeepSeek AI Ban, Epworth Ransomware & Critical Exploits](https://aisecuritywire.com/australia-cyber-security-deepseek-ai-ban-epworth-ransomware-critical-exploits/) — AI Security Wire (2026-02-08)

---
Source: https://cyber.netsecops.io/articles/fake-ransomware-group-0apt-bluffs-australian-hospital-in-extortion-attempt/
