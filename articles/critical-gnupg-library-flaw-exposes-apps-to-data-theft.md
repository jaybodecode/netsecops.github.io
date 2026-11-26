# Critical GnuPG Library Flaw Could Lead to Data Exfiltration

**Severity:** critical | **Category:** Vulnerability,Patch Management,Threat Intelligence | **Updated:** 2026-11-22 | **Reading time:** 5 min

The GnuPG project has disclosed a critical double-free vulnerability, CVE-2026-129975, in its GnuPG Made Easy (GPGME) library. The flaw, present in all versions before 2.3.0, can be triggered when processing a malicious OpenPGP key. This could lead to memory corruption, potentially allowing data exfiltration from a wide range of popular applications that rely on the library, including email clients, Samba, and Flatpak. Users are urged to update immediately.

## Executive Summary
On November 20, 2026, the **[GnuPG Project](https://gnupg.org/)** released a security advisory for a **critical vulnerability** in its GnuPG Made Easy (GPGME) library, a core component used by countless applications to integrate encryption functionalities. The vulnerability, tracked as **CVE-2026-129975**, is a double-free memory corruption flaw that can be triggered by processing a specially crafted OpenPGP key. Successful exploitation could allow an attacker to exfiltrate data from the memory of the affected application, with the potential for remote code execution (RCE) not being ruled out. Due to the library's widespread use in popular software like email clients, Samba, and Flatpak, the vulnerability poses a significant risk across the software ecosystem. Patched versions are available, and users are strongly advised to update as soon as possible.

---

## Vulnerability Details
The vulnerability **CVE-2026-129975** is a double-free memory corruption issue affecting all versions of the **[GPGME](https://gnupg.org/software/gpgme/index.html)** library prior to version 2.3.0. A double-free bug occurs when a program calls `free()` twice on the same memory address, which can corrupt memory and lead to unpredictable behavior, including crashes or arbitrary code execution.

According to the advisory from GnuPG lead developer Werner Koch, the flaw can be triggered when an application uses GPGME to process a malicious OpenPGP key. The key must contain a specially crafted, unusually long user ID. The vulnerability lies within two internal functions, `read_status()` and `read_colon_line()`, which handle parsing status lines and key data from the GnuPG backend. An error during a buffer reallocation process can cause the functions to retain a stale pointer, which is later freed a second time, triggering the memory corruption.

## Affected Systems
The vulnerability is not in GnuPG itself, but in the GPGME library that acts as a wrapper. Therefore, any application that uses this library for OpenPGP operations is potentially vulnerable. The GnuPG project noted this includes:
- Most email clients with OpenPGP support (e.g., those using GpgOL or other plugins)
- Many XMPP clients
- **[Samba](https://www.samba.org/)**
- **[Flatpak](https://flatpak.org/)**
- GnuPG's own desktop packages: Gpg4win, GnuPG Desktop, and GnuPG VS-Desktop

## Exploitation Status
The GnuPG project stated that it is not aware of any active exploitation of this vulnerability in the wild. The flaw was discovered by researcher Johan Carlsson and responsibly disclosed to the project by **[GitLab](https://about.gitlab.com/)** on November 12, 2026. The public disclosure was accelerated from its original planned date due to other security updates. However, the public nature of the flaw and its severity mean that threat actors will likely begin developing exploits.

## Impact Assessment
Given the ubiquity of the GPGME library, the impact of this vulnerability is widespread. An attacker could craft a malicious OpenPGP key and distribute it via email or a public key server. If a user or automated system imports or processes this key with a vulnerable application, the attacker could potentially read sensitive data from the application's memory. This could include private keys, passwords, or the content of encrypted messages. While the GnuPG project notes that RCE is a possibility, data exfiltration is the more immediate and likely outcome.

--- 

## Cyber Observables — Hunting Hints
Security teams can hunt for potential exploitation attempts by looking for the following:

| Type | Value | Description |
|---|---|---|
| file_name | `*.asc`, `*.pgp`, `*.gpg` | Monitor for the introduction of new, untrusted OpenPGP key files into the environment, especially via email attachments. |
| string_pattern | Unusually long User ID fields in OpenPGP keys | While difficult to inspect at scale, analysis of key files being processed by GPGME-dependent applications may reveal keys with abnormally long user IDs. |
| log_source | `Application crash logs` | Unexplained crashes in applications known to use GPGME (e.g., email clients, file transfer tools) could be an indicator of failed exploitation attempts. |

## Detection Methods
The primary method of detection is identifying vulnerable software versions.
1.  **Version Scanning**: Use package managers (`dpkg`, `rpm`, etc.) and software inventory tools to identify all systems with GPGME library versions earlier than 2.3.0 or 1.24.4 (for the legacy branch).
2.  **Application Auditing**: Identify all applications in your environment that depend on the GPGME library. Pay special attention to mail servers, file servers (Samba), and containerized applications (Flatpak).
3.  **Memory Analysis**: In a forensic investigation, if a crash is suspected to be related to this flaw, memory dump analysis might reveal the double-free corruption.

## Remediation Steps
Immediate patching is the most effective way to mitigate this critical vulnerability.
1.  **Update GPGME**: Update to the patched versions as soon as possible.
    - For the stable branch, upgrade to **GPGME 2.3.1** or later.
    - For the legacy 1.x branch, upgrade to **GPGME 1.24.4** or later.
2.  **Update Dependent Applications**: Ensure that applications using GPGME are also updated, as they may be bundled with a vulnerable version of the library. This includes updating Gpg4win and other GnuPG desktop packages.
3.  **Restrict Key Import**: As a temporary measure until patching is complete, organizations could implement policies or technical controls to restrict the automatic import of new, untrusted OpenPGP keys from public key servers or email attachments. This is a form of Application Configuration Hardening ([D3-ACH](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)).

## CVEs
- CVE-2026-129975

**Tags:** GnuPG, GPGME, Vulnerability, Memory Corruption, Double-Free, OpenPGP, CVE-2026-129975

## Sources
- [GnuPG Warns: Critical GPGME Flaw Could Let Attackers Steal Data from Popular Apps](https://thehackernews.com/2026/11/gnupg-warns-critical-gpgme-flaw-could.html) — The Hacker News
- [GnuPG GPGME Critical Flaw CVE-2026-129975: Malicious OpenPGP Keys](https://aviatrix.ai/threat-research-center/gnupg-gpgme-critical-flaw-cve-2026-129975-malicious-openpgp-keys/) — Aviatrix
- [GnuPG Discloses Critical GPGME Vulnerability](https://www.phoronix.com/news/GnuPG-GPGME-Critical) — Phoronix
- [GnuPG Warns: Critical GPGME Flaw Could Let Attackers Steal Data from Popular Apps](https://finance.biggo.com/news/e2b428f3-54ed-4637-917e-84063732ab7e) — BIGGO
- [GPGME critical flaw CVE-2026-129975: malicious OpenPGP keys](https://pasqualepillitteri.it/en/news/36038/gpgme-critical-flaw-cve-2026-129975-malicious-openpgp-keys) — pasqualepillitteri.it
- [GnuPG Warns of Critical GPGME Flaw Potentially Exposing Data in Popular Apps](https://mallory.ai/stories/01a1fac8-62bd-73eb-b434-ce898bca2596) — Mallory

---
Source: https://cyber.netsecops.io/articles/critical-gnupg-library-flaw-exposes-apps-to-data-theft/
