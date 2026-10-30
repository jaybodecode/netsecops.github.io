# NousResearch Hermes-Agent Hit with Path Traversal and Auth Bypass Flaws

**Severity:** medium | **Category:** Vulnerability,Supply Chain Attack | **Updated:** 2026-07-05 | **Reading time:** 4 min

Two new vulnerabilities have been discovered in hermes-agent, an open-source AI agent framework from NousResearch. The first, CVE-2026-14628, is a path traversal flaw in the Live Webhook Endpoint that could allow a remote attacker to access restricted files. The second, CVE-2026-14627, is an improper authentication bug in the Discord Platform Integration that could allow an attacker to bypass authentication controls. The vendor has reportedly been unresponsive to disclosure attempts, and a public exploit exists for the path traversal bug, posing a risk to users of this emerging AI tool.

## Executive Summary

Two significant security vulnerabilities, **CVE-2026-14628** and **CVE-2026-14627**, have been publicly disclosed in **hermes-agent**, an open-source AI agent framework from **[NousResearch](https://nousresearch.com/)**. The vulnerabilities consist of a path traversal and an improper authentication flaw, respectively. These weaknesses could allow a remote attacker to access restricted files or bypass authentication mechanisms. The situation is exacerbated by the reported unresponsiveness of the vendor to the disclosure attempts and the public availability of an exploit for the path traversal vulnerability. This highlights the security risks associated with rapidly developed, emerging AI tools and frameworks.

---

## Vulnerability Details

### CVE-2026-14628: Path Traversal
*   **Description:** This is a path traversal vulnerability in the `extract_media` function within the Live Webhook Endpoint component of hermes-agent versions up to 2026.5.16.
*   **Attack Vector:** A remote attacker can send a specially crafted request to the webhook endpoint, using path traversal sequences (e.g., `../`) to manipulate file paths. This allows the attacker to read or potentially write to files outside of the intended directory.
*   **Impact:** Successful exploitation could lead to the disclosure of sensitive information, such as configuration files, source code, or credentials stored on the server.
*   **Status:** An exploit for this vulnerability is publicly available.

### CVE-2026-14627: Improper Authentication
*   **Description:** This vulnerability affects the `DiscordAdapter._is_allowed_user` function in the Discord Platform Integration component of hermes-agent versions up to 0.15.2.
*   **Attack Vector:** The function fails to properly validate the user, allowing a remote attacker to potentially bypass authentication controls. The attack complexity is noted as high, making it difficult to exploit.
*   **Impact:** If successfully exploited, an attacker could perform actions as if they were an authenticated user, potentially gaining unauthorized access to the AI agent's functions via Discord.
*   **Status:** No patch is currently available, and the vendor has not responded.

---

## Affected Systems

*   **hermes-agent versions up to 2026.5.16** are affected by the path traversal vulnerability (CVE-2026-14628).
*   **hermes-agent versions up to 0.15.2** are affected by the improper authentication vulnerability (CVE-2026-14627).

Organizations and developers using this open-source framework in their projects are at risk.

---

## Exploitation Status

The path traversal vulnerability (CVE-2026-14628) has a public exploit, making it a more immediate threat. This aligns with [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/). The improper authentication flaw (CVE-2026-14627) is considered harder to exploit, but it still represents a significant weakness that could be leveraged by a determined attacker, mapping to [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/). The lack of vendor response means these vulnerabilities will likely remain unpatched in the official repository for the foreseeable future.

---

## Impact Assessment

The impact depends on how the hermes-agent is deployed. If used in a production environment, especially one that is internet-facing, the path traversal vulnerability could lead to a serious data breach. An attacker could steal sensitive data or gain information needed for further attacks.

The improper authentication flaw, while harder to exploit, could undermine the trust and security of AI agents integrated with platforms like Discord, potentially allowing for unauthorized use of the agent, data manipulation, or spam.

More broadly, this incident highlights the growing pains of the open-source AI ecosystem. As new tools are developed and adopted quickly, security often lags behind. The unresponsiveness of the vendor is a major red flag for any organization considering using this software.

---

## Cyber Observables — Hunting Hints

*   **Web Server Logs:** Hunt for URL patterns in web server access logs that contain path traversal sequences like `../` or `..\` in requests to the hermes-agent webhook endpoint.
*   **Discord API Logs:** If available, monitor logs for the Discord integration for authentication attempts or actions from unexpected or unauthorized user IDs.
*   **File Access Auditing:** On servers running hermes-agent, enable file access auditing and monitor for the agent's process accessing files in unusual or restricted directories (e.g., `/etc/`, `/root/`).

---

## Detection Methods

*   **Web Application Firewall (WAF):** A properly configured WAF with rules to detect and block path traversal attacks can be an effective defense against CVE-2026-14628.
*   **Vulnerability Scanning:** Scan applications and dependencies to identify if a vulnerable version of hermes-agent is in use.
*   **Log Analysis:** Correlate web server logs with file access logs. An alert could be triggered if a request to the webhook endpoint is immediately followed by the agent's process accessing a sensitive system file.

---

## Remediation Steps

Given the vendor's unresponsiveness, users of hermes-agent are in a difficult position.

1.  **Cease Use or Isolate:** The most secure option is to stop using the hermes-agent until patches are available. If that is not possible, the application should be heavily sandboxed and isolated from the internet and other sensitive systems.
2.  **Apply Community Patches:** The open-source community may develop unofficial patches. If using these, they must be carefully reviewed for correctness and potential backdoors.
3.  **Virtual Patching:** Use a WAF to create a 'virtual patch' that blocks exploit attempts for CVE-2026-14628. This is a temporary measure.
4.  **Review Code:** For the authentication flaw, developers using the framework may be able to manually patch the `DiscordAdapter._is_allowed_user` function in their own forks of the code to enforce stricter user validation.
5.  **Migrate to a Supported Framework:** Consider migrating to an alternative AI agent framework that has a better track record of security and maintenance.

## CVEs
- CVE-2026-14628
- CVE-2026-14627

**Tags:** Vulnerability, CVE-2026-14628, CVE-2026-14627, NousResearch, hermes-agent, AI, Path Traversal, Authentication Bypass

## Sources
- [CVE-2026-14628 Detail](https://nvd.nist.gov/vuln/detail/CVE-2026-14628) — NIST National Vulnerability Database
- [CVE-2026-14627](https://www.tenable.com/cve/CVE-2026-14627) — Tenable
- [CVE-2026-14627](https://www.cve.org/CVERecord?id=CVE-2026-14627) — CVE.org

---
Source: https://cyber.netsecops.io/articles/multiple-vulnerabilities-found-in-nousresearch-hermes-agent/
