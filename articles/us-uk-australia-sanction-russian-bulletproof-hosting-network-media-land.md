# US, UK, and Australia Sanction Russian Bulletproof Hosting Network Aiding Ransomware

**Severity:** medium | **Category:** Policy and Compliance,Threat Actor,Regulatory | **Updated:** 2025-11-19 | **Reading time:** 6 min

In a coordinated action, the United States, United Kingdom, and Australia have sanctioned Media Land, LLC, a Russian bulletproof hosting provider, along with its network of related entities and key individuals. This infrastructure is accused of providing essential services to a wide range of global cybercriminals, including malware distributors, phishing operators, and ransomware groups like the notorious LockBit gang. The sanctions aim to disrupt the foundational services that enable cybercrime by targeting the providers who knowingly support malicious operations. The action highlights a strategic international effort to dismantle the cybercrime economy.

## Executive Summary
On November 19, 2025, the **[U.S. Department of the Treasury's Office of Foreign Assets Control (OFAC)](https://ofac.treasury.gov/)**, in coordination with the **United Kingdom** and **Australia**, announced sanctions against a network of Russian bulletproof hosting providers. The primary target is **Media Land, LLC**, and its associated companies and individuals, including Aleksandr Volosovik. This network is accused of providing critical infrastructure and services to a multitude of cybercriminal operations, including malware distribution, phishing campaigns, and facilitating ransomware attacks for groups such as the notorious **[LockBit](https://attack.mitre.org/groups/G0115/)** ransomware gang. This trilateral action signifies a strategic focus on dismantling the underlying ecosystem that supports global cybercrime.

---

## Regulatory Details
This action involves the designation of several entities and individuals on OFAC's Specially Designated Nationals (SDN) List. As a result, all property and interests in property of the designated persons that are in the United States or in the possession or control of U.S. persons are blocked and must be reported to OFAC. Furthermore, any entities that are owned, directly or indirectly, 50 percent or more by one or more blocked persons are also blocked. U.S. persons are generally prohibited from engaging in transactions with the designated parties. The UK and Australia have imposed similar financial sanctions.

### Designated Entities & Individuals:
- **Media Land, LLC**: A Russian bulletproof hosting provider.
- **Aeza Group LLC**: A related entity.
- **Aleksandr Volosovik** (alias “Yalishanda”): A key individual behind the network.
- **Dmitry Khoroshev**: The previously sanctioned administrator of the **[LockBit](https://attack.mitre.org/groups/G0115/)** ransomware group, who was a client of the sanctioned network.

## Affected Organizations
The sanctions directly target the designated Russian entities. However, the intended impact is on the global cybercriminal ecosystem that relies on their services. This includes, but is not limited to:
- Ransomware-as-a-Service (RaaS) groups like **[LockBit](https://attack.mitre.org/groups/G0115/)**.
- Operators of phishing campaigns.
- Malware developers and distributors.
- Money laundering services and underground exchanges.

## Compliance Requirements
Financial institutions and other organizations, particularly in the U.S., UK, and Australia, must immediately take steps to comply with these sanctions:
1.  **Screening:** Screen all customer and transaction databases against the newly updated SDN list to identify any matches with the designated entities or individuals.
2.  **Blocking Assets:** Freeze or block any assets or transactions associated with the designated parties.
3.  **Reporting:** Report any blocked property or transactions to the relevant national authorities (e.g., OFAC in the U.S.).
4.  **Enhanced Due Diligence:** Organizations should conduct enhanced due diligence on transactions involving hosting providers, especially those operating in high-risk jurisdictions, to avoid inadvertently facilitating illicit activities.

## Impact Assessment
This action aims to disrupt the operational capabilities of numerous cybercriminal groups by cutting off their access to resilient hosting infrastructure. Bulletproof hosting providers are a cornerstone of the cybercrime economy, as they willfully ignore abuse complaints and provide a safe haven for malicious content. By sanctioning these providers, the allied governments are increasing the cost and complexity for threat actors to conduct their operations ([`T1583 - Acquire Infrastructure`](https://attack.mitre.org/techniques/T1583/)). While sophisticated groups may find alternatives, this disruption can degrade the capabilities of less-resourced actors and provides law enforcement with valuable intelligence. The inclusion of a Bitcoin address linked to Volosovik also signals an increased focus on disrupting the financial flows of these criminal enterprises.

## Compliance Guidance
- **Update Sanctions Lists:** Ensure that all automated and manual sanctions screening tools are immediately updated with the latest designations from OFAC and equivalent international bodies.
- **Review IP/Domain Data:** Security teams and threat intelligence providers should flag IP ranges and domains associated with Media Land, LLC and its affiliates as high-risk. Outbound connections to this infrastructure should be blocked and investigated. D3FEND's [`D3-DNSDL - DNS Denylisting`](https://d3fend.mitre.org/technique/d3f:DNSDenylisting) is a direct implementation of this.
- **Threat Intelligence Integration:** Ingest threat intelligence feeds that track sanctioned entities and their associated infrastructure into SIEM, SOAR, and firewall platforms to enable automated detection and blocking.
- **Vendor Risk Management:** Re-evaluate relationships with any third-party service providers that may have ties to or rely on infrastructure in high-risk jurisdictions.

**Tags:** Sanctions, OFAC, Bulletproof Hosting, Cybercrime, Russia, LockBit, Threat Actor

## Sources
- [U.S., U.K., and Australia Target Russian Cybercrime Infrastructure](https://www.chainalysis.com/blog/ofac-designation-russian-cybercrime-infrastructure-november-2025/) — Chainalysis (2025-11-19)
- [UK smashes Russian cybercrime networks responsible for attacks on UK businesses](https://www.gov.uk/government/news/uk-smashes-russian-cybercrime-networks-responsible-for-attacks-on-uk-businesses) — GOV.UK (2025-11-19)

---
Source: https://cyber.netsecops.io/articles/us-uk-australia-sanction-russian-bulletproof-hosting-network-media-land/
