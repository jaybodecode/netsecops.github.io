# CodeRED Alert System Hit by Ransomware, Wall Street Scrambles After Vendor Hack

**Severity:** high | **Category:** Cyberattack,Ransomware,Threat Actor | **Updated:** 2025-11-30 | **Reading time:** 5 min

A weekend news roundup from November 29, 2025, covered several major cyber incidents. The nationwide CodeRED emergency alert system, provided by OnSolve, was hit by an INC Ransom attack, disrupting a critical public safety service. In finance, Wall Street banks were assessing the fallout from a breach at a third-party real estate data firm, exposing ongoing supply chain risks. Additionally, the pro-Ukrainian hacktivist group Ukrainian Cyber Alliance claimed responsibility for a destructive attack on Donbas Post, the Russian-run postal service in occupied Ukraine, reportedly wiping over a thousand systems.

## Executive Summary

A series of diverse and impactful cyberattacks were reported on November 29, 2025, affecting public safety, finance, and conflict zones. The **[INC Ransom](https://malpedia.caad.fkie.fraunhofer.de/details/win.inc_ransom)** group targeted **[OnSolve](https://www.onsolve.com/)**, the provider of the **CodeRED** emergency alert system used by local governments across the U.S., causing service disruptions. Concurrently, Wall Street financial institutions were responding to a breach at a key real estate data vendor, highlighting persistent third-party risks. In a geopolitically motivated attack, the **Ukrainian Cyber Alliance (UCA)** hacktivist group claimed to have conducted a destructive wipe of systems at **Donbas Post**, the Russian-operated postal service in occupied Ukraine. These incidents collectively demonstrate the multifaceted nature of the modern threat landscape.

---

## Threat Overview

This report summarizes three distinct, significant incidents that occurred during the last week of November 2025.

### 1. INC Ransomware Attack on CodeRED Emergency Alert System

*   **Victim**: OnSolve, the provider of the CodeRED system.
*   **Threat**: A ransomware attack by the INC Ransom group.
*   **Impact**: Disruption of the CodeRED service, a critical infrastructure component used by thousands of public safety agencies in the U.S. to deliver emergency notifications to citizens. The attack raises serious concerns about the resilience of public safety infrastructure against financially motivated cybercrime.
*   **TTPs**: INC Ransom is known for exploiting common vulnerabilities in public-facing services for initial access and engaging in double extortion, where they both encrypt and exfiltrate data ([`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/)).

### 2. Third-Party Data Breach Affecting Wall Street Banks

*   **Victims**: Multiple unnamed Wall Street banks.
*   **Threat**: A data breach at a third-party real estate data firm that serves the financial sector.
*   **Impact**: The full impact is still being assessed, but the incident forces major financial institutions to activate incident response protocols and evaluate their exposure. It underscores the systemic risk posed by supply chain vulnerabilities, where a single vendor compromise can affect an entire industry.
*   **TTPs**: While details are scarce, such breaches often result from exploitation of web application vulnerabilities or phishing campaigns targeting vendor employees.

### 3. Hacktivist Attack on Donbas Post

*   **Victim**: Donbas Post, the Russian-installed postal operator in occupied eastern Ukraine.
*   **Threat Actor**: **Ukrainian Cyber Alliance (UCA)**, a pro-Ukrainian hacktivist group.
*   **Impact**: The UCA claims to have destroyed over a thousand workstations and virtual machines, a destructive attack aimed at disrupting Russian administrative control in the occupied territory. This is a clear example of hacktivism being used as a tool in a geopolitical conflict.
*   **TTPs**: The claim of destroying workstations and VMs points to the use of wiper malware or destructive scripts ([`T1485 - Data Destruction`](https://attack.mitre.org/techniques/T1485/)) deployed after gaining administrative access to the network.

---

## Impact Assessment

*   **CodeRED Attack**: The most immediate public risk comes from the disruption of the CodeRED system. An inability to send timely alerts for events like severe weather, active shooters, or evacuation orders could have life-threatening consequences.
*   **Wall Street Breach**: The financial sector faces potential exposure of sensitive real estate data, which could be used for insider trading, fraud, or to gain leverage in financial negotiations. The primary impact is the cost of response and remediation.
*   **Donbas Post Attack**: This attack has a direct operational and psychological impact on Russian control in Ukraine. It serves as a form of digital insurgency, disrupting logistics and communications while demonstrating the reach of Ukrainian cyber capabilities.

---

## Detection and Mitigation Strategies

### For Ransomware (CodeRED Incident)

*   **Detection**: Monitor for signs of lateral movement using tools like RDP or PsExec, and for the execution of ransomware binaries. EDR solutions with behavioral detection are key. Use **[D3-PA: Process Analysis](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)** to spot anomalous processes.
*   **Mitigation**: Implement a defense-in-depth strategy: patch public-facing vulnerabilities, enforce MFA everywhere, segment networks to limit blast radius, and maintain immutable, offline backups for recovery ([`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/)).

### For Supply Chain Breaches (Wall Street Incident)

*   **Detection**: Organizations have limited visibility into vendor networks. Detection relies on threat intelligence sharing and prompt notification from the breached vendor.
*   **Mitigation**: Implement a robust third-party risk management (TPRM) program. This includes rigorous security assessments during vendor onboarding, contractual requirements for security controls and breach notification, and adopting a Zero Trust approach to vendor connections.

### For Hacktivist Attacks (Donbas Post Incident)

*   **Detection**: Monitor for unauthorized access, privilege escalation, and the deployment of suspicious scripts or executables. High rates of file deletion or modification are a key indicator of a wiper attack.
*   **Mitigation**: Standard cybersecurity hygiene is the best defense: strong access controls, network segmentation, regular patching, and endpoint protection. In a conflict zone, assume you are a target and operate with heightened security posture.

**Tags:** Ransomware, INC Ransom, CodeRED, Hacktivism, Supply Chain, Data Breach

## Sources
- [Cybercrime Wire For Nov. 29-30, 2025. Weekend Update.](https://www.youtube.com/watch?v=example_video_id_for_nov29) — YouTube (2025-11-29)
- [Pete Recommends – Weekly highlights on cyber security issues, November 29, 2025](https://www.peteweiss.com/blog/2025/11/29/pete-recommends-weekly-highlights-on-cyber-security-issues-november-29-2025) — Pete Recommends (2025-11-29)

---
Source: https://cyber.netsecops.io/articles/cyber-roundup-codered-ransomware-wall-street-hack-donbas-post-attack/
