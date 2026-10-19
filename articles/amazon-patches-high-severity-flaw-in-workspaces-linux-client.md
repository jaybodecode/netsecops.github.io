# Amazon Patches High-Severity Flaw in WorkSpaces Linux Client

**Severity:** high | **Category:** Vulnerability,Cloud Security,Patch Management | **Updated:** 2025-11-07 | **Reading time:** 4 min

Amazon Web Services (AWS) has patched a high-severity vulnerability, CVE-2025-12779, in its WorkSpaces client for Linux. The flaw, rated 8.8 CVSS, could allow a local attacker on a shared computer to extract another user's authentication token and gain unauthorized access to their virtual desktop session. The issue affects Linux client versions 2023.0 through 2024.8. AWS has released a patched version and recommends all users upgrade immediately to mitigate the risk.

## Executive Summary
**[Amazon Web Services (AWS)](https://aws.amazon.com/)** has remediated a high-severity vulnerability, **CVE-2025-12779**, in its **[Amazon WorkSpaces](https://aws.amazon.com/workspaces/)** client for the Linux operating system. The flaw, which carries a CVSS score of 8.8, stemmed from the improper handling of authentication tokens. Under specific conditions, this could allow a local user on a multi-user machine to extract a valid authentication token belonging to another user. An attacker could then use this token to hijack the victim's active DCV-based WorkSpace (virtual desktop) session. The vulnerability affects client versions from 2023.0 to 2024.8. AWS has released version 2025.0 of the Linux client to address the issue and advises all customers to upgrade promptly.

---

## Vulnerability Details
- **CVE-ID:** CVE-2025-12779
- **CVSS Score:** 8.8 (High)
- **Affected Software:** Amazon WorkSpaces client for Linux, versions 2023.0 through 2024.8.
- **Vulnerability Type:** Improper Handling of Sensitive Information (Authentication Token)
- **Attack Vector:** Local. An attacker needs to have local user access to the same physical Linux machine where a victim is also using the WorkSpaces client. This scenario is common in shared computing environments like university labs or corporate hot-desking setups.
- **Impact:** An attacker can extract a valid authentication token, which can then be used to gain unauthorized access to the victim's virtual desktop session. This allows the attacker to view and interact with the victim's WorkSpace, access their data, and potentially pivot to other resources accessible from that virtual desktop.

## Exploitation Status
There is no public evidence of in-the-wild exploitation at this time. The vulnerability was disclosed responsibly to AWS, allowing them to prepare and release a patch. However, the technical details are now public, increasing the likelihood of future exploitation attempts against unpatched systems.

## Impact Assessment
While the attack vector is local, the impact is significant for organizations that use shared Linux workstations. An attacker could gain full access to a colleague's or another user's entire work environment. This could lead to:
- **Data Breach:** Theft of sensitive corporate data, intellectual property, or personally identifiable information (PII) accessible from the victim's WorkSpace.
- **Privilege Escalation:** If the victim has elevated privileges within the corporate network, the attacker could leverage this access to move laterally and cause a much wider breach.
- **Compliance Violations:** Unauthorized access to sensitive data could result in violations of regulations like GDPR, HIPAA, or PCI DSS.
The risk is highest in environments where users with different privilege levels share the same physical machines.

## Detection Methods
- **Version Scanning:** Use asset management or endpoint management tools to identify all Linux machines running vulnerable versions (2023.0 through 2024.8) of the Amazon WorkSpaces client. **D3FEND Technique:** [`D3-AI: Asset Identification`](https://d3fend.mitre.org/technique/d3f:AssetIdentification).
- **Log Analysis:** While difficult to detect, post-compromise activity might be visible. Monitor WorkSpaces access logs in AWS CloudTrail for sessions originating from unexpected IP addresses, although a sophisticated attacker might try to proxy through the compromised machine. Look for unusual activity within a session that does not match the known user's behavior. **D3FEND Technique:** [`D3-UBA: User Behavior Analysis`](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis).

## Remediation Steps
1.  **Upgrade the Client:** The only way to fix the vulnerability is to upgrade the Amazon WorkSpaces client for Linux to version **2025.0** or later. This should be a high-priority task for all affected users. **D3FEND Technique:** [`D3-SU: Software Update`](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate).
2.  **Enforce Single User per Machine:** As a general security best practice, avoid having users with different access levels or roles share the same physical workstation where possible. This mitigates a wide range of local privilege escalation and information disclosure vulnerabilities.
3.  **User Communication:** Inform all users of the Amazon WorkSpaces Linux client about the vulnerability and provide clear instructions on how to upgrade. Track the upgrade progress to ensure all endpoints are patched.

## CVEs
- CVE-2025-12779 (CVSS 8.8)

**Tags:** AWS, Cloud Security, Vulnerability, CVE-2025-12779, Linux, Authentication

## Sources
- [Amazon Confirms WorkSpaces Linux Client Authentication Issue](https://www.forbes.com/sites/daveywinder/2025/11/07/amazon-confirms-workspaces-linux-client-authentication-issue/) — Forbes (2025-11-07)
- [AWS fixed a high-severity flaw in WorkSpaces Linux client](https://securityaffairs.com/158732/security/amazon-workspaces-linux-client-flaw.html) — Security Affairs (2025-11-07)

---
Source: https://cyber.netsecops.io/articles/amazon-patches-high-severity-flaw-in-workspaces-linux-client/
