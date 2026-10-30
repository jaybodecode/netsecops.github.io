# Statamic CMS Flaw (CVE-2026-28423) Enables Cloud Credential Theft via SSRF

**Severity:** medium | **Category:** Vulnerability,Cloud Security,Cyberattack | **Updated:** 2026-03-01 | **Reading time:** 5 min

A Server-Side Request Forgery (SSRF) vulnerability, CVE-2026-28423, has been disclosed in the Statamic content management system. The flaw, which has a CVSS score of 6.8, exists in the Glide image manipulation feature. An unauthenticated attacker can exploit it to force the server to make HTTP requests to internal network services or, more critically, to cloud metadata endpoints. This could allow an attacker to steal sensitive cloud credentials (e.g., from an AWS EC2 instance), leading to a full compromise of the underlying cloud infrastructure. Users are advised to patch or reconfigure the feature to prevent abuse.

## Executive Summary

A high-complexity Server-Side Request Forgery (**[SSRF](https://en.wikipedia.org/wiki/Server-side_request_forgery)**) vulnerability, tracked as [`CVE-2026-28423`](https://www.cve.org/CVERecord?id=CVE-2026-28423), has been discovered in the **[Statamic](https://statamic.com/)** content management system (CMS). The flaw resides in the Glide image manipulation feature and can be exploited by an unauthenticated attacker to coerce the server into sending arbitrary HTTP requests. The most severe impact of this vulnerability is the potential for an attacker to query cloud provider metadata services (such as the **[AWS](https://aws.amazon.com/)** metadata endpoint) and steal temporary instance credentials. These credentials could then be used to gain unauthorized access to other cloud services, leading to a full infrastructure compromise. Although the vulnerability has a moderate CVSS score of 6.8 due to its complexity, the potential impact is high, and users should take immediate action.

---

## Vulnerability Details

- **CVE ID:** `CVE-2026-28423`
- **CVSS v3.1 Score:** 6.8 (Medium)
- **Vulnerability Type:** Server-Side Request Forgery (SSRF)
- **Affected Component:** Glide image manipulation feature
- **Attack Vector:** Network
- **Privileges Required:** None

An unauthenticated attacker can exploit this flaw by crafting a special URL that targets the Statamic image proxy or by using the watermark feature. The server-side code does not properly validate the user-supplied URL, causing the server to initiate a request to the attacker-specified address. This allows the attacker to bypass firewall rules and interact with services on the server's internal network or with cloud metadata endpoints.

---

## Affected Systems

- **Product:** Statamic CMS
- **Configuration:** Instances where the Glide image manipulation feature is enabled and configured in an insecure mode.

---

## Exploitation Status

There is currently no evidence of active exploitation or a publicly available proof-of-concept (PoC) for this vulnerability. However, with the public disclosure, security researchers and threat actors will likely begin developing exploits.

---

## Impact Assessment

A successful SSRF attack can have several serious consequences:
- **Internal Network Scanning:** Attackers can map out the internal network, discover services, and identify further vulnerabilities.
- **Internal Service Interaction:** They can interact with internal, unauthenticated services (e.g., internal APIs, admin panels).
- **Cloud Credential Theft:** This is the most critical risk. By making a request to a cloud metadata service (e.g., `http://169.254.169.254/latest/meta-data/iam/security-credentials/[role-name]`), an attacker can steal temporary IAM credentials. These credentials can then be used with AWS CLI or APIs to access S3 buckets, databases, and other cloud resources, leading to a complete takeover of the cloud account.

---

## Cyber Observables for Detection

| Type | Value | Description |
|---|---|---|
| url_pattern | Glide image URLs containing internal or metadata IP addresses | Look for requests to the Glide image proxy that include IPs like `127.0.0.1`, `10.0.0.0/8`, or `169.254.169.254`. |
| network_traffic_pattern | Outbound requests from web server to cloud metadata service | Any network traffic from a web server instance to `169.254.169.254` is highly suspicious and a strong indicator of an SSRF attack. |
| log_source | Web server access logs | Scrutinize logs for unusual URL patterns in requests to the image processing endpoints. |

---

## Detection Methods

1.  **Egress Traffic Filtering and Monitoring:** Monitor all outbound network traffic from web servers. Alerts should be generated for any attempt to connect to the cloud metadata IP address (`169.254.169.254`). This is a critical detection and prevention control.
2.  **Web Application Firewall (WAF):** Deploy a WAF with rules specifically designed to detect and block common SSRF patterns in URL parameters and other inputs. This is an application of D3FEND's [`Inbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:InboundTrafficFiltering).
3.  **Log Analysis:** Analyze web server and application logs for requests containing internal IP addresses or the metadata service IP, which are tell-tale signs of an SSRF attempt.

---

## Remediation Steps

1.  **Apply Patches:** Update to the latest version of Statamic, which contains a patch for this vulnerability.
2.  **Harden Cloud Metadata Access:** For AWS EC2 instances, enforce the use of Instance Metadata Service Version 2 (IMDSv2). IMDSv2 requires a session token for metadata requests, which mitigates most standard SSRF attacks. This can be enforced via IAM policies or at the time of instance launch.
3.  **Secure Configuration:** If patching is not immediately possible, review the Statamic Glide configuration. Ensure that it is not running in an insecure mode and, if possible, restrict the domains that it is allowed to fetch images from to a known allowlist.
4.  **Egress Filtering:** Implement strict egress filtering rules on the web server's firewall or security group to block all outbound traffic to `169.254.169.254`.

## CVEs
- CVE-2026-28423 (CVSS 6.8)

**Tags:** SSRF, CMS, Cloud Security, AWS, IMDS

## Sources
- [CVE-2026-28423 - Exploits & Severity](https://feedly.com/i/subscription/subscriptions%2Fpart-83) — Feedly (2026-03-01)
- [Statamic SSRF Bug Could Let Attackers Steal Cloud Credentials](https://thehackernews.com/2026/02/statamic-ssrf-bug-could-let-attackers.html) — The Hacker News (2026-02-28)

---
Source: https://cyber.netsecops.io/articles/statamic-ssrf-flaw-allows-internal-network-access-and-cloud-credential-theft/
