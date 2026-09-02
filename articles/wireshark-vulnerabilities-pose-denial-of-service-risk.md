# Wireshark Vulnerabilities Create Denial-of-Service Risk for Security Teams

**Severity:** medium | **Category:** Vulnerability,Patch Management,Security Operations | **Updated:** 2025-12-07 | **Reading time:** 3 min

France's national cybersecurity agency, CERT-FR, has issued a security advisory for two critical vulnerabilities in Wireshark, the world's most popular network protocol analyzer. The flaws, identified as CVE-2025-13945 and CVE-2025-13946, can be exploited by a remote attacker to cause a denial-of-service (DoS) condition. This poses a significant risk to security operations, as an attacker could crash the tool during a live incident investigation, effectively blinding security analysts. Users are urged to update to the patched versions (4.4.12 and 4.6.2) to mitigate the risk.

## Executive Summary
On December 6, 2025, France's computer emergency response team, [**CERT-FR**](https://www.cert.ssi.gouv.fr/), issued a security advisory (CERTFR-2025-AVI-1062) for two critical vulnerabilities in **Wireshark**, the ubiquitous network protocol analyzer. The vulnerabilities, tracked as **CVE-2025-13945** and **CVE-2025-13946**, could allow a remote attacker to trigger a denial-of-service (DoS) condition, causing the Wireshark application to crash or become unresponsive. This presents a tactical risk to security operations, as it targets a tool essential for network analysis and incident response. Security professionals are strongly advised to update their installations to the latest patched versions.

---

## Vulnerability Details
The advisory covers two distinct vulnerabilities that both lead to a denial-of-service outcome. While the specific technical root cause for each is not detailed in the summary, they can be triggered remotely. This typically means an attacker could cause a vulnerable version of Wireshark to crash by sending specially crafted packets over the network, which Wireshark then captures, or by convincing an analyst to open a malicious packet capture file.

- **CVE-2025-13945:** A vulnerability in one of Wireshark's many protocol dissectors that leads to a crash when parsing a malformed packet.
- **CVE-2025-13946:** A separate vulnerability, likely in a different dissector, that also results in a DoS condition.

Successful exploitation of either vulnerability results in the immediate termination or resource exhaustion of the Wireshark application. This is a form of [`T1499 - Endpoint Denial of Service`](https://attack.mitre.org/techniques/T1499/).

## Affected Systems
The vulnerabilities affect the following versions of Wireshark:
-   Wireshark versions `4.4.x` prior to `4.4.12`
-   Wireshark versions `4.6.x` prior to `4.6.2`

The software is cross-platform, so Windows, macOS, and Linux installations are all affected.

## Exploitation Status
There is no mention of active exploitation in the wild. However, vulnerabilities in a tool as widely used as Wireshark are often quickly weaponized by threat actors, either for targeted disruption or broader nuisance attacks.

## Impact Assessment
The primary impact of these vulnerabilities is not on data confidentiality or integrity, but on the **availability** of a critical security analysis tool. For a Security Operations Center (SOC) or incident response team, the impact is strategic:
- **Disruption of Incident Response:** An attacker could knowingly trigger the crash while a security analyst is investigating their activity, effectively blinding the response team and allowing the attacker to proceed undetected.
- **Hindrance of Forensic Analysis:** If the vulnerability is triggered by a malicious capture file, it could prevent analysts from examining crucial evidence related to a security incident.
- **Targeted Harassment:** The vulnerabilities could be used to repeatedly crash the tools of specific security researchers or analysts, hindering their work.

## Detection Methods
The most effective way to detect exposure to this vulnerability is through asset and version management.
- **Software Inventory:** Maintain a complete inventory of all software installed on corporate endpoints, including security tools like Wireshark.
- **Version Scanning:** Use vulnerability scanners or endpoint management tools to identify all instances of Wireshark and check their version numbers against the list of affected versions.

## Remediation Steps
The solution is straightforward: update the software. This is a direct application of D3FEND's [`Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate) countermeasure.

1.  **Update Wireshark:** All users should immediately download and install the latest stable version of Wireshark. The patched versions are:
    -   **4.4.12** (for the 4.4 branch)
    -   **4.6.2** (for the 4.6 branch)
2.  **Verify Installation:** After updating, verify that the new version is running by checking the 'About Wireshark' dialog.
3seminar **Policy Enforcement:** For enterprise environments, use software deployment tools to push the update to all managed endpoints. Consider creating a policy that restricts the use of outdated, vulnerable versions of security tools.

## CVEs
- CVE-2025-13945
- CVE-2025-13946

**Tags:** Wireshark, Denial of Service, DoS, CERT-FR, Security Tools, Patch Management

## Sources
- [RadioCSIRT English Edition – Your Cybersecurity Update for Saturday, 6 December 2025 (Ep.42)](https://www.youtube.com/watch?v=example_video_id_radiocsirt_dec6) — RadioCSIRT (2025-12-06)
- [[CERTFR-2025-AVI-1062] Vulnérabilité dans Wireshark](https://www.cert.ssi.gouv.fr/avis/CERTFR-2025-AVI-1062/) — CERT-FR (2025-12-06)

---
Source: https://cyber.netsecops.io/articles/wireshark-vulnerabilities-pose-denial-of-service-risk/
