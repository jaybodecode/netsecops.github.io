# React2Shell: Critical 10.0 CVSS RCE Hits React & Next.js, Actively Exploited!

**Severity:** critical | **Category:** Vulnerability,Cyberattack,Cloud Security | **Updated:** 2025-12-03 | **Reading time:** 6 min

A critical unauthenticated remote code execution (RCE) vulnerability, dubbed 'React2Shell' and tracked as CVE-2025-55182, has been disclosed in React Server Components. With a maximum CVSS score of 10.0, the flaw affects popular frameworks like Next.js and allows attackers to take complete control of vulnerable servers. Security researchers have already observed active exploitation in the wild, with attackers attempting to harvest cloud credentials and deploy cryptocurrency miners. Major cloud providers have issued WAF rules as a temporary mitigation, but immediate patching is essential.

## Executive Summary
A critical, unauthenticated remote code execution (RCE) vulnerability, **[CVE-2025-55182](https://nvd.nist.gov/vuln/detail/CVE-2025-55182)**, has been disclosed in React Server Components (RSC), affecting dependent frameworks like Next.js. Nicknamed 'React2Shell,' the flaw carries a CVSS 10.0 'Critical' severity rating and allows an attacker to execute arbitrary code on the server with no authentication. The vulnerability is being actively exploited in the wild for post-exploitation activities including cloud credential theft and cryptomining. Due to the widespread use of these frameworks and the ease of exploitation, all organizations using affected versions of React or Next.js must upgrade to patched versions immediately. Web Application Firewall (WAF) rules offer temporary protection but are not a substitute for patching.

---

## Vulnerability Details
**CVE-2025-55182** is a logical deserialization vulnerability in the way React Server Components process RSC payloads, also known as the "Flight" protocol. An unauthenticated attacker can send a specially crafted HTTP POST request to any Server Function endpoint on a vulnerable application. The server-side React library unsafely deserializes this malicious payload, leading to arbitrary JavaScript code execution in the context of the running Node.js process.

> Crucially, applications are vulnerable even if they do not explicitly define any Server Function endpoints, as the underlying RSC mechanism is still present and exploitable in affected versions. This significantly widens the attack surface.

## Affected Systems
The vulnerability impacts a range of popular web development tools and frameworks. Key affected products include:
- **React Server Components**: versions 19.0.0, 19.1.0, 19.1.1, 19.2.0
- **Next.js**: versions 15.x and 16.x that use the App Router
- `react-server-dom-parcel`
- `react-server-dom-turbopack`
- `react-server-dom-webpack`

According to **[Wiz](https://www.wiz.io)**, an estimated 39% of cloud environments contain vulnerable instances of these frameworks, highlighting the massive potential impact.

## Exploitation Status
Active, in-the-wild exploitation of **CVE-2025-55182** was observed by multiple security firms, including **[Amazon](https://aws.amazon.com/security/)** and Wiz, within hours of its public disclosure on December 3, 2025. Attackers, including groups identified as **Earth Lamia** and **Jackpot Panda**, are scanning for and exploiting vulnerable servers. Observed post-exploitation activities include:
- Probing for cloud environment metadata services to steal credentials.
- Deploying cryptocurrency mining malware.

## Impact Assessment
Successful exploitation of 'React2Shell' grants an attacker full control over the web server. The business impact is severe and can include:
- **Complete System Compromise:** Attackers can read, modify, or delete any data on the server, install backdoors, and maintain persistence.
- **Cloud Account Takeover:** If the server is hosted in a cloud environment (e.g., AWS, GCP, Azure), attackers can steal instance metadata credentials, potentially gaining access to the entire cloud account and its associated resources.
- **Data Breach:** Sensitive application data, user information, and intellectual property can be exfiltrated.
- **Financial Loss:** Attackers can deploy resource-intensive malware like cryptominers, leading to significant increases in cloud computing bills.

## Cyber Observables for Detection
Security teams should hunt for exploitation attempts by monitoring web server logs for suspicious requests.

| Type | Value | Description |
|---|---|---|
| url_pattern | Any Server Function endpoint | Monitor HTTP POST requests to any endpoint that handles React Server Components. |
| network_traffic_pattern | Outbound connections from Node.js process to cloud metadata services | A `node` process trying to access `169.254.169.254` is a strong indicator of compromise. |
| process_name | `node` spawning unexpected child processes | Look for the Node.js process spawning shells (`/bin/sh`, `cmd.exe`) or downloading tools like `curl` and `wget`. |

## Detection & Response
- **WAF Deployment:** Immediately enable WAF rules provided by cloud vendors like **[Cloudflare](https://www.cloudflare.com/)**, **[AWS](https://aws.amazon.com/)**, **[Akamai](https://www.akamai.com/)**, and **[Google Cloud](https://cloud.google.com/)**. These rules are designed to block known exploit patterns for **CVE-2025-55182**. This is a form of [`D3-ITF: Inbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:InboundTrafficFiltering).
- **Log Analysis:** Proactively hunt through web server and WAF logs for HTTP POST requests containing unusual or obfuscated payloads directed at RSC endpoints. Correlate these with any anomalous outbound network connections from your web servers.
- **Endpoint Monitoring:** Use EDR or similar tools on servers to detect if the `node` process spawns suspicious child processes or makes connections to unexpected external IP addresses or internal metadata services.

## Remediation Steps
> WAF rules are a temporary stopgap, not a permanent solution. Patching is the only definitive remediation.

1.  **Upgrade Immediately:** Developers must upgrade all affected applications to a patched version of the relevant library (e.g., Next.js, React). Refer to the official security advisories from React and Vercel for specific patched versions. This aligns with MITRE Mitigation [`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/).
2.  **Vulnerability Scanning:** Run software composition analysis (SCA) or vulnerability scanners to identify all instances of vulnerable libraries across your environment, including in development and testing pipelines.
3.  **Network Segmentation:** As a compensating control, restrict outbound network access from web servers to only essential services. Block access to cloud metadata endpoints (`169.254.169.254`) if not explicitly required by the application. This is an application of [`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/).

## CVEs
- CVE-2025-55182 (CVSS 10)
- CVE-2025-66478 (CVSS 10)

**Tags:** React, Next.js, RCE, Vulnerability, CVSS 10, Zero-Day, Deserialization, WAF

## Sources
- [Critical RSC Bugs in React and Next.js Allow Unauthenticated Remote Code Execution](https://thehackernews.com/2025/12/critical-rsc-bugs-in-react-and-nextjs.html) — The Hacker News (2025-12-03)
- [NVD - CVE-2025-55182](https://nvd.nist.gov/vuln/detail/CVE-2025-55182) — NIST NVD (2025-12-03)
- [Critical Security Vulnerability in React Server Components](https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-) — React (2025-12-03)

---
Source: https://cyber.netsecops.io/articles/critical-react2shell-rce-flaw-disclosed-in-react-and-nextjs/
