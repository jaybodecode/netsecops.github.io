# New 'LinkPro' Linux Rootkit Uses eBPF and 'Magic Packets' for Ultimate Stealth

**Severity:** high | **Category:** Malware,Cloud Security | **Updated:** 2025-10-16 | **Reading time:** 6 min

Security researchers have uncovered a sophisticated new GNU/Linux rootkit named 'LinkPro' after investigating a compromised AWS environment. The malware demonstrates advanced stealth capabilities by leveraging extended Berkeley Packet Filter (eBPF) modules to hide its processes and files from security tools. Furthermore, it employs a novel activation mechanism, lying dormant until it receives a specially crafted 'magic packet' over the network. The initial intrusion vector was a vulnerable Jenkins server, from which the attackers deployed the rootkit via a malicious Docker image.

## Executive Summary
Security researchers at the French firm Synacktiv have discovered a highly sophisticated and stealthy GNU/Linux rootkit named **LinkPro**. The malware was found during an investigation of a compromised **[Amazon Web Services (AWS)](https://aws.amazon.com/)** infrastructure. **LinkPro** utilizes advanced, modern techniques to evade detection. Its core features include the use of two extended Berkeley Packet Filter (**[eBPF](https://ebpf.io/)**) modules: one to hook kernel functions and hide its own presence (files, processes, network connections), and another to act as a network sniffer that activates the rootkit only upon receiving a specific "magic packet." This allows the malware to remain completely dormant and invisible on a compromised system until the attacker chooses to activate it. The initial compromise was achieved by exploiting **[CVE-2024-23897](https://nvd.nist.gov/vuln/detail/CVE-2024-23897)** in a public-facing **[Jenkins](https://www.jenkins.io/)** server, followed by the deployment of a malicious Docker image.

---

## Threat Overview
The discovery of **LinkPro** highlights a growing trend of malware authors adopting eBPF to create powerful and evasive rootkits. eBPF allows programs to run in a sandboxed environment within the Linux kernel, making it a powerful tool for both performance monitoring and, in this case, malicious activity.

**Attack Chain:**
1.  **Initial Access:** The attackers exploited **[CVE-2024-23897](https://nvd.nist.gov/vuln/detail/CVE-2024-23897)**, a known vulnerability in a **Jenkins** server, to gain an initial foothold in the target's AWS environment.
2.  **Deployment:** The attackers deployed a malicious Docker Hub image named `kvlnt/vv` onto the victim's Kubernetes clusters. This image, based on Kali Linux, contained the **LinkPro** rootkit components.
3.  **Execution & Persistence:** The rootkit is installed and executed. It then loads its eBPF modules into the kernel.
4.  **Stealth:** One eBPF module hooks various kernel functions (kprobes) to filter out any information related to the rootkit's files, processes, or network activity from being returned by system utilities like `ls`, `ps`, and `netstat`.
5.  **Dormant C2:** The second eBPF module attaches to a raw network socket (XDP - eXpress Data Path) to inspect all incoming network packets at a very low level. It lies dormant, waiting for a TCP packet with specific characteristics (the "magic packet").
6.  **Activation:** When the magic packet is received, the rootkit activates, likely establishing a reverse shell or other command-and-control channel to the attacker.

---

## Technical Analysis
**LinkPro** represents a significant step up in Linux rootkit sophistication.

### MITRE ATT&CK Techniques:
- **Initial Access:** [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/) (exploiting the Jenkins vulnerability).
- **Execution:** [`T1059.004 - Command and Scripting Interpreter: Unix Shell`](https://attack.mitre.org/techniques/T1059/004/).
- **Defense Evasion:**
  - [`T1070.004 - Indicator Removal: File Deletion`](https://attack.mitre.org/techniques/T1070/004/).
  - [`T1562.001 - Impair Defenses: Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/).
  - [`T1222.002 - File and Directory Permissions Modification: Linux and Mac File and Directory Permissions Modification`](https://attack.mitre.org/techniques/T1222/002/).
  - [`T1574.006 - Hijack Execution Flow: Dynamic Linker Hijacking`](https://attack.mitre.org/techniques/T1574/006/) (a traditional rootkit technique, though eBPF is a more modern approach).
  - **(New/Emerging) T1613 - eBPF-based Rootkit:** This is a conceptual mapping for this specific technique.
- **Command and Control:** [`T1090.002 - Proxy: External Proxy`](https://attack.mitre.org/techniques/T1090/002/). The magic packet triggers a C2 connection.
- **Persistence:** The rootkit itself, once installed, acts as a persistent backdoor.

### eBPF for Malice:
The use of eBPF is what makes **LinkPro** so dangerous:
- **Kernel-Level Operation:** eBPF programs run within the kernel, giving them a high level of privilege and the ability to intercept and manipulate system calls.
- **Hiding:** By hooking functions related to file and process listing, the rootkit can effectively become invisible to standard administrative tools and some security software operating in user space.
- **Stealthy C2 Trigger:** Using an eBPF program to sniff for a magic packet is far stealthier than maintaining a constant C2 connection or listening on an open port, both of which are easily detectable via network scanning.

---

## Impact Assessment
A successful **LinkPro** infection gives an attacker a persistent, stealthy, and powerful foothold within a compromised Linux environment.
- **Complete System Control:** Once activated, the attacker can execute any command as root, allowing them to steal data, deploy other malware (like cryptominers or ransomware), or use the compromised system as a pivot point to attack other parts of the network.
- **Detection Difficulty:** The advanced stealth capabilities mean that the rootkit could remain undetected for long periods, allowing attackers to conduct long-term espionage.
- **Cloud Environment Risk:** The deployment via a malicious Docker image in a Kubernetes cluster highlights the risk to modern cloud-native environments, where a single compromised container can lead to a widespread breach.

---

## Detection & Response
Detecting eBPF-based rootkits is challenging and requires specialized tools.

1.  **eBPF Monitoring:** Use tools specifically designed to monitor eBPF activity on a system. Tools like `bpftool` can be used to list loaded eBPF programs and the kernel functions they are attached to. Look for unknown or suspicious eBPF programs.
2.  **Kernel Integrity Monitoring:** Use kernel runtime security tools that can detect hooking of kernel functions or other forms of tampering at the kernel level.
3.  **Network Analysis:** While the magic packet is designed to be stealthy, deep packet inspection might be able to identify network traffic that doesn't conform to expected patterns, although this is very difficult.
4.  **IOC Sweeping:** Scan for the file-based indicators of the **LinkPro** rootkit if they are known.

---

## Mitigation
1.  **Patch Management:** The initial access vector was a known vulnerability. Promptly patching internet-facing services like Jenkins is the most effective way to prevent this attack chain from starting. This is an application of **[D3FEND Software Update (D3-SU)](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.
2.  **Container Security:** Implement container security best practices. Do not run containers as root. Use trusted, minimal base images. Scan Docker images for vulnerabilities and malware before deployment.
3.  **Restrict eBPF:** On systems where it is not needed, consider disabling the ability to load new eBPF programs by setting the `kernel.unprivileged_bpf_disabled` sysctl parameter. This is a strong hardening measure but may break legitimate monitoring tools.
4.  **Least Privilege:** Ensure that services like Jenkins run with the minimum necessary privileges and are isolated from the rest of the environment.

## CVEs
- CVE-2024-23897

**Tags:** LinkPro, Linux, Rootkit, eBPF, Malware, Cloud Security, AWS, Jenkins, Docker

## Sources
- [LinkPro Linux Rootkit Uses eBPF to Hide and Activates via Magic TCP Packets](https://thehackernews.com/) — The Hacker News (2025-10-16)

---
Source: https://cyber.netsecops.io/articles/new-linkpro-linux-rootkit-uses-ebpf-to-hide-from-security-tools/
