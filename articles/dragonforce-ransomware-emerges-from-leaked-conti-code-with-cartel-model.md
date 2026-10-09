# Conti's Ghost: New 'DragonForce' Ransomware Adopts Cartel Model

**Severity:** high | **Category:** Ransomware,Threat Actor,Malware | **Updated:** 2025-11-04 | **Reading time:** 4 min

A new ransomware operation named DragonForce has been identified by security researchers, notable for its use of leaked source code from the infamous Conti ransomware. Instead of a traditional Ransomware-as-a-Service (RaaS) model, DragonForce operates with a 'cartel-like' structure, providing affiliates with a builder to create their own branded ransomware variants. This approach facilitates the rapid proliferation of new threats, with groups like 'Devman' already seen deploying malware created with the DragonForce builder. The core malware retains Conti's technical features, including its encryption scheme and ability to spread via SMB.

## Executive Summary
The cybercrime landscape continues to evolve with the emergence of **DragonForce**, a new ransomware group built upon the leaked source code of the notorious **[Conti](https://attack.mitre.org/groups/G0105/)** operation. Researchers from the **[Acronis](https://www.acronis.com/)** Threat Research Unit have analyzed this new threat, highlighting its unique 'cartel-style' business model. Unlike a typical Ransomware-as-a-Service (RaaS) where affiliates use a centralized platform, DragonForce provides its partners with a malware builder. This allows affiliates to generate their own distinct, branded ransomware variants while leveraging the proven and potent Conti codebase. This model lowers the barrier to entry for sophisticated attacks and signals a dangerous trend of modularization in the ransomware ecosystem.

---

## Threat Overview
DragonForce represents the dangerous second life of leaked source code from major threat groups. After the Conti leaks in 2022, its code became a valuable resource for other criminals. DragonForce has capitalized on this by creating a framework that empowers other, smaller groups. They actively recruit affiliates and equip them with the tools to launch their own campaigns.

This 'cartel' model means that instead of a single DragonForce ransomware, we may see numerous variants with different names and ransom notes, all stemming from the same core builder. One such group, identified as 'Devman,' has already been observed deploying ransomware created using the DragonForce platform. The DragonForce operators themselves are active, having issued public threats to leak victim data, indicating ongoing campaigns against unspecified targets.

---

## Technical Analysis
At its core, the DragonForce ransomware is technically a derivative of Conti. Key characteristics include:
*   **Encryption:** It uses the same combination of **ChaCha20** for file content encryption and **RSA** for key protection, a fast and secure scheme.
*   **Lateral Movement:** The malware retains Conti's ability to spread across a network by exploiting the Server Message Block (SMB) protocol, enabling it to infect multiple systems from a single entry point. This corresponds to [`T1021.002 - SMB/Windows Admin Shares`](https://attack.mitre.org/techniques/T1021/002/).
*   **Impact:** As with Conti, it performs [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/) and likely deletes shadow copies via [`T1490 - Inhibit System Recovery`](https://attack.mitre.org/techniques/T1490/) to hinder restoration efforts.
*   **Metadata:** Each encrypted file includes a metadata block that specifies the encryption mode and size, a technical fingerprint inherited from its predecessor.

---

## Impact Assessment
The emergence of DragonForce and its cartel model has several significant implications for the threat landscape:
1.  **Proliferation of Threats:** By providing a builder, DragonForce makes it easier for less-skilled actors to launch sophisticated ransomware attacks, increasing the overall volume of threats.
2.  **Attribution Challenges:** The use of multiple branded variants by different affiliate groups will make it more difficult for researchers and law enforcement to track and attribute attacks to a single source operation.
3.  **Lowered Barrier to Entry:** This model effectively democratizes advanced ransomware, turning the Conti source code into a reusable and customizable weapon for a wider criminal audience.

---

## Cyber Observables for Detection
Since DragonForce is based on Conti, defenders can hunt for Conti-like TTPs:

| Type | Value | Description |
|:--- |:--- |:--- |
| command_line_pattern | `net view` or `net use` | Used for network reconnaissance to find shares for lateral movement. |
| network_traffic_pattern | High volume of SMB traffic (port 445) | Indicates attempts to spread across the network. |
| process_name | `vssadmin.exe` | Used with `Delete Shadows` argument to inhibit system recovery. |
| file_name | `readme.txt` or similar | Common ransom note name used by Conti variants. |

---

## Detection & Response
Defending against Conti-derived threats requires a multi-layered approach.
*   **Network Monitoring:** Actively monitor for unusual SMB activity, especially widespread scanning on port 445 from a single host. This can be an early indicator of lateral movement attempts. D3FEND's [`Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) is key.
*   **EDR/XDR:** Deploy an EDR solution capable of detecting Conti's known behaviors, such as the specific command-line arguments used to delete shadow copies, disable security tools, and enumerate network shares.
*   **Deception Technology:** Use honeypots and honeytokens (decoy files and accounts) to detect reconnaissance and lateral movement. An alert on an unused 'admin' account or a fake network share provides a high-fidelity signal of an intrusion.

---

## Mitigation
*   **Network Segmentation:** Implement robust network segmentation to limit the blast radius of a ransomware attack. If an attacker compromises one segment, they should not be able to easily spread to critical servers in another. This is a core principle of D3FEND's [`Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation).
*   **Patch Management:** Keep all systems, especially those with SMB services, fully patched to prevent exploitation of known vulnerabilities for lateral movement.
*   **Immutable Backups:** Maintain offline and immutable backups of critical data. Follow the 3-2-1 rule (three copies, on two different media, with one offsite) and regularly test your restoration process. This is the ultimate defense against data encryption.

**Tags:** DragonForce, Conti, ransomware, cartel, RaaS, malware, source code leak

## Sources
- [DragonForce Cartel Emerges as Conti-Derived Ransomware Threat](https://www.infosecurity-magazine.com/news/dragonforce-cartel-conti-derived/) — Infosecurity Magazine (2025-11-04)

---
Source: https://cyber.netsecops.io/articles/dragonforce-ransomware-emerges-from-leaked-conti-code-with-cartel-model/
