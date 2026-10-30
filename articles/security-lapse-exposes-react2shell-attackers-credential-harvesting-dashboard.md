# Researchers Gain Access to Hacker Dashboard in React2Shell Campaign

**Severity:** high | **Category:** Vulnerability,Threat Intelligence,Threat Actor | **Updated:** 2026-04-04 | **Reading time:** 4 min

Researchers at Cisco Talos gained access to the operational dashboard of a threat group, UAT-10608, that is actively exploiting the React2Shell vulnerability (CVE-2025-55182) in Next.js applications. A security lapse in the attackers' own infrastructure left a web application fronting their stolen data collection exposed. This allowed Talos to view a trove of stolen credentials, API keys, and access tokens harvested from hundreds of compromised servers, including credentials for AWS and GitHub. Talos is now notifying the affected victims.

## Executive Summary
In a remarkable turn of events, researchers from **[Cisco Talos](https://www.talosintelligence.com/)** gained direct insight into a large-scale credential harvesting campaign by accessing the attackers' own backend infrastructure. A threat group, tracked as **UAT-10608**, was found actively exploiting **CVE-2025-55182**, a critical pre-authentication remote code execution (RCE) vulnerability in Next.js applications known as "React2Shell." The group's automated framework was compromising hundreds of hosts per day, exfiltrating credentials, API keys, and tokens to a database. However, a security misconfiguration by the attackers left their web-based dashboard for this database unprotected, allowing Talos researchers to observe the stolen data in real-time. The data included sensitive credentials for services like **[Amazon Web Services (AWS)](https://aws.amazon.com/)** and **[GitHub](https://github.com/)**. Talos is now in the process of notifying the hundreds of victim organizations.

## Threat Overview
The campaign centers on the mass exploitation of **CVE-2025-55182 (React2Shell)**, a vulnerability disclosed four months prior. This RCE flaw in Next.js allows an unauthenticated attacker to execute arbitrary code by sending a malicious serialized payload to a Server Function endpoint.

The threat group **UAT-10608** built an automated system to scan the internet for vulnerable servers and exploit them. The exploit payload was designed to harvest sensitive information from the compromised hosts, such as login credentials, environment variables, API keys, and access tokens. This data was then sent to a central database controlled by the attackers. In a display of poor operational security, the attackers' web application used to view and manage this stolen data was left exposed to the internet without a password, granting the Talos researchers a direct view into their operation.

## Technical Analysis
*   **Initial Access:** [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/). The entire campaign relies on the mass exploitation of the public-facing React2Shell vulnerability, **CVE-2025-55182**.
*   **Execution:** The vulnerability allows for remote code execution, likely through a deserialization flaw. The attackers' payload would then execute commands on the server.
*   **Credential Access:** The primary goal of the post-exploitation payload was credential harvesting. This could involve multiple techniques, such as [`T1552.001 - Credentials In Files`](https://attack.mitre.org/techniques/T1552/001/) to read configuration files, or [`T1552.005 - Cloud API Credentials`](https://attack.mitre.org/techniques/T1552/005/) to steal AWS or other cloud provider keys.
*   **Collection:** The harvested data was collected and sent to the attackers' database.

## Impact Assessment
The impact is widespread, affecting at least 766 hosts compromised in a single 24-hour period. Each compromised server represents a significant breach. The theft of **AWS** and **GitHub** credentials is particularly damaging, as these can be used to compromise entire cloud environments, access and poison source code repositories, or launch further supply chain attacks. For the victim organizations, this incident means not only is their web server compromised, but their core cloud and development infrastructure is also at immediate risk. The swift notification by Talos is critical to help these victims respond before the stolen credentials can be fully abused.

## Detection & Response
*   **Web Server & WAF Logs:** Monitor logs for HTTP requests to Server Function endpoints that contain suspicious serialized payloads. Signatures for **CVE-2025-55182** should be applied to Web Application Firewalls (WAFs).
*   **Vulnerability Scanning:** The most effective detection is to actively scan for and identify vulnerable Next.js applications in your environment.
*   **Credential Leakage Detection:** For victims, it is crucial to use the information provided by Talos to immediately rotate all exposed keys and credentials. Services like GitHub's secret scanning can also help detect committed credentials.
*   **Incident Response:** Any server found to be vulnerable to React2Shell should be considered fully compromised. It should be isolated, forensically analyzed, and rebuilt from a known-good state. All credentials and secrets on the machine must be rotated.

## Mitigation
*   **Patch Immediately:** The primary mitigation is to patch the React2Shell vulnerability (**CVE-2025-55182**) in all Next.js applications. Given that the flaw was disclosed four months ago, any unpatched system is at extreme risk.
*   **Secret Management:** Avoid storing secrets, API keys, and credentials in plaintext configuration files or environment variables on a web server. Use a dedicated secrets management solution like HashiCorp Vault or AWS Secrets Manager. This aligns with **[M1043 - Credential Access Protection](https://attack.mitre.org/mitigations/M1043/)**.
*   **Egress Filtering:** Restrict outbound internet access from web servers. Servers should only be allowed to connect to specific, required endpoints, which can prevent exploit payloads from exfiltrating data to an attacker's database.
*   **Web Application Firewall (WAF):** Deploy a WAF with rules specifically designed to block deserialization attacks and other attempts to exploit React2Shell. This is a form of **[M1050 - Exploit Protection](https://attack.mitre.org/mitigations/M1050/)**.

## CVEs
- CVE-2025-55182

**Tags:** React2Shell, CVE-2025-55182, Next.js, Cisco Talos, vulnerability, credential harvesting, OPSEC

## Sources
- [Security lapse lets researchers view React2Shell hackers' dashboard](https://www.csoonline.com/article/2126239/security-lapse-lets-researchers-view-react2shell-hackers-dashboard.html) — CSO Online
- [React2Shell Vulnerability (CVE-2025-55182) Actively Exploited in the Wild](https://www.action1.com/blog/react2shell-vulnerability-actively-exploited-in-the-wild/) — Action1

---
Source: https://cyber.netsecops.io/articles/security-lapse-exposes-react2shell-attackers-credential-harvesting-dashboard/
