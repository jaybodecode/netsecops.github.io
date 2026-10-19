# Malicious Go Packages Impersonating Google UUID Library Steal Data

**Severity:** high | **Category:** Supply Chain Attack,Malware,Threat Actor | **Updated:** 2025-12-07 | **Reading time:** 4 min

A sophisticated and long-running supply chain attack targeting Go developers has been discovered, active since at least May 2021. The attack involves two malicious packages, `github.com/bpoorman/uuid` and `github.com/bpoorman/uid`, which impersonate a popular Google UUID library using a typosquatting technique. The counterfeit packages are fully functional to avoid suspicion but contain a hidden backdoor. A specific function, `Valid`, is weaponized to secretly encrypt and exfiltrate any data passed to it, such as user IDs or session tokens, to an external paste site. This stealthy method allows the attacker, 'bpoorman', to siphon sensitive information from compromised applications.

## Executive Summary
Security researchers have uncovered a stealthy software supply chain attack that has been active for over four years, since May 2021. The campaign targets developers using the Go programming language through a typosquatting scheme. Two malicious packages, `github.com/bpoorman/uuid` and `github.com/bpoorman/uid`, were published to impersonate the legitimate and widely-used `google/uuid` library. The malicious packages replicate the full functionality of the original library to evade detection, but include a hidden backdoor. This backdoor is embedded in the `Valid` helper function, which secretly encrypts and exfiltrates any data processed by it to an attacker-controlled server, posing a significant risk of sensitive data theft from development environments and production applications.

---

## Threat Overview
This attack is a classic example of a **typosquatting** campaign, a type of supply chain attack where a threat actor publishes a malicious package with a name very similar to a popular, legitimate one. The attacker, using the handle **bpoorman**, relied on developers either mistyping the name of the legitimate package (`pborman/uuid` or `google/uuid`) or failing to notice the subtle difference in their project's dependencies. 

The campaign's longevity and stealth are notable. By ensuring the malicious packages were fully functional—correctly generating UUIDs as expected—the attacker avoided causing application crashes or obvious bugs that would have alerted developers. This allowed the backdoor to remain dormant and undiscovered for an extended period, potentially compromising numerous projects and applications.

## Technical Analysis
The core of the malicious activity lies within a trojanized helper function. 
1.  **Impersonation:** The attacker created repositories and packages with names (`bpoorman/uuid`) that are visually and phonetically similar to the legitimate ones (`pborman/uuid`). This is the primary technique for [`T1195.001 - Compromise Software Dependencies and Development Tools`](https://attack.mitre.org/techniques/T1195/001/).
2.  **Hidden Backdoor:** The legitimate `Valid` function in the original library is used to check if a UUID is well-formed. In the malicious version, this function was modified to include a data exfiltration routine.
3.  **Data Exfiltration:** When a developer's code calls the `Valid` function, the malicious code first performs the expected validation to maintain its cover. It then secretly encrypts the data that was passed to it and exfiltrates it via an HTTP POST request to an external paste site. This exfiltration method is mapped to [`T1048 - Exfiltration Over Alternative Protocol`](https://attack.mitre.org/techniques/T1048/). The use of a hardcoded token suggests a dedicated endpoint for collecting stolen data from all victims.

This attack vector is particularly insidious because it targets a function that developers would naturally use to process and validate data, such as user IDs, session tokens, email addresses, or other sensitive identifiers.

## Impact Assessment
The primary impact is the theft of sensitive data. Depending on how the compromised library was used, the stolen data could include:
- Personally Identifiable Information (PII) of users.
- Session tokens, API keys, and other credentials, which could lead to account takeovers.
- Internal system identifiers and proprietary business data.

Because the attack ran for over four years, the cumulative data loss across all affected applications could be substantial. It also undermines trust in the open-source ecosystem, particularly for package registries that lack stringent vetting processes. Organizations that incorporated these malicious packages into their software could be facing silent data breaches and may be unknowingly non-compliant with data protection regulations.

## IOCs
| Type | Value | Description |
|---|---|---|
| `file_name` | `github.com/bpoorman/uuid` | Malicious Go package impersonating a legitimate UUID library. |
| `file_name` | `github.com/bpoorman/uid` | Malicious Go package impersonating a legitimate UUID library. |
| `other` | `bpoorman` | GitHub user handle of the threat actor. |

## Detection & Response
- **Dependency Scanning:** Regularly scan `go.mod` and `go.sum` files in all Go projects for the presence of the malicious packages (`github.com/bpoorman/uuid`, `github.com/bpoorman/uid`). Use dependency analysis tools that check against databases of known malicious packages. This relates to D3FEND's [`File Analysis`](https://d3fend.mitre.org/technique/d3f:FileAnalysis).
- **Network Monitoring:** Monitor for and investigate unexpected outbound HTTP/HTTPS connections from build servers and application servers, especially to unknown paste sites or generic cloud service endpoints. This is an application of D3FEND's [`Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering).
- **Code Review:** Encourage peer review of dependency changes. Manually inspect the source code of new or unfamiliar dependencies before incorporating them into a project.

## Mitigation
1.  **Dependency Verification:** Before adding a new dependency, verify the legitimacy of the author and repository. Check for signs of a healthy project, such as a long commit history, multiple contributors, and a significant number of stars or forks on platforms like GitHub.
2.  **Use Automated Security Tools:** Integrate automated security tools into the CI/CD pipeline. Tools like Socket, Snyk, or Dependabot can automatically scan for typosquatting, malicious packages, and known vulnerabilities in dependencies. This is a form of D3FEND's [`Dynamic Analysis`](https://d3fend.mitre.org/technique/d3f:DynamicAnalysis).
3.  **Restrict Network Egress:** Apply strict egress filtering rules to build servers and production environments. By default, deny all outbound internet access and only allow connections to a specific list of required, trusted domains. This would have blocked the data exfiltration to the paste site.
4.  **Vendor Dependencies:** Whenever possible, use official libraries provided and maintained by trusted vendors (e.g., `google/uuid` from Google itself) rather than third-party forks or implementations.

**Tags:** Go, Typosquatting, Dependency Confusion, Software Supply Chain, Data Exfiltration

## Sources
- [Malicious Go Packages Impersonate Google's UUID Library to Steal Sensitive Data](https://gbhackers.on-line/malicious-go-packages-impersonate-googles-uuid-library-to-steal-sensitive-data/) — GBHackers (2025-12-06)
- [Malicious Go Libraries Mimic as Google UUID to Exfiltrate User Data](https://cyberpress.com/malicious-go-libraries-mimic-as-google-uuid-to-exfiltrate-user-data/) — Cyberpress (2025-12-06)
- [Malicious Go Packages Mimic as Google's UUID Library to Exfiltrate Sensitive Data](https://infosecurity.report/2025/12/08/malicious-go-packages-mimic-as-googles-uuid-library-to-exfiltrate-sensitive-data/) — Infosecurity Report (2025-12-08)

---
Source: https://cyber.netsecops.io/articles/malicious-go-packages-impersonate-google-uuid-library-in-supply-chain-attack/
