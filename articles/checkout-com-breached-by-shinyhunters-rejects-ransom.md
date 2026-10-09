# Checkout.com Rejects Ransom After ShinyHunters Breach, Donates to Research

**Severity:** high | **Category:** Data Breach,Threat Actor,Cloud Security | **Updated:** 2025-11-16 | **Reading time:** 4 min

The global payment processor Checkout.com has disclosed a data breach orchestrated by the ShinyHunters cybercrime group. The attackers exploited a legacy third-party cloud file storage system that was improperly decommissioned. After being contacted with a ransom demand, Checkout.com refused to pay. In a bold move, the company announced it will instead donate the equivalent ransom amount to cybersecurity research institutions, including Carnegie Mellon University and the University of Oxford. The breach did not impact the core payment platform or cardholder data.

## Executive Summary
Global payment processor **[Checkout.com](https://www.checkout.com/)** has confirmed it was the target of a data breach by the notorious **[ShinyHunters](https://malpedia.caad.fkie.fraunhofer.de/actor/shinyhunters)** cybercrime group. The attackers gained access to a legacy cloud file storage system containing internal operational documents. In a notable departure from typical incident responses, **Checkout.com** has publicly refused to pay the ransom demanded by the attackers. Instead, the company has pledged to donate the equivalent sum to the cybersecurity research centers at Carnegie Mellon University and the University of Oxford. The company's investigation found that its core payment processing environment, merchant funds, and payment card data were not compromised, as the breach was contained to an isolated, outdated system.

---

## Threat Overview
The breach was initiated by **ShinyHunters**, a well-known threat group responsible for numerous high-profile data breaches, including attacks on Microsoft and Ticketmaster. The group's primary motivation is financial, typically achieved by stealing data and either selling it on dark web forums or extorting the victim company. In this case, the attackers identified and exploited a misconfiguration in **Checkout.com's** asset inventory: a legacy third-party cloud storage system that was last used in 2020 but had not been properly decommissioned. This oversight provided an entry point for the attackers to access and exfiltrate data.

---

## Technical Analysis
The root cause of the breach was a failure in asset management and decommissioning processes. The attack vector was not a sophisticated zero-day, but rather the exploitation of a forgotten, insecure asset.

- **Attack Vector:** Access to an insecure, legacy cloud file storage system.
- **Data Exposed:** Internal operational documents and merchant onboarding materials. The data of less than 25% of the current merchant base may have been affected.
- **Data Not Exposed:** Core payment platform, merchant funds, payment card numbers (PCI data).

This incident highlights a common but critical security gap: organizations losing track of their digital assets, especially in complex, multi-cloud environments. Such 'shadow IT' or legacy systems often fall outside the scope of regular security monitoring and patching, making them prime targets for attackers.

### MITRE ATT&CK Techniques
- [`T1530 - Data from Cloud Storage Object`](https://attack.mitre.org/techniques/T1530/): The primary technique used by **ShinyHunters** to access and exfiltrate data from the misconfigured cloud storage.
- [`T1580 - Cloud Infrastructure Discovery`](https://attack.mitre.org/techniques/T1580/): Attackers likely scanned for and discovered the exposed cloud asset as part of their reconnaissance.
- [`T1657 - Financial Theft`](https://attack.mitre.org/techniques/T1657/): While direct financial theft was not achieved, the ransom demand falls under this category, representing the attacker's ultimate goal.

---

## Impact Assessment
While the breach did not compromise the most sensitive financial data, the impact is still significant:

- **Operational Impact:** The company has had to dedicate resources to investigation, remediation, and merchant notification, causing operational friction.
- **Reputational Impact:** A data breach at a payment processor can damage trust. However, **Checkout.com's** transparent communication and its decision to donate the ransom amount may mitigate some of this damage and generate positive sentiment.
- **Regulatory Scrutiny:** The company is collaborating with law enforcement and regulatory bodies, which could lead to investigations and potential fines depending on the nature of the exposed data and applicable regulations like GDPR.

---

## Detection & Response
Detecting such an incident relies on comprehensive visibility into all cloud assets.

1.  **Cloud Security Posture Management (CSPM):** Use CSPM tools to continuously scan cloud environments for misconfigurations, public-facing storage objects, and inactive but provisioned resources.
2.  **Data Loss Prevention (DLP):** Implement DLP solutions to monitor and alert on large or unusual data movements from cloud storage, which could indicate exfiltration.
3.  **Asset Inventory:** Maintain a complete and up-to-date inventory of all IT and cloud assets. This is foundational to security and a key D3FEND principle related to [`System Configuration Permissions`](https://d3fend.mitre.org/technique/d3f:SystemConfigurationPermissions).

**Checkout.com's** response sets a strong precedent. By refusing to pay the ransom, they avoid funding criminal activity. By donating the funds, they turn a negative event into a positive contribution to the security community, reinforcing their commitment to fighting cybercrime.

---

## Mitigation
To prevent similar breaches, organizations must focus on fundamental cybersecurity hygiene:

- **Asset Management and Decommissioning:** Implement strict processes for tracking all assets throughout their lifecycle. When a system or service is retired, ensure all associated data is securely deleted and the infrastructure is fully de-provisioned.
- **Cloud Access Control:** Enforce the principle of least privilege for all cloud resources. Ensure that storage objects are not publicly accessible by default and that access is restricted to authorized users and services.
- **Regular Audits:** Conduct periodic audits of cloud environments to identify and remediate abandoned or misconfigured assets.
- **Vendor Risk Management:** When using third-party cloud services, ensure their security posture meets your organization's standards and that clear lines of responsibility are established.

**Tags:** ShinyHunters, data breach, Checkout.com, cloud security, ransom, asset management

## Sources
- [Checkout.com Hacked - ShinyHunters Breached Cloud Storage - Cyber Security News](https://www.hackread.com/checkout-com-hacked-shinyhunters-breached-cloud-storage/) — HackRead (2025-11-14)
- [Checkout.com Breach: ShinyHunters Hack Cloud Storage, Ransom Demand Rejected](https://www.infosecurity-magazine.com/news/checkoutcom-breach-shinyhunters/) — Infosecurity Magazine (2025-11-14)
- [Checkout.com Suffers Data Breach as ShinyHunters Attack Cloud Storage - GBHackers](https://gbhackers.com/checkout-com-suffers-data-breach/) — GBHackers (2025-11-14)
- [They refused to pay the ransom demanded by the cybercrime group, saying they would donate it to security research instead. - GIGAZINE](https://gigazine.net/gsc_news/en/20251114-checkout-com-extortion/) — GIGAZINE (2025-11-14)
- [Checkout.com Data Breach Exposes Old Merchant Files - The Cyber Express](https://thecyberexpress.com/checkout-com-data-breach-legacy-system/) — The Cyber Express (2025-11-14)
- [Checkout Ltd refuses to pay, donates ransom to research instead - Computing UK](https://www.computing.co.uk/news/4217154/checkout-refuses-pay-donates-ransom-research) — Computing UK (2025-11-14)

---
Source: https://cyber.netsecops.io/articles/checkout-com-breached-by-shinyhunters-rejects-ransom/
