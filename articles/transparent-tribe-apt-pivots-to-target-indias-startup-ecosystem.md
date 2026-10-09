# Transparent Tribe (APT36) Shifts Focus, Targeting Indian Startups with Crimson RAT

**Severity:** high | **Category:** Threat Actor,Phishing,Cyberattack | **Updated:** 2026-02-07 | **Reading time:** 5 min

The Pakistan-aligned APT group Transparent Tribe (also known as APT36) has strategically shifted its targeting from Indian government and military entities to the country's growing startup sector. A new campaign, identified by researchers, uses the group's signature Crimson RAT malware delivered via malicious ISO files in phishing emails. The lures are themed around startups, with some attacks leveraging scraped personal information of real founders to appear more legitimate. The focus on startups in the cybersecurity and intelligence fields suggests the group aims to steal intellectual property and potentially use compromised companies as a supply chain vector to attack their government clients.

## Executive Summary
Researchers have identified a significant shift in the targeting strategy of **[Transparent Tribe](https://attack.mitre.org/groups/G0134/)** (also known as **APT36**), an advanced persistent threat (APT) group linked to Pakistan. Historically focused on Indian government and military organizations, the group is now actively targeting India's startup ecosystem. The new campaign employs the group's signature backdoor, **[Crimson RAT](https://malpedia.caad.fkie.fraunhofer.de/details/win.crimson_rat)**, to infiltrate companies, particularly those in the cybersecurity and intelligence sectors. The attacks leverage social engineering, using startup-themed lures and malicious ISO files delivered via phishing emails. This pivot indicates a strategic interest in stealing intellectual property and potentially using these startups as a stepping stone for supply chain attacks against their government and law enforcement customers.

## Threat Overview
- **Threat Actor:** **Transparent Tribe** (APT36, Mythic Leopard, ProjectM).
- **Associated Country:** Pakistan.
- **Target:** Indian startup companies, with a focus on the cybersecurity and intelligence sectors.
- **Malware:** **Crimson RAT**.
- **Attack Vector:** Phishing emails containing malicious ISO container files disguised as legitimate documents.
- **Objective:** Intelligence gathering, intellectual property theft, and potential supply chain compromise.

The campaign demonstrates a tactical evolution for **Transparent Tribe**, moving beyond traditional government espionage to target emerging technology sectors that may have less mature security postures. By compromising security startups, the group could gain insights into India's cyber defense capabilities or leverage trusted relationships to attack more sensitive targets.

## Technical Analysis
The attack chain observed in this campaign is consistent with **Transparent Tribe**'s established TTPs, with modifications to suit the new target set.

1.  **Initial Access:** The attack begins with a spearphishing email ([`T1566.001`](https://attack.mitre.org/techniques/T1566/001/)) sent to individuals within the target startup. The email contains a malicious ISO file (`.iso`) as an attachment.

2.  **Execution:** The user is tricked into mounting the ISO file and executing its contents. ISO files are used to bypass email gateway security controls that might block more common malicious file types like `.exe` or `.zip`. The executable within the ISO acts as a dropper for **Crimson RAT**.

3.  **Defense Evasion:** To enhance credibility, the attackers have been observed using personal information scraped from real startup founders, making the phishing lures highly convincing ([`T1589.002`](https://attack.mitre.org/techniques/T1589/002/)).

4.  **Command and Control:** Once installed, **Crimson RAT** establishes a connection to an attacker-controlled C2 server. This RAT is a .NET-based backdoor capable of:
    -   Collecting and exfiltrating files ([`T1041`](https://attack.mitre.org/techniques/T1041/)).
    -   Capturing screenshots ([`T1113`](https://attack.mitre.org/techniques/T1113/)).
    -   Logging keystrokes ([`T1056.001`](https://attack.mitre.org/techniques/T1056/001/)).
    -   Stealing credentials from browsers.
    -   Executing arbitrary commands.

## Impact Assessment
This campaign poses a multi-faceted threat to India's technology sector and national security:
- **Intellectual Property Theft:** The primary risk is the theft of proprietary technology, source code, and business plans from innovative startups, undermining their competitive advantage.
- **Supply Chain Risk:** By compromising startups that provide security services to law enforcement and government agencies, **Transparent Tribe** can create a supply chain attack vector. A backdoor in the startup's product could lead to the compromise of its sensitive government clients.
- **Economic Espionage:** The intelligence gathered can provide strategic insights into the health and direction of India's technology industry, a key component of its economy.

## Detection & Response
- **Email Security:** Deploy advanced email security solutions that can inspect file attachments within container files like ISOs and detect malicious content.
- **Endpoint Monitoring:** Use EDR to monitor for the execution of files from mounted ISO images. Create detection rules for the known behaviors of **Crimson RAT**, such as its specific registry keys for persistence and C2 communication patterns.
- **User Training:** Train employees to be suspicious of unsolicited emails, especially those containing attachments with unusual file types like `.iso`. Emphasize verification of sender identity before opening attachments.
- **Threat Intelligence:** Monitor for IOCs associated with **Transparent Tribe** and **Crimson RAT** and integrate them into security controls.

## Mitigation
- **Block Disk Image Files:** Configure email gateways and endpoint security policies to block or quarantine emails with `.iso`, `.img`, and `.vhd` attachments, as these are increasingly used to deliver malware.
- **Application Control:** Use application control policies to prevent the execution of unauthorized software, including executables run from temporary locations or removable media.
- **PowerShell Hardening:** Enforce constrained language mode for PowerShell and enable script block logging to detect and prevent malicious script execution, a common follow-on activity for RATs.
- **User Account Permissions:** Ensure users operate with standard, non-administrative privileges to limit the malware's ability to install itself and gain persistence.

**Tags:** APT, Crimson RAT, ISO file, Phishing, Startup, India, Pakistan

## Sources
- [Transparent Tribe Hacker Group Attacking India's Startup Ecosystem](https://www.gbhackers.com/transparent-tribe-hacker-group-attacking-indias-startup-ecosystem/) — GBHackers on Security (2026-02-06)
- [Transparent Tribe Hacker Group Attacking India's Startup Ecosystem](https://teamwinglobal.com/2026/02/07/transparent-tribe-hacker-group-attacking-indias-startup-ecosystem/) — Team Vin Global (2026-02-07)

---
Source: https://cyber.netsecops.io/articles/transparent-tribe-apt-pivots-to-target-indias-startup-ecosystem/
