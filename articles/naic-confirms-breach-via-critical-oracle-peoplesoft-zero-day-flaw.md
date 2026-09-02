# ShinyHunters Exploits Oracle PeopleSoft Zero-Day to Breach Insurance Regulators

**Severity:** critical | **Category:** Vulnerability,Data Breach,Threat Actor | **Updated:** 2026-06-29 | **Reading time:** 5 min

The U.S. National Association of Insurance Commissioners (NAIC) has confirmed it was breached by the ShinyHunters threat group, who exploited a critical zero-day vulnerability in Oracle PeopleSoft (CVE-2026-35273). The flaw, rated 9.8 on the CVSS scale, allows for unauthenticated remote code execution and was used in a widespread campaign targeting over 100 organizations, primarily in higher education. The vulnerability was actively exploited for at least two weeks before a patch was released.

## Executive Summary

The U.S. **[National Association of Insurance Commissioners (NAIC)](https://content.naic.org/)** has fallen victim to a cyberattack leveraging a **critical** zero-day vulnerability in **[Oracle PeopleSoft](https://www.oracle.com/applications/peoplesoft/)**. The incident is part of a larger campaign attributed to the notorious data extortion group **[ShinyHunters](https://attack.mitre.org/groups/G1004/)**, which exploited the flaw, tracked as **CVE-2026-35273**, against more than 100 organizations globally. The vulnerability, which carries a CVSS score of 9.8, allows a remote, unauthenticated attacker to execute arbitrary code on affected systems. The campaign was active for at least 14 days before **[Oracle](https://www.oracle.com/)** released an emergency patch on June 10, 2026. While the NAIC states no personally identifiable information was compromised, the incident highlights the significant risk posed by zero-day exploits in widely used enterprise software.

---

## Vulnerability Details

The core of this attack is **CVE-2026-35273**, a critical remote code execution (RCE) vulnerability in Oracle PeopleSoft Enterprise PeopleTools.

*   **CVE ID**: `CVE-2026-35273`
*   **CVSS Score**: 9.8 (Critical)
*   **Attack Vector**: Network
*   **Attack Complexity**: Low
*   **Privileges Required**: None
*   **User Interaction**: None
*   **Description**: The vulnerability allows an unauthenticated attacker with network access via HTTP to completely compromise the PeopleSoft Enterprise PeopleTools system. The ease of exploitation and lack of authentication make this an extremely dangerous flaw.

## Affected Systems

The vulnerability affects the following versions of Oracle PeopleSoft Enterprise PeopleTools:

*   PeopleTools 8.61
*   PeopleTools 8.62

These versions are used by a wide range of organizations, including government agencies, universities, and large corporations, for managing human resources, finances, and other critical business functions.

## Exploitation Status

The vulnerability was actively exploited as a zero-day by the **ShinyHunters** group. The attack window for the campaign reportedly ran from May 27 to June 9, 2026. This means attackers had at least two weeks to exploit the flaw before Oracle released an out-of-band security alert and patch on June 10. The NAIC detected the breach on June 11. The **[Federal Bureau of Investigation (FBI)](https://www.fbi.gov/)** is investigating the broader campaign, which targeted over 100 organizations, with a heavy focus on the higher education sector.

## Impact Assessment

For the NAIC, the attackers gained temporary access to data storage areas containing publicly available financial data and credit rating information. The organization asserts that no PII or sensitive banking information was compromised. However, for other victims, the impact could be far more severe. A successful exploit of **CVE-2026-35273** gives an attacker full control over the PeopleSoft system. This could lead to:

*   **Massive Data Theft**: Exfiltration of sensitive employee and financial data, including PII, payroll information, and proprietary business data.
*   **Financial Fraud**: Manipulation of financial records or payment systems managed by PeopleSoft.
*   **Further Intrusion**: Use of the compromised PeopleSoft server as a beachhead to pivot deeper into the victim's network.
*   **Extortion**: ShinyHunters is a data extortion group, meaning they steal data and threaten to leak it unless a ransom is paid.

### Cyber Observables — Hunting Hints

The following patterns may help identify vulnerable or compromised systems:

| Type | Value | Description |
|---|---|---|
| Log Source | Web Server Logs (e.g., IIS, Apache, WebLogic) | Look for unusual POST or GET requests to PeopleSoft application URLs that do not match legitimate traffic patterns. |
| Process Name | `java.exe` or similar application server process | Monitor for child processes being spawned by the PeopleSoft application server process, such as `cmd.exe`, `powershell.exe`, or `sh`. This is a strong indicator of RCE. |
| File Path | PeopleSoft application directories | Use file integrity monitoring to detect the creation of unexpected files (e.g., web shells, scripts) in PeopleSoft web-accessible directories. |
| Network Traffic Pattern | Outbound connections from PeopleSoft servers | Look for connections to unknown external IP addresses, which could indicate C2 communication or data exfiltration. |

## Detection Methods

*   **Vulnerability Scanning**: Use vulnerability scanners with updated plugins to identify PeopleSoft instances running the vulnerable versions (8.61, 8.62).
*   **Log Analysis**: Review web server access logs for PeopleSoft systems for any requests from unknown or suspicious IP addresses, especially around the exploitation timeframe (late May to early June 2026). Look for requests that resulted in errors or had unusual parameters.
*   **Endpoint Monitoring**: Deploy EDR on PeopleSoft servers to detect suspicious process creation, such as the application server spawning a shell. This aligns with **D3FEND**'s [`D3-PA - Process Analysis`](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis).

## Remediation Steps

1.  **Immediate Patching**: Apply Oracle's out-of-band security patch for **CVE-2026-35273** immediately to all affected PeopleSoft Enterprise PeopleTools instances. (MITRE Mitigation: [`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/))
2.  **Assume Compromise**: If you were running a vulnerable version during the exploitation window, assume the system was compromised. Initiate a full incident response investigation.
3.  **Hunt for Malicious Activity**: Scrutinize logs and server files for any signs of unauthorized access, web shells, or newly created user accounts.
4.  **Isolate Systems**: If patching cannot be done immediately, restrict access to the PeopleSoft application from the internet or limit it to trusted IP addresses as a temporary compensating control. (MITRE Mitigation: [`M1035 - Limit Access to Resource Over Network`](https://attack.mitre.org/mitigations/M1035/))
5.  **Review Access**: Audit all user accounts and privileges within the PeopleSoft application, looking for any unauthorized changes.

## CVEs
- CVE-2026-35273 (CVSS 9.8) — CISA KEV

**Tags:** CVE-2026-35273, Oracle, PeopleSoft, Zero-day, ShinyHunters, NAIC, Data Breach, RCE

## Sources
- [NAIC breach exposes limits of zero-day defense for regulated entities](https://www.insurancebusinessmag.com/us/news/cyber/naic-confirms-peoplesoft-breach-as-cybercriminals-target-insurance-regulators-580134.aspx) — Insurance Business (2026-06-24)
- [Critical Oracle PeopleSoft Vulnerability Actively Exploited in ShinyHunters Campaign](https://arcticwolf.com/resources/blog/critical-oracle-peoplesoft-vulnerability-actively-exploited-in-shinyhunters-campaign/) — Arctic Wolf (2026-06-24)

---
Source: https://cyber.netsecops.io/articles/naic-confirms-breach-via-critical-oracle-peoplesoft-zero-day-flaw/
