# 'BRIDGE:BREAK' Vulnerabilities Expose Thousands of Serial-to-IP Converters

**Severity:** high | **Category:** Vulnerability,Industrial Control Systems,IoT Security | **Updated:** 2026-04-22 | **Reading time:** 4 min

Researchers at Forescout have discovered 22 vulnerabilities, collectively named 'BRIDGE:BREAK,' in popular serial-to-IP converters from Lantronix and Silex. These devices, which bridge legacy OT/ICS equipment to modern IP networks, are affected by flaws that could lead to remote code execution, authentication bypass, and device takeover. With nearly 20,000 such devices exposed online, the vulnerabilities pose a significant risk to critical industries like manufacturing, healthcare, and energy.

## Executive Summary

Researchers at **[Forescout](https://www.forescout.com/)**'s Vedere Labs have uncovered a set of 22 vulnerabilities, collectively named **BRIDGE:BREAK**, that impact widely used serial-to-IP converters manufactured by **[Lantronix](https://www.lantronix.com/)** and **Silex**. These devices are critical components in many Operational Technology (OT) environments, connecting legacy serial-based devices (like PLCs and sensors) to modern IP networks. The flaws range in severity and include critical vulnerabilities that could allow an attacker to achieve remote code execution (RCE), bypass authentication, and gain full control over the device. With thousands of these converters exposed on the public internet, these vulnerabilities represent a significant threat to the stability and security of industrial control systems (ICS) globally.

## Vulnerability Details

The **BRIDGE:BREAK** vulnerabilities encompass a wide range of issues, demonstrating systemic weaknesses in the affected products. The 22 flaws include:

*   **Remote Code Execution**: Allowing an attacker to run arbitrary code on the converter.
*   **Authentication Bypass**: Enabling an attacker to gain administrative access without valid credentials.
*   **Denial of Service (DoS)**: Allowing an attacker to crash the device, disrupting communication with critical field assets.
*   **Firmware Tampering**: Enabling an attacker to install a persistent, malicious firmware image.
*   **Data Tampering**: Allowing an attacker to perform man-in-the-middle attacks, intercepting and modifying data transmitted between the serial device and the IP network.

Several CVEs have been assigned, including **CVE-2026-32955**, **CVE-2026-32956**, and **CVE-2026-32961**.

## Affected Systems

*   **Lantronix**: EDS3000PS Series, EDS5000 Series
*   **Silex**: SD330-AC

Forescout's research identified nearly 20,000 of these devices exposed to the internet, creating a large, easily accessible attack surface for threat actors.

## Exploitation Status

While there is no public report of active exploitation in the wild at this time, the public disclosure of these vulnerabilities, along with their severity, means that threat actors will likely begin scanning for and attempting to exploit vulnerable devices shortly.

## Impact Assessment

Successful exploitation of the **BRIDGE:BREAK** vulnerabilities could have severe consequences in an OT environment:

*   **Disruption of Physical Processes**: By taking control of a converter, an attacker could send malicious commands to or stop communication with connected ICS equipment (e.g., PLCs, RTUs), potentially causing physical damage or shutting down a manufacturing line or utility service.
*   **Lateral Movement**: A compromised converter can serve as a pivot point for an attacker to move deeper into the OT or corporate network.
*   **False Data Injection**: Attackers could tamper with sensor readings being sent from the field, blinding operators to a dangerous condition or causing them to take incorrect actions.
*   **Loss of Control**: Complete takeover of the device allows for persistent compromise and long-term espionage or sabotage.

> These converters are the 'digital duct tape' of the OT world, connecting old and new. A vulnerability in them is not just a software bug; it's a threat to the physical world.

## Cyber Observables — Hunting Hints

The following patterns can help identify vulnerable devices or exploitation attempts:

| Type | Value | Description |
| :--- | :--- | :--- |
| Network Traffic Pattern | Inbound connections to Lantronix/Silex devices from unknown internet IPs. | These devices should ideally not be exposed to the internet. Any inbound connection is suspicious. |
| Port | Default admin ports (e.g., Telnet `23`, HTTP `80`, HTTPS `443`) | Scanning for these ports can identify exposed devices. |
| Configuration | Default credentials (e.g., `admin/admin`) | Many devices are deployed with weak or default credentials, which should be checked. |

## Detection Methods

*   **Asset Inventory**: Use network scanning tools (e.g., Nmap, Shodan) or passive discovery tools to identify all Lantronix and Silex devices on your network.
*   **Vulnerability Scanning**: Scan identified devices with a vulnerability scanner that has plugins for the **BRIDGE:BREAK** CVEs.
*   **Network Monitoring**: Monitor network traffic to and from these devices for anomalous behavior, such as connections to unusual IP addresses, large data transfers, or attempts to use debugging interfaces.

## Remediation Steps

1.  **Isolate from the Internet**: The most critical step is to ensure these devices are not exposed to the public internet. Place them behind firewalls and use VPNs for any required remote access. This is a direct application of [`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/).
2.  **Apply Patches**: Both Lantronix and Silex have released patches. Organizations must apply these updates as soon as possible. See [`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/).
3.  **Change Default Credentials**: Immediately change any default or weak credentials on these devices to strong, unique passwords.
4.  **Network Segmentation**: Segment the network so that the converters are in a protected OT zone, separate from the corporate IT network, to limit the blast radius of a potential compromise.

## CVEs
- CVE-2026-32955
- CVE-2026-32956
- CVE-2026-32961

**Tags:** Vulnerability, ICS, OT, Forescout, Lantronix, Silex, RCE

## Sources
- [22 BRIDGE:BREAK Flaws Expose Thousands of Lantronix and Silex Serial-to-IP Converters](https://thehackernews.com/2026/04/22-bridgebreak-flaws-expose-thousands.html) — The Hacker News (2026-04-21)
- [‘BRIDGE:BREAK’ Vulnerabilities Expose Lantronix, Silex Serial-to-IP Converters](https://www.securityweek.com/bridge-break-vulnerabilities-expose-lantronix-silex-serial-to-ip-converters/) — SecurityWeek (2026-04-21)

---
Source: https://cyber.netsecops.io/articles/critical-bridge-break-flaws-found-in-lantronix-and-silex-converters/
