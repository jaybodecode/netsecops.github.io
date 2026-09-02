# Microsoft Issues Emergency Out-of-Band Patches for Flawed January Updates

**Severity:** medium | **Category:** Patch Management,Security Operations | **Updated:** 2026-01-25 | **Reading time:** 4 min

Microsoft has released several emergency out-of-band (OOB) updates on January 24, 2026, to address significant bugs introduced by its January 13 Patch Tuesday release. The faulty updates caused a range of issues, including Remote Desktop connection failures, application hangs when accessing cloud storage like OneDrive, and system restart failures. The new cumulative updates, including KB5078136 and KB5078238, are available for various Windows versions and are intended to restore stability and functionality for affected users.

## Executive Summary
**[Microsoft](https://www.microsoft.com/)** has issued a series of emergency out-of-band (OOB) cumulative updates to fix several disruptive bugs introduced in its January 13, 2026, security updates. Users and administrators reported widespread issues following the initial Patch Tuesday release, impacting multiple versions of Windows, including **[Windows 10](https://en.wikipedia.org/wiki/Windows_10)**, **[Windows 11](https://en.wikipedia.org/wiki/Windows_11)**, and Windows Server editions. The primary problems included failures with **[Remote Desktop](https://en.wikipedia.org/wiki/Remote_Desktop_Protocol)** connections, applications freezing when interacting with cloud storage services, and systems failing to shut down correctly. The new OOB updates, released on January 24, 2026, are designed to resolve these specific issues and are recommended for all affected customers.

---

## Vulnerabilities Addressed
It is important to note that these OOB updates do not address new security vulnerabilities. Instead, they fix functional regressions caused by the January 13 security patches. The key issues resolved include:

1.  **Remote Desktop Connection Failures:** Some users were unable to establish Remote Desktop connections after installing the January updates. The new patches restore this functionality.
2.  **Application Hangs with Cloud Storage:** Applications, notably Microsoft Outlook with PST files stored on **[OneDrive](https://www.microsoft.com/en-us/microsoft-365/onedrive/online-cloud-storage)** or Dropbox, would become unresponsive or fail to open. This was traced to an issue with how applications accessed cloud-based files.
3.  **System Restart Instead of Shutdown:** An earlier OOB update on January 17 addressed a bug where systems with Secure Launch enabled would restart when the user selected 'Shut down' or 'Hibernate'.

---

## Affected Products
The issues affected a wide range of Microsoft operating systems. The new OOB updates apply to:
*   Windows 11
*   Windows 10
*   Windows Server 2025
*   Windows Server 2022 (KB5078136, KB5078238 for Azure Edition)
*   Windows Server 2019

Administrators should consult the specific KB articles for their respective OS versions to determine applicability.

---

## Impact Assessment
While not security-related, the impact of these bugs was significant for business operations. The inability to use Remote Desktop disrupted remote work and server administration for many organizations. Application hangs caused productivity losses and required IT support intervention. These issues demonstrate the delicate balance between deploying security patches promptly and ensuring system stability. The need for multiple OOB releases highlights the complexity of the Windows ecosystem and the challenges in testing updates across countless hardware and software configurations. For many system administrators, this event will cause them to re-evaluate their patch deployment rings, potentially delaying rollout to non-critical systems until the updates are proven stable.

---

## Patch Details
The latest updates are cumulative, meaning they include all previous security fixes from the January 13 and January 17 releases, in addition to the new bug fixes. Key updates include:
*   **KB5078136:** For Windows Server 2022.
*   **KB5078238:** A hotpatch for Windows Server 2022 Datacenter: Azure Edition.

These updates are available via the Microsoft Update Catalog and will be pushed through Windows Update for some users. However, they are considered optional preview releases, and administrators may need to seek them out manually.

---

## Deployment Priority
*   **High Priority:** Systems and user groups directly experiencing the Remote Desktop or application hang issues should be prioritized for this update to restore functionality.
*   **Medium Priority:** Organizations that have delayed the January updates due to these reported issues can now consider deploying these new, fixed cumulative updates to their test environments.
*   **Low Priority:** Systems that are not experiencing any of the reported bugs can wait for the next scheduled Patch Tuesday release in February, which will incorporate these fixes.

---

## Installation Instructions
1.  **Identify Affected Systems:** Determine which OS versions in your environment are affected and require the OOB update.
2.  **Download from Catalog:** Search for the relevant KB number in the [Microsoft Update Catalog](https://www.catalog.update.microsoft.com/).
3.  **Test Deployment:** Deploy the update to a pilot group of systems to ensure it resolves the target issues without introducing new problems in your specific environment.
4.  **Broad Deployment:** Once validated, deploy the update to all affected systems using your standard patch management tools (e.g., WSUS, SCCM/MECM, Intune).
5.  **Verification:** Confirm that Remote Desktop functionality is restored and that applications interacting with cloud storage no longer hang.

**Tags:** Microsoft, Windows Update, Patch Tuesday, Out-of-Band, KB5078136, KB5078238, Remote Desktop, Bug Fix

## Sources
- [Windows Releases Out-of-Band Updates to Fix Issues Introduced in January Patch Tuesday](https://www.sans.org/newsletters/newsbites/xxviii/5) — SANS Institute (2026-01-24)
- [January 24, 2026—KB5078136 (OS Build 20348.4651) Out-of-band](https://support.microsoft.com/en-us/topic/january-24-2026-kb5078136-os-build-20348-4651-out-of-band-b30f8a84-0239-4467-b892-2646c24300e8) — Microsoft Support (2026-01-24)
- [January 24, 2026—Hotpatch KB5078238 (OS Build 20348.4655) Out-of-band](https://support.microsoft.com/en-us/topic/january-24-2026-hotpatch-kb5078238-os-build-20348-4655-out-of-band-4f762319-3c35-430b-968b-5942f7bf285f) — Microsoft Support (2026-01-24)

---
Source: https://cyber.netsecops.io/articles/microsoft-releases-emergency-oob-updates-to-fix-january-patch-tuesday-issues/
