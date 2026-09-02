# 'SleeperGem' Supply Chain Attack Hits RubyGems via Dormant Accounts

**Severity:** high | **Category:** Supply Chain Attack,Malware,Threat Actor | **Updated:** 2026-07-20 | **Reading time:** 5 min

A sophisticated supply chain attack named 'SleeperGem' has targeted the RubyGems ecosystem by hijacking dormant maintainer accounts. Attackers published malicious versions of at least three gems, including the popular 'fastlane-plugin-run_tests_firebase_testlab', to distribute a persistent backdoor. The malware was designed to specifically target developer machines while evading detection in automated build environments.

## Executive Summary
A coordinated software supply chain attack, dubbed **SleeperGem**, has compromised the **[RubyGems](https://rubygems.org/)** package registry. Uncovered between July 18 and July 19, 2026, the campaign involved threat actors hijacking long-dormant maintainer accounts to publish malicious versions of legitimate packages. The primary goal was to install a persistent, multi-stage backdoor onto developer workstations. The attack leveraged a malicious dependency, `git_credential_manager`, which was added to popular gems, including one with over 574,000 downloads, significantly amplifying its reach. This incident highlights the growing threat of account takeovers in open-source registries as a vector for widespread compromise.

---

## Threat Overview
The **SleeperGem** attack centered on the hijacking of inactive developer accounts on **RubyGems**, a common repository for Ruby software packages. The attackers used this access to publish trojanized updates to several gems.

*   **Malicious Payload**: A new gem named `git_credential_manager` was created to impersonate the legitimate **[Microsoft Git Credential Manager](https://github.com/git-ecosystem/git-credential-manager)**. This package was the primary malware delivery vehicle.
*   **Compromised Gems**: At least two other legitimate gems were compromised to add `git_credential_manager` as a dependency:
    *   `Dendreo` (versions 1.1.3, 1.1.4)
    *   `fastlane-plugin-run_tests_firebase_testlab` (version 0.3.2), a package with over 574,000 total downloads.

This dependency confusion technique caused developers who updated or installed the compromised gems to unknowingly pull in the malicious code. The updates were pushed directly to the registry without corresponding source code commits, making the changes harder to spot.

---

## Technical Analysis
The attack unfolded in multiple stages, demonstrating increasing sophistication.
1.  **Initial Compromise**: The attackers gained control of dormant **RubyGems** accounts, such as "LR-DEV" and "pinkroom". ([`T1195.001 - Compromise Software Dependencies and Development Tools`](https://attack.mitre.org/techniques/T1195/001/)).
2.  **Dropper Payload**: The malicious `git_credential_manager` gem acted as a first-stage dropper. Early versions fetched a second-stage payload from an attacker-controlled Forgejo (a Git service) host. Later versions embedded the execution logic directly, triggered by a simple `require` statement.
3.  **Evasion**: The malicious code included checks to determine if it was running in a CI/CD or automated build environment. If so, it would abort execution, indicating a clear intent to target developer machines specifically and evade automated security scanning ([`T1480.001 - Virtualization/Sandbox Evasion: System Checks`](https://attack.mitre.org/techniques/T1480/001/)).
4.  **Persistence and Privilege Escalation**: Once on a developer's machine, the second-stage payload established persistence using both `systemd` services and `cron` jobs ([`T1543.002 - Create or Modify System Process: Systemd Service`](https://attack.mitre.org/techniques/T1543/002/), [`T1547.006 - Boot or Logon Autostart Execution: Cron`](https://attack.mitre.org/techniques/T1547/006/)). It also attempted to escalate privileges by installing a `setuid root` shell at `/usr/local/sbin/ping6`, giving the attacker persistent root access ([`T1548.003 - SUID and SGID`](https://attack.mitre.org/techniques/T1548/003/)).

---

## Impact Assessment
Any developer machine that installed the malicious versions of the affected gems should be considered fully compromised. The impact is severe:
*   **Credential Theft**: The backdoor provides attackers with access to the developer's machine, allowing them to steal SSH keys, API tokens, passwords, and other secrets stored locally.
*   **Code Poisoning**: An attacker with access to a developer's machine can inject malicious code into the company's private source code repositories, leading to a much larger supply chain compromise.
*   **Lateral Movement**: The compromised developer machine can be used as a pivot point to move laterally within the corporate network.
*   **Loss of Trust**: Such attacks erode trust in the open-source ecosystem and place a significant burden on developers to vet every dependency.

---

## IOCs — Directly from Articles
| Type | Value | Description |
|---|---|---|
| file_name | `git_credential_manager` | Malicious gem impersonating Microsoft's tool. Versions 2.8.0 - 2.8.3 are malicious. |
| file_name | `Dendreo` | Legitimate gem with malicious versions 1.1.3 and 1.1.4. |
| file_name | `fastlane-plugin-run_tests_firebase_testlab` | Legitimate gem with malicious version 0.3.2. |

---

## Cyber Observables — Hunting Hints
Security teams and developers should hunt for the following activity:

| Type | Value | Description |
|---|---|---|
| File Path | `/usr/local/sbin/ping6` | Check for the existence of this file and if it has the `setuid` bit enabled. |
| Service Name | `systemd` user services | Look for newly created or suspicious `systemd` services in user directories (`~/.config/systemd/user/`). |
| Log Source | `cron` logs | Review `cron` logs for the creation of new, unexpected cron jobs. |
| Network Traffic | Outbound to Forgejo hosts | Monitor for network connections from developer machines to unknown or untrusted Forgejo or Gitea instances. |
| Command Line Pattern | `gem install git_credential_manager` | Search shell history and build logs for the installation of the malicious gem. |

---

## Detection & Response
1.  **Dependency Scanning**: Use dependency scanning tools to check `Gemfile.lock` for the presence of the malicious packages and versions. Immediately remove them if found.
2.  **System Investigation**: If a malicious gem is found, the host must be considered compromised. Isolate the machine from the network and perform a full forensic investigation. Look for the persistence mechanisms (systemd, cron) and the `setuid` binary.
3.  **Credential Rotation**: All credentials on the compromised machine must be rotated, including SSH keys, GPG keys, API tokens, and browser-stored passwords.
4.  **Code Review**: Review all recent code commits made from the compromised machine to ensure no malicious code was injected into source code repositories.

---

## Mitigation
1.  **Use Lockfiles**: Always use `Gemfile.lock` to ensure repeatable builds and prevent unexpected updates to dependencies. This is a form of **D3FEND**'s [`D3-ACH: Application Configuration Hardening`](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening).
2.  **Vet Dependencies**: Before adding a new dependency, vet the package. Check its download history, maintainer activity, and issue tracker. Be wary of packages from new or long-inactive maintainers. 
3.  **Principle of Least Privilege**: Developers should not run builds or package management tools with root privileges. Run development tasks as a non-privileged user to limit the impact of a compromised dependency.
4.  **Enable MFA on Registries**: Maintainers should secure their **RubyGems** accounts with multi-factor authentication to prevent takeovers. This aligns with **D3FEND**'s [`D3-MFA: Multi-factor Authentication`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication).

**Tags:** Supply Chain, RubyGems, Backdoor, Developer Security, SleeperGem, Typosquatting

## Sources
- [SleeperGem Uses Three Malicious RubyGems Packages to Target Developer Machines](https://thehackernews.com/2026/07/sleepergem-uses-three-malicious.html) — The Hacker News (2026-07-20)
- [SleeperGem: How attackers hijacked dormant RubyGems accounts to push a persistent backdoor | daily.dev](https://daily.dev/posts/sleepergem-how-attackers-hijacked-dormant-rubygems-accounts-to-push-a-persistent-backdoor-x253e5cla) — daily.dev (2026-07-19)
- [SleeperGem: RubyGems supply chain attack targets dormant maintainer accounts](https://aikido.dev/blog/sleepergem-rubygems-supply-chain-attack) — Aikido Security (2026-07-19)
- [SleeperGem: RubyGems supply chain attack targets dormant maintainer accounts](https://daily.dev/posts/sleepergem-rubygems-supply-chain-attack-targets-dormant-maintainer-accounts-q90puc15p) — daily.dev (2026-07-19)
- [SleeperGem RubyGems Attack Backdoored Developer Machines via Hijacked Dormant Gems](https://mallory.ai/stories/019f79a2-1d28-725b-9e14-d9c191786265) — Mallory (2026-07-19)

---
Source: https://cyber.netsecops.io/articles/sleepergem-supply-chain-attack-hijacks-dormant-rubygems-accounts/
