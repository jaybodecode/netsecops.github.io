# Petlibro Smart Feeder API Flaw Lets Anyone Control Devices, Access Cameras

**Severity:** high | **Category:** Vulnerability,IoT Security | **Updated:** 2026-01-04 | **Reading time:** 4 min

A serious improper access control vulnerability, CVE-2025-3653, has been found in the backend API for Petlibro's smart pet feeders. The flaw allows a remote attacker to take full control of any Petlibro device simply by sending its serial number to the API, with no authentication required. A successful attacker can alter feeding schedules, dispense food on command, and, on camera-equipped models, view the live video feed. Disclosed by VulnCheck, the vulnerability affects Petlibro Smart Pet Feeder Platform versions up to 1.7.31 and highlights the persistent failure of some IoT manufacturers to implement basic security controls, creating significant privacy and safety risks for consumers.

## Executive Summary
Security researchers have discovered **CVE-2025-3653**, a critical improper access control vulnerability in the cloud platform supporting **Petlibro** smart pet feeders. The flaw allows any remote attacker to gain complete control over any device connected to the platform by simply knowing its serial number. No authentication or authorization is required. This allows an attacker to manipulate feeding schedules, potentially harming a pet, and access live camera feeds, creating a serious invasion of privacy. The vulnerability, present in platform versions up to 1.7.31, is a textbook example of insecure API design in the consumer **[IoT Security](https://en.wikipedia.org/wiki/Internet_of_things#Security)** space, where basic security principles like object-level authorization are often overlooked.

## Vulnerability Details
-   **CVE ID:** `CVE-2025-3653`
-   **CVSS Score:** Not yet assigned (as of Jan 4, 2026), but expected to be High or Critical.
-   **Attack Vector:** Network
-   **Attack Complexity:** Low
-   **Privileges Required:** None
-   **User Interaction:** None

The vulnerability, discovered by researchers at **VulnCheck**, is a Broken Object Level Authorization (BOLA) flaw, which is the #1 risk on the OWASP API Security Top 10. The Petlibro API endpoints that control device functions accept a device serial number as a parameter but fail to check if the user making the request is the actual owner of that device. An attacker can therefore write a simple script to iterate through possible serial numbers and send commands (e.g., 'dispense food', 'change schedule', 'access camera stream') to any valid device they find.

## Affected Systems
-   **Product:** Petlibro Smart Pet Feeder Platform
-   **Versions:** Up to and including 1.7.31
-   **Affected Devices:** All Petlibro smart feeders that connect to this platform.

## Exploitation Status
VulnCheck has developed a proof-of-concept demonstrating the flaw. While there is no evidence of widespread malicious exploitation yet, the simplicity of the attack makes it highly likely that it will be abused now that it is public. Attackers could engage in anything from harmless pranks (overfeeding pets) to malicious stalking and privacy invasion (accessing cameras).

## Impact Assessment
-   **Privacy Invasion:** The most severe impact is the ability for an attacker to access the live camera feed from inside a user's home, constituting a major breach of privacy.
-   **Pet Safety:** An attacker could maliciously alter feeding schedules, either starving or overfeeding a pet, which could lead to health complications.
-   **Psychological Impact:** The knowledge that an unknown person can watch them and control devices in their home can cause significant distress to users.
-   **Brand Damage:** Such a fundamental security failure severely damages the Petlibro brand and consumer trust in its products.

## Cyber Observables for Detection
Detection is difficult for the end-user. The vendor (Petlibro) is in the best position to detect this at the API level.

| Type | Value | Description | Context | Confidence |
|---|---|---|---|---|
| api_endpoint | High volume of requests from a single IP with many different serial numbers | This is the primary indicator of an attacker trying to enumerate valid devices. | Petlibro's API gateway logs | high |
| log_source | Device logs showing commands executed by an unknown user/session | If the device logs the source of a command, this would be a clear indicator. | Device-level logs (unlikely to be user-accessible) | low |
| other | Unexplained changes to feeding schedule or manual feeding events | A user might notice their pet being fed at odd times or the food history showing unexpected entries. | User observation, companion app history | high |

## Detection Methods
-   **For Users:** Monitor the device's activity log in the Petlibro app for any feeding events or setting changes that you did not authorize. Be alert to any unusual behavior from the device.
-   **For the Vendor:** Petlibro must implement monitoring on their API endpoints to detect and block IP addresses that are rapidly iterating through serial numbers.

## Remediation Steps
This is a server-side vulnerability, so there is **no action the user can take** to directly fix it. The responsibility lies entirely with Petlibro to patch their backend API.

1.  **Vendor-Side Fix:** Petlibro must update its API to enforce proper authorization. For every API request that targets a specific device, the server must verify that the authenticated user making the request is the legitimate owner of that device.
2.  **User-Side Mitigation:** Until the vendor confirms a fix, users with camera-equipped models may wish to physically cover the camera lens or unplug the device if they are concerned about privacy. Users should monitor for any announcements from Petlibro regarding a platform update.
3.  **Disable Remote Access:** If the app allows, disabling remote access and using the device in a local-only mode (if available) could mitigate the risk, but this often defeats the purpose of a 'smart' device.

## CVEs
- CVE-2025-3653

**Tags:** IoT Security, API Security, Vulnerability, Privacy, Petlibro

## Sources
- [NVD - CVE-2025-3653](https://nvd.nist.gov/vuln/detail/CVE-2025-3653) — NVD (2026-01-03)
- [Petlibro API flaw lets hackers control any smart pet feeder](https://www.bleepingcomputer.com/news/security/petlibro-api-flaw-lets-hackers-control-any-smart-pet-feeder/) — BleepingComputer (2026-01-03)

---
Source: https://cyber.netsecops.io/articles/petlibro-smart-feeder-api-flaw-allows-unauthorized-control/
