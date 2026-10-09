# Critical UNISOC Modem Flaw Allows Zero-Click RCE on Millions of Android Phones via Cellular Call

**Severity:** critical | **Category:** Vulnerability,Mobile Security | **Updated:** 2026-03-21 | **Reading time:** 4 min

A critical, unpatched vulnerability has been discovered in the modem firmware of several UNISOC chipsets, affecting millions of budget and mid-range Android devices from major brands like Samsung and Motorola. The flaw, an uncontrolled recursion issue (CWE-674), allows a remote attacker to achieve arbitrary code execution simply by initiating a cellular video call and sending a specially crafted SDP message. This triggers a stack overflow in the modem's firmware, crashing it and enabling the execution of shellcode. The attack requires no user interaction beyond the device being reachable on the cellular network, posing a severe risk to users of affected devices, including the Realme C33, on which a full RCE was demonstrated.

## Executive Summary
On March 20, 2026, researchers disclosed a **critical vulnerability** in the modem firmware of several **[UNISOC](https://www.unisoc.com/)** chipsets. These chipsets power millions of budget and mid-range Android smartphones from popular brands such as **[Motorola](https://www.motorola.com/)**, **[Samsung](https://www.samsung.com/)**, Vivo, and Realme. The unpatched flaw, identified as an Uncontrolled Recursion (CWE-674), can be exploited by a remote attacker over a cellular network to achieve remote code execution (RCE). The attack vector is remarkably simple: the attacker initiates a cellular video call and sends a malformed Session Description Protocol (SDP) message. This triggers a stack overflow in the modem, allowing the attacker to execute arbitrary code. The vulnerability requires no user interaction, making it a zero-click style attack on the modem's baseband processor, which operates at a high privilege level.

---

## Vulnerability Details
*   **CWE ID:** `CWE-674: Uncontrolled Recursion`
*   **Severity:** Critical
*   **Vulnerability Type:** Stack-based buffer overflow due to infinite recursion.
*   **Attack Vector:** Remote, via a cellular network (e.g., 4G/LTE).
*   **Prerequisites:** The attacker needs to know the victim's phone number and the device must be powered on and connected to the cellular network.

## Affected Systems
The vulnerability has been confirmed in the modem firmware of the following UNISOC chipset models:
*   `T612`
*   `T616`
*   `T606`
*   `T7250`

These chipsets are found in numerous Android devices, including the Realme C33, on which a full RCE exploit was successfully demonstrated. The affected device was running a July 2025 Android security update, indicating the flaw is likely present in many current and older devices and is not mitigated by standard Android OS patches.

## Technical Analysis
The vulnerability lies in the modem firmware's handling of the Session Initiation Protocol (SIP), which is used to set up voice and video calls over LTE (VoLTE). Specifically, the flaw is in a function named `_SDPDEC_AcapDecoder`.

1.  **Exploitation Trigger:** During the setup of a video call, devices exchange SDP messages to negotiate call parameters. The UNISOC firmware's parser for these messages has a flaw in how it handles a non-standard attribute called `acap`.
2.  **Uncontrolled Recursion:** The `_SDPDEC_AcapDecoder` function, which processes the `acap` attribute, calls itself recursively. However, the developers failed to implement a depth check to limit how many times the function could recurse.
3.  **Stack Overflow:** An attacker can craft an SDP message containing a long, continuous string of `acap` attributes. When the vulnerable modem receives this message, the `_SDPDEC_AcapDecoder` function calls itself repeatedly, consuming stack space with each call. This leads to a classic stack overflow, which corrupts the program's execution state.
4.  **Remote Code Execution:** By carefully crafting the malicious message and overflowing the stack, an attacker can overwrite critical data, such as the return address of a function. This allows them to redirect the execution flow to shellcode they have injected into the modem's memory, achieving remote code execution ([`T1210 - Exploitation of Remote Services`](https://attack.mitre.org/techniques/T1210/)).

> This type of vulnerability is particularly dangerous because it targets the modem's firmware (the baseband processor), which is a separate computer within your phone. A compromise of the baseband can be invisible to the Android operating system and any security software running on it.

## Impact Assessment
*   **Silent Espionage:** A successful exploit gives an attacker a powerful position to spy on a user. They could potentially listen to calls, intercept SMS messages, or track the device's location, all without the user's knowledge.
*   **Full Device Takeover:** While the initial compromise is in the modem, a sophisticated attacker could potentially pivot from the baseband processor to the main application processor, leading to a full takeover of the Android operating system.
*   **Denial of Service:** Even a failed exploit attempt will crash the modem, causing the device to lose its cellular connection and requiring a reboot to restore service.
*   **Widespread Exposure:** The use of these chipsets in millions of low-cost phones means a large, often less technically savvy, population is at risk.

## Cyber Observables for Detection
Detection on the device itself is nearly impossible for a user. Detection would have to occur at the network level.

| Type | Value | Description |
|---|---|---|
| `network_traffic_pattern` | `(malformed SDP)` | A cellular carrier could potentially detect malformed SDP packets containing an abnormally large number of `acap` attributes traversing their network. |
| `other` | `Modem Crash Logs` | On the device, repeated and unexplained modem crashes (which would appear as loss of signal) could be an indicator of attack attempts. These logs are typically only accessible with developer tools. |

## Remediation Steps
*   **Awaiting Patches:** As of the disclosure, the vulnerability is unpatched. Users of affected devices are dependent on UNISOC to create a patch and then for their device manufacturer (e.g., Samsung, Motorola) to test and deploy it as a firmware update. This process can be slow, especially for older or budget devices.
*   **Potential Mitigation:** Disabling VoLTE (Voice over LTE) in the device's settings *may* mitigate the issue by preventing the vulnerable code path from being reached, but this can degrade call quality and is not a guaranteed fix. This is a form of **[D3FEND Application Configuration Hardening (D3-ACH)](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)**.
*   **Device Replacement:** For users with high-security needs, replacing the device with one that does not use a vulnerable UNISOC chipset may be the only immediate option.

**Tags:** modem, firmware, zero-click, RCE, stack overflow, VoLTE, baseband

## Sources
- [Critical UNISOC T612 Modem Flaw Enables Remote Code Execution via Cellular Calls](https://gbhackers.com/critical-unisoc-t612-modem-flaw/) — GBHackers
- [Critical UNISOC T612 Modem Flaw Enables RCE via Cellular Calls](https://cyberpress.com/critical-unisoc-t612-modem-flaw-enables-rce-via-cellular-calls/) — Cyberpress

---
Source: https://cyber.netsecops.io/articles/critical-unisoc-modem-flaw-allows-rce-via-cellular-call/
