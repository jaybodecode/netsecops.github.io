# "Battering RAM": $50 Hardware Attack Cracks Intel and AMD Secure CPU Enclaves

**Severity:** high | **Category:** Cyberattack,Threat Intelligence,Supply Chain Attack | **Updated:** 2025-12-12 | **Reading time:** 5 min

At the Black Hat Europe 2025 conference, researchers from KU Leuven University demonstrated "Battering RAM," a novel hardware attack that completely undermines modern confidential computing technologies. Using a custom-built DDR4 interposer costing just $50, the attack can bypass the memory encryption of secure enclaves like Intel SGX and AMD SEV. This allows an attacker with physical access to read encrypted memory at runtime, extract secret keys, and defeat protections previously thought to be secure against physical threats.

## Executive Summary
Researchers from Belgium's KU Leuven University have developed a groundbreaking hardware attack named **"Battering RAM"** that effectively breaks the security model of modern confidential computing. Presented at Black Hat Europe 2025, the attack uses a low-cost, custom-made hardware device to bypass the memory encryption protections of **[Intel Software Guard Extensions (SGX)](https://www.intel.com/content/www/us/en/architecture-and-technology/software-guard-extensions.html)** and **[AMD Secure Encrypted Virtualization (SEV)](https://www.amd.com/en/developer/sev.html)**. This technique grants attackers with physical access arbitrary read/write capabilities within supposedly secure memory enclaves, fundamentally challenging the security promises of encrypted memory in cloud and edge computing environments. The attack cannot be detected by software and circumvents existing firmware mitigations.

---

## Threat Overview
- **Attack Name**: Battering RAM
- **Attack Type**: Physical Hardware Attack (Runtime Memory Manipulation)
- **Target**: Confidential Computing technologies, specifically Intel SGX and AMD SEV.
- **Mechanism**: The attack utilizes a custom DDR4 interposer, a small circuit board that physically sits between the CPU and the DRAM memory modules. This device manipulates the memory address bus in real-time.
- **Effect**: By tricking the CPU's memory controller, the interposer forces the processor to grant unauthorized access to encrypted memory regions. This bypasses the core security guarantee of these technologies, which is to protect data even from a compromised OS/hypervisor or an attacker with physical access.

> This attack is significant because it operates at the hardware level during runtime, making it invisible to software-based detection and immune to recent firmware patches designed to stop software-based memory aliasing attacks.

---

## Technical Analysis
The Battering RAM interposer works by performing a sophisticated Man-in-the-Middle (MitM) attack on the physical memory bus. When the CPU requests data from a specific memory address, the interposer intercepts this request and subtly alters the address lines. This causes the DRAM to return data from a different, protected location (e.g., inside an SGX enclave), which the CPU then decrypts, believing it to be legitimate, non-sensitive data. The researchers demonstrated this by achieving:

1.  **Arbitrary Plaintext Reads/Writes**: Full access to the contents of a secure enclave.
2.  **Secret Key Extraction**: Successful extraction of Intel SGX's secret platform provisioning key, a critical secret used to attest to the integrity of the enclave.

This technique effectively nullifies the protections against physical attacks like [`T1084 - Hardware Additions`](https://attack.mitre.org/techniques/T1084/) and cold boot attacks, as it can extract data from live, running systems.

---

## Impact Assessment
The implications of Battering RAM are profound, particularly for the cloud computing industry, which relies heavily on confidential computing to offer secure processing environments to customers.
- **Undermines Trust in Confidential Computing**: The attack breaks the fundamental promise that cloud providers cannot access customer data being processed in a secure enclave.
- **Enables Supply Chain Attacks**: A malicious actor could introduce a compromised memory module or server with a pre-installed Battering RAM interposer into an organization's supply chain. This hardware implant could later be activated by malware to steal data from secure virtual machines.
- **No Software Mitigation**: Because the attack is purely hardware-based, it cannot be patched with a software or firmware update. Mitigation would require a redesign of the CPU memory controller or the physical interface between the CPU and DRAM.
- **Physical Access is King**: It re-emphasizes that with sufficient physical access, even the most advanced software and hardware security features can be broken.

---

## Detection & Response
**Detection is currently considered impossible through software means.** The attack leaves no trace in logs or system state that can be monitored by an OS or hypervisor.

**Response must focus on prevention through physical and supply chain security:**
1.  **Physical Security Controls**: Enforce stringent physical access controls in data centers. This includes locked racks, surveillance, and multi-person access requirements for sensitive hardware maintenance.
2.  **Supply Chain Integrity**: Source all server hardware and components directly from trusted vendors and authorized resellers. Implement a process to verify the authenticity and integrity of hardware upon receipt.
3.  **Tamper-Evident Seals**: Use tamper-evident seals on server chassis to provide a low-tech but effective way to detect unauthorized physical access.

---

## Mitigation
Since software patches are ineffective, mitigation is entirely procedural and strategic.
- **Defense-in-Depth**: Do not rely solely on confidential computing as a security control. Continue to use traditional security measures like data-at-rest encryption, robust access controls, and application-level security within virtual machines.
- **Hardware Vetting**: For highly sensitive environments, consider advanced hardware vetting procedures, including physical inspection or even imaging of components, to detect unauthorized modifications.
- **Trusted Execution Environment (TEE) Evolution**: CPU manufacturers like Intel and AMD will need to address this threat in future processor generations, potentially by encrypting the memory bus itself or implementing physical anti-tampering mechanisms.

**Tags:** Hardware Attack, Confidential Computing, Intel SGX, AMD SEV, Side-channel Attack, Supply Chain Attack, Black Hat

## Sources
- [Battering RAM hardware hack breaks secure CPU enclaves](https://www.csoonline.com/article/2099395/battering-ram-hardware-hack-breaks-secure-cpu-enclaves.html) — CSO Online (2025-12-11)
- [‘Battering RAM’ Attack Bypasses Intel, AMD Memory Encryption](https://www.securityweek.com/battering-ram-attack-bypasses-intel-amd-memory-encryption/) — SecurityWeek (2025-12-11)

---
Source: https://cyber.netsecops.io/articles/battering-ram-hardware-attack-defeats-intel-sgx-amd-sev/
