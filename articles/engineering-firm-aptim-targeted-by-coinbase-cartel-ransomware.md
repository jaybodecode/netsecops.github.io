# Coinbase Cartel Ransomware Group Claims Attack on Engineering Firm Aptim, Threatens Data Leak

**Severity:** high | **Category:** Ransomware,Data Breach,Threat Actor | **Updated:** 2026-04-25 | **Reading time:** 5 min

The ransomware group known as 'Coinbase Cartel' has claimed responsibility for a cyberattack against Aptim, a U.S.-based engineering, program management, and construction firm. On April 23, the group posted the claim on its leak site, threatening to release confidential data if its ransom demands are not met. The attackers also included a technical detail—what appears to be a Kerberos pre-authentication hash—suggesting they may have compromised account credentials within Aptim's network through a Kerberoasting attack.

## Executive Summary

The ransomware group **Coinbase Cartel** has added **Aptim**, a U.S. engineering and professional services company, to its list of victims. In a post on its dark web leak site dated April 23, 2026, the group claimed to have breached Aptim's network and exfiltrated confidential data. The attackers are threatening to publish the stolen information unless a ransom is paid. Notably, the group included a technical artifact in their post, a string that strongly resembles a Kerberos pre-authentication hash. This suggests that the initial access or privilege escalation may have been achieved via a Kerberoasting attack, targeting service account credentials within Aptim's Active Directory environment.

---

## Threat Overview

Aptim, a Louisiana-based firm, provides critical engineering, environmental, and infrastructure solutions to both government and commercial clients. A breach of its network could expose highly sensitive data, including intellectual property, project blueprints, and confidential client information.

The Coinbase Cartel group is employing a double extortion tactic: not only is data likely encrypted on Aptim's systems, but the exfiltrated data is being held hostage with the threat of public release. This puts maximum pressure on the victim to pay.

The most significant detail provided by the attackers is the hash string: `$krb5pa$23$APTIM.COM...`. This format is characteristic of a hash captured during a Kerberoasting attack. This indicates a likely compromise of at least one service account within Aptim's domain, which could have been used for initial access or, more likely, for privilege escalation and lateral movement within the network.

---

## Technical Analysis

Based on the evidence, the attack likely involved the following TTPs from the MITRE ATT&CK framework:

1.  **Credential Access:** The provided hash strongly suggests the use of [`T1558.003 - Kerberoasting`](https://attack.mitre.org/techniques/T1558/003/). In this technique, an attacker with any valid domain user account can request service tickets (TGS) for service accounts. If these service accounts have weak passwords, the attacker can take the encrypted portion of the ticket offline and crack the password, gaining access to the service account.
2.  **Lateral Movement:** Once the service account credential was cracked, the attackers would have used it for lateral movement via [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/). A compromised service account can often provide extensive, privileged access across the network.
3.  **Collection & Exfiltration:** The attackers would have then collected sensitive data from file shares and databases before exfiltrating it ([`T1567 - Exfiltration Over Web Service`](https://attack.mitre.org/techniques/T1567/)) to their own servers.
4.  **Impact:** Finally, the group would deploy their ransomware to encrypt systems, achieving impact via [`T1486 - Data Encrypted for Impact`](https://attack.mitre.org/techniques/T1486/).

> The inclusion of the Kerberos hash in the leak post is a form of psychological pressure, demonstrating to the victim (and security researchers) that the attackers have deep access and technical knowledge of their internal network.

---

## Impact Assessment

For an engineering firm like Aptim, the impact of this breach is severe. The exfiltration of confidential data could lead to the theft of valuable intellectual property and proprietary designs. If government client data is involved, it could trigger regulatory and contractual penalties. The public leak of this data would cause significant reputational damage and could be used by competitors. Operationally, the company is likely facing significant disruption from the encryption of its systems, leading to project delays and financial losses associated with recovery and incident response.

---

## IOCs — Directly from Articles

| Type | Value | Description |
|---|---|---|
| other | `$krb5pa$23$APTIM.COM...` | A Kerberos pre-authentication hash associated with a service account in the APTIM.COM domain. This is an Indicator of a Kerberoasting attack. |

---

## Cyber Observables — Hunting Hints

Security teams can hunt for Kerberoasting activity with the following methods:

| Type | Value | Description |
|---|---|---|
| event_id | `4769` | In the Windows Security Event Log, a Kerberos service ticket was requested. This is a normal event, but a high volume of these events from a single source for multiple service accounts is a strong indicator of a Kerberoasting attempt. |
| log_source | `Windows Security Event Log` | Specifically look for Event ID 4769 where the Service Name does not end in `$` (i.e., is not a computer account) and the ticket encryption type is `0x17` (RC4-HMAC). |
| user_account_pattern | `svc_*` or `service_*` | Monitor for anomalous activity from accounts with naming conventions that indicate they are service accounts. |

---

## Detection & Response

Detecting Kerberoasting is key to stopping this attack chain early.
*   **SIEM Alerting:** Configure SIEM rules to detect the signs of Kerberoasting. Alert on a single user account requesting an abnormally high number of service tickets in a short period. This aligns with [`D3-DAM: Domain Account Monitoring`](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring).
*   **EDR Monitoring:** EDR tools can detect the execution of tools commonly used for Kerberoasting, such as Rubeus or components of the Impacket framework.
*   **Decoy Accounts:** Create service accounts with tempting names (e.g., `svc_sql_admin`) and extremely long, complex passwords. Place them as honeypots and configure alerts for any access attempts, as no legitimate process should ever use them.

Upon detecting a Kerberoasting attempt, the security team should immediately investigate the source account to determine if it is compromised and analyze which service accounts were targeted.

---

## Mitigation

Mitigating Kerberoasting is a critical Active Directory hardening task:

1.  **Strong Service Account Passwords:** The most effective mitigation is to ensure all service accounts have long (25+ characters), complex, and unique passwords. Because the hashes are cracked offline, password complexity is the primary defense. This is a core part of a [`D3-SPP: Strong Password Policy`](https://d3fend.mitre.org/technique/d3f:StrongPasswordPolicy).
2.  **Use Group Managed Service Accounts (gMSAs):** Where possible, replace traditional service accounts with gMSAs. Windows manages the passwords for gMSAs automatically, making them extremely long and complex, and rotates them regularly, making them immune to Kerberoasting.
3.  **Principle of Least Privilege:** Limit the privileges of service accounts to only what is absolutely necessary for their function.
4.  **Audit Service Accounts:** Regularly audit all service accounts to ensure they are still needed and have appropriate permissions.

**Tags:** Coinbase Cartel, Ransomware, Aptim, Kerberoasting, Data Breach, Engineering

## Sources
- [Coinbase Cartel Infiltrates Engineering Leader Aptim](https://dexpose.io/blog/coinbase-cartel-infiltrates-engineering-leader-aptim) — Dexpose (2026-04-24)
- [APTIM Data Breach in 2026](https://breachsense.com/breach/aptim-com) — BreachSense (2026-04-24)
- [Ransomware Group coinbasecartel Hits: Aptim](https://www.hookphish.com/blog/ransomware-group-coinbasecartel-hits-aptim) — HookPhish (2026-04-24)
- [Victim: Aptim](https://ransomware.live/victim/aptim/) — Ransomware.live (2026-04-24)

---
Source: https://cyber.netsecops.io/articles/engineering-firm-aptim-targeted-by-coinbase-cartel-ransomware/
