# Operation Endgame: Global Law Enforcement Disrupts SocGholish, Cleans 15,000 Infected Websites

**Severity:** medium | **Category:** Security Operations,Threat Actor,Malware | **Updated:** 2026-06-24

In a major blow to cybercrime, an international law enforcement coalition under 'Operation Endgame' has disrupted the notorious SocGholish malware delivery network. The operation took down 106 command-and-control servers and cleaned nearly 15,000 malware-infected WordPress websites. SocGholish, also known as 'FakeUpdates,' is a prolific initial access broker attributed to the Russian cybercrime group Evil Corp. It operated by compromising websites and using fake browser update lures to infect visitors. This access was then sold or used to deploy secondary payloads like the LockBit and RansomHub ransomware. The coordinated takedown involved authorities from the U.S., Germany, the Netherlands, and Canada, significantly hampering a key entry point for numerous ransomware and espionage campaigns.

## Executive Summary

An international law enforcement effort, part of the broader **Operation Endgame**, has successfully disrupted the infrastructure of the **[SocGholish](https://attack.mitre.org/software/S0607/)** malware network. The operation, a collaboration between authorities in the U.S., Germany, the Netherlands, and Canada with support from **Europol**, resulted in the takedown of 106 command-and-control (C&C) servers. Additionally, the coalition cleaned malware from 14,971 compromised **[WordPress](https://wordpress.org/)** websites that were being used to distribute the malware. SocGholish is a major initial access broker (IAB) linked to the Russian cybercrime group **[Evil Corp](https://attack.mitre.org/groups/G0114/)** (also known as Indrik Spider). The disruption strikes a significant blow against a key facilitator of ransomware and other high-impact cyberattacks.

## Incident Timeline

-   **2017:** SocGholish malware first observed in the wild.
-   **Ongoing:** The group compromises thousands of websites, primarily running WordPress, and uses them as a distribution platform.
-   **June 18-19, 2026:** As part of Operation Endgame, law enforcement agencies seize 106 C&C servers and domains used by SocGholish.
-   **June 19, 2026:** Authorities announce the successful disruption and the cleaning of nearly 15,000 infected websites.

## Response Actions

The coordinated operation involved several key actions:
1.  **Infrastructure Takedown:** Law enforcement agencies in multiple countries worked together to seize or sinkhole 106 servers that formed the backbone of the SocGholish C&C network. This action severed the connection between the infected websites and the attackers, preventing them from issuing new commands or deploying further payloads.
2.  **Victim Notification and Remediation:** The operation identified 14,971 compromised WordPress sites. Law enforcement, in conjunction with cybersecurity partners, removed the malicious JavaScript and backdoors from these sites. The owners of the affected websites were notified and provided with guidance to secure their platforms, including changing credentials and applying updates.
3.  **Intelligence Gathering:** The seized infrastructure will be analyzed to gather intelligence on the operators, identify more victims, and understand the full scope of the operation.

## Technical Findings

**SocGholish**, also known as **FakeUpdates**, operates using a drive-by compromise model (**[T1189 - Drive-by Compromise](https://attack.mitre.org/techniques/T1189/)**). The attack flow is as follows:

1.  **Website Compromise:** The attackers exploit vulnerabilities in content management systems (CMS) like WordPress, Joomla, and Drupal to inject malicious JavaScript into legitimate websites.
2.  **Visitor Profiling:** When a user visits an infected site, the malicious script executes in their browser. It profiles the visitor's system to determine if it is a suitable target (e.g., not a security researcher, within a specific geographic region).
3.  **Social Engineering:** If the visitor is deemed a target, the script displays a convincing but fake browser update prompt (e.g., for Chrome or Firefox). This lure tricks the user into downloading and executing a malicious file, which is often a ZIP archive containing a JScript loader.
4.  **Payload Delivery:** The initial loader, often referred to as **Gholoader**, establishes a foothold and communicates with the C&C server. It then downloads and executes second-stage payloads. SocGholish is known to be a delivery mechanism for a wide variety of malware, including:
    *   Ransomware: **[LockBit](https://attack.mitre.org/software/S0613/)**, RansomHub
    *   Banking Trojans: **[Dridex](https://attack.mitre.org/software/S0384/)**
    *   Loaders and RATs: **Raspberry Robin**, **AsyncRAT**, **NetSupport RAT**

This makes SocGholish a critical link in the cybercrime supply chain, providing the initial access needed for some of the world's most damaging ransomware attacks.

## Lessons Learned

-   **Effectiveness of International Cooperation:** This operation highlights the success of coordinated, public-private partnerships in combating global cybercrime infrastructure.
-   **The Importance of IABs:** The focus on disrupting an Initial Access Broker like SocGholish is a strategic move that has a cascading effect, disrupting the operations of numerous other cybercrime groups that rely on them.
-   **CMS Security is Critical:** The large number of compromised WordPress sites underscores the ongoing challenge of securing popular web platforms. Unpatched plugins, weak credentials, and lack of monitoring remain common entry points.

## Mitigation Recommendations

For website owners:
-   **Patch Management:** Keep your CMS (WordPress, Joomla, etc.) and all plugins/themes updated to the latest versions. This is a form of **[M1051 - Update Software](https://attack.mitre.org/mitigations/M1051/)**.
-   **Credential Security:** Use strong, unique passwords for all administrative accounts and enable **[Multi-factor Authentication (M1032)](https://attack.mitre.org/mitigations/M1032/)**.
-   **File Integrity Monitoring:** Use security plugins or services to monitor for unauthorized changes to your website's files.

For end-users and organizations:
-   **User Training:** Train users to be suspicious of unsolicited browser update prompts and to only download updates from official sources. This aligns with **[M1017 - User Training](https://attack.mitre.org/mitigations/M1017/)**.
-   **Ad Blockers/Script Blockers:** Use web filtering or script-blocking browser extensions to prevent malicious JavaScript from executing.
-   **Execution Prevention:** Configure systems to block the execution of JScript files (`.js`, `.jse`) by default.

**Tags:** Botnet Takedown, Evil Corp, FakeUpdates, Initial Access Broker, Operation Endgame, SocGholish, WordPress

## Sources
- [15,000 WordPress Websites Cleaned Up in SocGholish Botnet Takedown](https://www.securityweek.com/15000-wordpress-websites-cleaned-up-in-socgholish-botnet-takedown/) (2026-06-19)
- [Operation Endgame Disrupts SocGholish Servers, Cleans 14,971 WordPress Sites](https://thehackernews.com/2026/06/operation-endgame-disrupts-socgholish.html) (2026-06-19)
- [Law enforcement hits SocGholish: 106 servers down, 15,000 sites cleaned](https://www.helpnetsecurity.com/2026/06/18/law-enforcement-socgholish-operation-endgame/) (2026-06-18)
- [Authorities disrupt Evil Corp’s SocGholish botnet](https://cyberscoop.com/socgholish-malware-botnet-takedown-evilcorp/) (2026-06-18)

---
Source: https://cyber.netsecops.io/articles/global-police-operation-cleans-15000-sites-in-socgholish-takedown/
