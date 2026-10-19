# 'FinReact' Phishing Campaign Uses AI-Generated Lures and 'GhostScript' Loader to Target Banks

**Severity:** high | **Category:** Phishing,Malware,Threat Intelligence | **Updated:** 2026-07-01 | **Reading time:** 6 min

A highly sophisticated phishing campaign named 'FinReact' is targeting the financial services industry. Researchers at Proofpoint report that the campaign uses generative AI to create convincing, context-aware email lures that bypass traditional security. The attack chain involves a password-protected ZIP file containing a malicious LNK file, which downloads a novel JavaScript loader called 'GhostScript'. This loader performs anti-sandbox checks before deploying information-stealing malware like Vidar and IcedID. The campaign is attributed to a skilled, financially motivated threat actor.

## Executive Summary

Security researchers at **Proofpoint** have identified a sophisticated, large-scale phishing campaign, 'FinReact', targeting the financial services sector. This operation is notable for its use of generative **[AI](https://en.wikipedia.org/wiki/Artificial_intelligence)** to craft highly convincing and personalized email lures, making them difficult to detect. The campaign's goal is to deploy information-stealing malware, such as **[Vidar](https://malpedia.caad.fkie.fraunhofer.de/details/win.vidar)** and **[IcedID](https://attack.mitre.org/software/S0048/)**, by tricking victims into executing a malicious LNK file. This triggers a multi-stage infection process involving a new, evasive JavaScript loader named **GhostScript**. The campaign demonstrates a significant evolution in the tactics of financially motivated cybercriminals.

---

## Threat Overview

The 'FinReact' campaign represents a significant step up in the quality of phishing attacks. By leveraging generative AI, the attackers can create emails that are grammatically perfect, contextually relevant, and personalized to the target, often appearing as a reply to an existing email thread.

*   **Targeting:** The campaign is specifically aimed at employees in banks, investment firms, and other financial institutions.
*   **Initial Delivery:** The attack begins with an AI-generated email containing a password-protected ZIP file. The password is included in the body of the email, a technique designed to bypass automated email attachment scanners.
*   **Infection Chain:**
    1.  The user opens the ZIP file and then the malicious LNK shortcut inside.
    2.  The LNK file executes a PowerShell command.
    3.  The PowerShell command downloads the **GhostScript** JavaScript loader.
    4.  **GhostScript** performs anti-analysis checks (e.g., for sandboxes and VMs).
    5.  If the checks pass, it downloads and executes the final payload, which is an information stealer like **Vidar** or **IcedID**.

## Technical Analysis

The **GhostScript** loader is a key component of this campaign. It is a novel piece of malware designed for evasion. Its ability to check for virtualized environments before proceeding makes it difficult for automated analysis systems to detonate and study the final payload. This ensures the attackers' more valuable malware (the info-stealers) are only exposed in real victim environments.

The use of AI for lure creation is the other major innovation. This allows the attackers to scale their operation without sacrificing quality, producing thousands of unique, high-quality phishing emails that can bypass reputation-based and signature-based email security filters.

### MITRE ATT&CK TTPs

*   **Initial Access:** [`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/) - The ZIP file attached to the email.
*   **Execution:** [`T1204.002 - Malicious File`](https://attack.mitre.org/techniques/T1204/002/) - The user is tricked into clicking the LNK file.
*   **Execution:** [`T1059.001 - PowerShell`](https://attack.mitre.org/techniques/T1059/001/) - The LNK file executes a PowerShell download cradle.
*   **Defense Evasion:** [`T1622 - Debugger Evasion`](https://attack.mitre.org/techniques/T1622/) - The GhostScript loader performs anti-analysis checks.
*   **Execution:** [`T1059.007 - JavaScript`](https://attack.mitre.org/techniques/T1059/007/) - The GhostScript loader itself is JavaScript-based.
*   **Credential Access:** [`T1555 - Credentials from Password Stores`](https://attack.mitre.org/techniques/T1555/) - The final payload (Vidar/IcedID) steals credentials from browsers and other applications.

## Impact Assessment

A successful compromise can have significant financial and operational consequences for the targeted firms:

*   **Credential Theft:** The theft of browser credentials and session cookies can allow attackers to bypass MFA and gain access to corporate banking portals, trading platforms, and internal systems.
*   **Financial Fraud:** Attackers can use the stolen access to initiate fraudulent transactions, a primary goal for financially motivated actors.
*   **Data Breach:** The info-stealers can harvest a wide range of sensitive data from the compromised workstation, leading to a data breach.
*   **Ransomware Foothold:** Stolen credentials are often sold to or used by other threat actors, including ransomware groups, as an initial access vector for more disruptive attacks.

## Detection & Response

*   **Detection:**
    *   **Email Security:** Look for emails containing password-protected ZIP files with the password in the body. While this is a legitimate use case sometimes, it is also a common evasion tactic and should be flagged for higher scrutiny.
    *   **Endpoint Monitoring:** Monitor for the execution of LNK files that spawn PowerShell. Create EDR rules to detect and block this behavior. D3FEND's [`Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis) is key here.
    *   **PowerShell Logging:** Enable PowerShell Script Block Logging (Event ID 4104) to capture the content of executed PowerShell scripts, which can reveal the download URL used by the LNK file.
*   **Response:**
    *   If a user reports falling for the phish, immediately isolate their workstation from the network.
    *   Reset all of the user's credentials, especially for financial and cloud-based systems.
    *   Perform a forensic analysis of the machine to identify the final payload and any C2 communication.

## Mitigation

*   **User Training:** This is critical. Train users to be suspicious of any email with an attachment, especially ZIP files, and to never open files from unverified sources. They should be taught to report suspicious emails immediately.
*   **Block LNK files:** Where possible, configure email gateways to block incoming LNK files within ZIP archives. Or, configure Windows to prevent LNK files from being executed from network or removable drives.
*   **Attack Surface Reduction (ASR):** Use Microsoft Defender's ASR rules to block office applications and script execution from creating child processes, which can break the infection chain.
*   **Endpoint Hardening:** Restrict the use of PowerShell for standard users where it is not required for their job function.

**Tags:** phishing, ai, social engineering, malware, infostealer, icedid, vidar, financial services

## Sources
- [FinReact: AI-Powered Phishing Campaign Targets Financial Sector with Evasive 'GhostScript' Loader](https://www.proofpoint.com/us/blog/threat-research/finreact-ai-powered-phishing-targets-financial-sector) — Proofpoint (2026-07-01)
- ['FinReact' Phishing Campaign Uses Convincing AI Lures to Breach Banks](https://threatpost.com/finreact-phishing-ai-lures-banks/178234/) — Threatpost (2026-07-01)

---
Source: https://cyber.netsecops.io/articles/finreact-phishing-campaign-targets-financial-sector-with-ai-lures/
