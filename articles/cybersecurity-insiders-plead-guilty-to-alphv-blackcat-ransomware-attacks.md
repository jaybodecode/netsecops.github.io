# Insider Threat: Cybersecurity Pros Plead Guilty to ALPHV/BlackCat Ransomware Attacks

**Severity:** high | **Category:** Threat Actor,Ransomware,Cyberattack | **Updated:** 2025-12-30 | **Reading time:** 5 min

In a significant insider threat case, two American cybersecurity professionals, Ryan Goldberg and Kevin Martin, have pleaded guilty to conspiracy to commit extortion. The pair admitted to using their expert knowledge and access gained from their roles in incident response and ransomware negotiation to conduct ransomware attacks against U.S. companies using the ALPHV/BlackCat ransomware variant. Operating as affiliates for the Ransomware-as-a-Service (RaaS) group, they targeted organizations in the healthcare, engineering, and technology sectors, extorting $1.2 million in one case. The Department of Justice announced the pleas on December 30, 2025, highlighting the danger of trusted insiders turning to cybercrime. Both individuals face up to 20 years in prison.

## Executive Summary
On December 30, 2025, the **[U.S. Department of Justice](https://www.justice.gov/)** announced that two American cybersecurity professionals, Ryan Goldberg and Kevin Martin, pleaded guilty to charges related to their involvement with the **[ALPHV/BlackCat](https://attack.mitre.org/groups/G1017/)** ransomware operation. Goldberg, a former incident response manager, and Martin, a ransomware negotiator, abused their specialized skills and insider knowledge to function as affiliates for the notorious Ransomware-as-a-Service (RaaS) group. They targeted multiple U.S. organizations, primarily in the healthcare sector, throughout 2023. In one instance, they successfully extorted approximately $1.2 million in Bitcoin from a Florida medical device firm. This case serves as a stark reminder of the potent threat posed by malicious insiders who can weaponize their trusted access and technical expertise for personal gain. Both men face a maximum sentence of 20 years in prison.

---

## Threat Overview
The case highlights a dangerous convergence of insider threat and the **[Ransomware-as-a-Service (RaaS)](https://en.wikipedia.org/wiki/Ransomware_as_a_service)** ecosystem. Ryan Goldberg, 40, and Kevin Martin, 36, leveraged their professional backgrounds to effectively carry out attacks. Goldberg's experience at the cybersecurity firm Sygnia gave him deep insight into corporate defenses and incident response playbooks, while Martin's role at DigitalMint provided expertise in ransomware negotiation and cryptocurrency laundering.

As affiliates of ALPHV/BlackCat, they were responsible for gaining access to victim networks, deploying the ransomware, and extorting victims. In exchange, they agreed to pay the ALPHV administrators a 20% cut of the ransom payments. Their victims included:
- A Florida medical company
- A Maryland pharmaceutical company
- A California doctor's office
- A Virginia-based drone company
- A California engineering company

This demonstrates a clear targeting of organizations with sensitive data and a perceived ability to pay, particularly within the healthcare industry.

## Technical Analysis
While the court documents do not detail the specific initial access vectors, the actors' roles suggest they may have exploited knowledge of common security gaps or used social engineering techniques informed by their professional experience. The core of their operation involved deploying the ALPHV/BlackCat ransomware.

**ALPHV/BlackCat TTPs typically include:**
- **Initial Access:** Exploiting known vulnerabilities ([`T1190`](https://attack.mitre.org/techniques/T1190/)), using stolen credentials ([`T1078`](https://attack.mitre.org/techniques/T1078/)), or leveraging compromised remote access services.
- **Execution:** Using PowerShell and Cobalt Strike for post-exploitation activities ([`T1059.001`](https://attack.mitre.org/techniques/T1059.001/), [`T1059.003`](https://attack.mitre.org/techniques/T1059.003/)).
- **Defense Evasion:** Disabling security tools and clearing logs ([`T1562`](https://attack.mitre.org/techniques/T1562/)).
- **Data Exfiltration:** Stealing sensitive data before encryption for double extortion ([`T1567.002`](https://attack.mitre.org/techniques/T1567.002/)).
- **Impact:** Encrypting data for financial gain ([`T1486`](https://attack.mitre.org/techniques/T1486/)).

The duo laundered their 80% share of the extorted funds, converting the Bitcoin payments into fiat currency.

## Impact Assessment
The actions of Goldberg and Martin had a significant impact on their victims. The attack on the California doctor's office involved the theft and publication of patient photos on the ALPHV leak site, a severe breach of privacy with lasting consequences for the individuals affected. The $1.2 million extortion from the Florida medical firm represents a substantial financial loss.

More broadly, this case damages the trust between organizations and the cybersecurity professionals they hire to protect them. It underscores the critical need for robust background checks, access controls, and behavioral monitoring for employees in sensitive and privileged roles, especially within the cybersecurity industry itself. The fact that insiders could operate for an extended period in 2023 highlights potential gaps in oversight even within firms dedicated to fighting cybercrime.

## Detection & Response
Detecting a malicious insider with legitimate access is exceptionally challenging. Detection must focus on behavioral anomalies rather than just unauthorized access.

**Detection Strategies:**
1.  **User and Entity Behavior Analytics (UEBA):** ([`D3-UBA`](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis)) Deploy UEBA solutions to baseline normal activity for privileged users like incident responders. Alert on deviations, such as accessing systems outside of normal job duties, unusual data access patterns, or activity during non-business hours.
2.  **Endpoint and Network Monitoring:** Monitor for the tools and techniques commonly used by ransomware groups, such as the deployment of Cobalt Strike, PsExec for lateral movement, or large-scale data exfiltration to cloud storage.
3.  **Access Auditing:** ([`D3-DAM`](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring)) Regularly audit access logs for critical systems. Scrutinize the activities of privileged accounts, especially those with access to sensitive data or security infrastructure.

## Mitigation
Preventing insider threats requires a combination of technical controls, administrative policies, and a strong security culture.

1.  **Principle of Least Privilege:** ([`D3-UAP`](https://d3fend.mitre.org/technique/d3f:UserAccountPermissions)) Strictly enforce the principle of least privilege for all employees, including cybersecurity staff. Access to sensitive systems and data should be granted on a need-to-know basis and revoked as soon as it is no longer required.
2.  **Separation of Duties:** Implement separation of duties for critical functions. For example, the personnel responsible for incident response should not have the ability to alter financial records or approve large transactions.
3.  **Thorough Background Checks:** Conduct comprehensive background checks for all personnel hired into positions of trust, especially those with privileged access to IT systems and sensitive data.
4.  **Security Awareness and Insider Threat Programs:** Establish a formal insider threat program that includes training for all employees on recognizing and reporting suspicious behavior. Foster a culture where security is a shared responsibility.

**Tags:** Insider Threat, ALPHV, BlackCat, Ransomware, Extortion, Department of Justice, RaaS

## Sources
- [Two Americans Plead Guilty to Targeting Multiple U.S. Victims Using ALPHV BlackCat Ransomware](https://www.justice.gov/opa/pr/two-americans-plead-guilty-targeting-multiple-us-victims-using-alphv-blackcat-ransomware) — Department of Justice (2025-12-30)
- [Ransomware responders plead guilty to using ALPHV in attacks on US organizations](https://therecord.media/ransomware-responders-plead-guilty-alphv-us-orgs) — The Record (2025-12-30)
- [Guilty Pleas in Ransomware Attacks](https://www.isssource.com/guilty-pleas-in-ransomware-attacks/) — ISSSource (2025-12-30)

---
Source: https://cyber.netsecops.io/articles/cybersecurity-insiders-plead-guilty-to-alphv-blackcat-ransomware-attacks/
