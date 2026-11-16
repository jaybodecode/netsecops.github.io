# EDR-Killer Malware Weaponizes Decade-Old EnCase Driver in BYOVD Attacks

**Severity:** high | **Category:** Malware,Ransomware,Threat Actor | **Updated:** 2026-02-08 | **Reading time:** 4 min

Threat actors are using a new EDR-killing malware that leverages a 'Bring Your Own Vulnerable Driver' (BYOVD) technique to disable endpoint security products. Researchers at Huntress discovered the malware during an intrusion that began with compromised SonicWall SSL VPN credentials. The attackers abuse `EnPortv.sys`, a legitimate but long-revoked kernel driver from Guidance Software's EnCase forensic toolkit. Despite its certificate being revoked in 2010, a gap in Windows' driver signature enforcement allows it to be loaded, granting the attackers kernel-level privileges. The malware uses these privileges to terminate 59 different processes associated with major EDR vendors like CrowdStrike, SentinelOne, and Microsoft, clearing the way for ransomware deployment.

## Executive Summary
Threat actors are deploying a sophisticated **EDR-killer** tool that abuses a decade-old, revoked kernel driver to systematically terminate endpoint security products before deploying ransomware. A report from security firm **[Huntress](https://www.huntress.com/)** details an attack leveraging the **Bring Your Own Vulnerable Driver (BYOVD)** technique. The attackers introduce `EnPortv.sys`, a legitimate driver from Guidance Software's **EnCase** forensic toolkit, whose certificate was revoked in 2010. A loophole in Windows' driver signature validation still allows this driver to be loaded, granting the malware powerful kernel-level privileges. The tool then uses this access to forcefully terminate processes belonging to 59 different security products, effectively blinding the organization's defenses and paving the way for the final ransomware payload.

## Threat Overview
The attack represents a mature stage in the ransomware playbook, where disabling security controls is a standard preliminary step. The initial access vector in the observed incident was compromised credentials for a **[SonicWall](https://www.sonicwall.com/)** SSL VPN, a common entry point. After gaining access, the attackers' primary goal was to neutralize the endpoint detection and response (EDR) solution to operate undetected.

### The BYOVD Technique
- **Bring Your Own Vulnerable Driver ([T1547.006 - Kernel Modules and Extensions](https://attack.mitre.org/techniques/T1547/006/))**: This technique involves an attacker placing a legitimately signed (even if revoked or expired) but vulnerable driver on the target system. 
- **Loading the Driver**: The attacker's malware loads this driver into the kernel.
- **Exploiting the Vulnerability**: The malware then communicates with the driver, using its inherent vulnerabilities or powerful functions to execute operations with kernel-level privileges (Ring 0).
- **Malicious Action**: These privileges are used to perform actions that user-mode applications cannot, such as terminating protected security processes.

## Technical Analysis
- **The Vulnerable Driver:** The driver at the center of this attack is `EnPortv.sys`. It is a component of the EnCase digital forensics software, originally developed by Guidance Software (now OpenText). While the driver's digital certificate expired in 2010 and was revoked, Windows Driver Signature Enforcement fails to block it, creating a dangerous loophole.
- **The EDR Killer Tool:** The attacker's tool is a 64-bit executable that masquerades as a firmware update utility. It contains the vulnerable `EnPortv.sys` driver and a list of 59 process names associated with major cybersecurity vendors, including:
    - **[Microsoft](https://www.microsoft.com/security)**
    - **[CrowdStrike](https://www.crowdstrike.com/)**
    - **[SentinelOne](https://www.sentinelone.com/)**
    - **Kaspersky**
    - **Sophos**
- **Execution Flow:**
    1. The EDR killer executable is run on the compromised host.
    2. It drops and loads the `EnPortv.sys` driver.
    3. It leverages the driver's kernel access to iterate through running processes.
    4. It forcefully terminates any process that matches its hardcoded list of security products.
- **Defense Evasion:** The tool uses a custom wordlist-based substitution cipher to encode the driver payload, making it appear as English text during static analysis and helping it to evade signature-based detection.

## Impact Assessment
The successful execution of this EDR killer has a critical impact on an organization's security posture.
- **Loss of Visibility:** With the EDR and antivirus solutions disabled, security teams are blinded. They can no longer receive alerts, monitor endpoint activity, or remotely respond to the incident.
- **Unfettered Attacker Activity:** Once security tools are disabled, attackers can proceed with their objectives—credential theft, data exfiltration, and ransomware deployment—without fear of detection or prevention.
- **Ransomware Deployment:** The ultimate goal of this tool is to ensure the successful execution of a ransomware payload, leading to widespread operational disruption and financial loss.

## Detection & Response
**D3FEND Techniques:** [Driver Load Integrity Checking (D3-DLIC)](https://d3fend.mitre.org/technique/d3f:DriverLoadIntegrityChecking), [Process Analysis (D3-PA)](https://d3fend.mitre.org/technique/d3f:ProcessAnalysis)

1.  **Monitor Driver Loads:** Monitor Windows systems for the loading of suspicious or known-vulnerable drivers. The loading of `EnPortv.sys` is a major red flag. Windows Event ID 7045 can indicate a new service (driver) being installed.
2.  **EDR Tampering Alerts:** Modern EDR solutions have anti-tampering features. Alerts indicating that EDR services are being stopped or modified should be treated as a high-priority incident.
3.  **Behavioral Analysis:** Hunt for the initial access vector. In this case, reviewing SonicWall SSL VPN logs for suspicious logins (e.g., from unusual locations, multiple failed attempts followed by success) is crucial.

## Mitigation
**D3FEND Techniques:** [Executable Denylisting (D3-EDL)](https://d3fend.mitre.org/technique/d3f:ExecutableDenylisting), [Multi-factor Authentication (D3-MFA)](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication), [Software Update (D3-SU)](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)

1.  **Driver Block Rules:** Use security tools like Windows Defender Application Control (WDAC) to create policies that block the loading of known-vulnerable drivers. Microsoft maintains a 

**Tags:** BYOVD, EDR, Malware, Ransomware, EnCase, EnPortv.sys, Huntress, Defense Evasion

## Sources
- [They Got In Through SonicWall. Then They Tried to Kill Every Security Tool](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE66KFtbHRg45PerZwOKiXp-ZidQQydZ1dRmivC5oJ_rxFDuPD04EEQ4fzLe7kQ-vtzh6vyqoTFHN0uJAIG7XS-Pv-p65e7xhS_G-ymku6vVaJ_qFYmx0qPDs0ir3j642L9r0m4afvQ_-BmtrNan-hg)
- [EnCase Driver Weaponized as EDR Killers Persist](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEfDzcYRUXJBxTfb5craWUkXNksqO7FVmm-0nJfwSI6QqIntTKTLG2gGvI2gLYVSX7eawxTUsW39-wL2OvcPndyde-XGhv4IPfa1Fe1Zsgx2HR7GFEXwyjwkXeHJ9R9IT7mLvR6nAbI2MGCqWVda9OYA5vSWlf4uNE1tZTctMVfM4wLEilJKRXtA4b2XlDFemzH-JX4tH1V)
- [The Federal Employees Heath Blog (FEH Blog)](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF4ZNUG9MZDSer0eGRps2A1xWYsNx8Cr04w_XHjNO4_P9Krqy0m1u45I75CRTPXvFhN3I0CjTBE26dWFpSX-DJMqIRDY5kfibgtKY4b4QxWIbifFv_JjczXphmS)

---
Source: https://cyber.netsecops.io/articles/attackers-weaponize-decade-old-encase-driver-to-terminate-edr-products/
