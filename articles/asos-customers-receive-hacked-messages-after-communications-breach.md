# ASOS Customers Receive 'Hacked' Messages After Partner Breach

**Severity:** medium | **Category:** Data Breach,Supply Chain Attack,Other | **Updated:** 2026-10-07 | **Reading time:** 4 min

Customers of the online fashion retailer ASOS received bizarre push notifications, including one reading "ASOS has been hacked," on October 6, 2026. The company confirmed the incident was caused by a security breach at a third-party customer communications platform. While customer names and contact details may have been exposed, ASOS stated that sensitive payment information and passwords are not believed to be compromised. The incident highlights the significant risks associated with supply chain partners.

## Executive Summary
On October 6, 2026, customers of the global fashion retailer **[ASOS](https://www.asos.com/)** were alarmed by unauthorized push notifications sent to their mobile devices, with messages including "ASOS has been hacked." The company quickly acknowledged the incident, attributing it to a security compromise at a third-party service provider responsible for customer communications. While the breach may have exposed customer names and contact details, ASOS has stated that passwords and payment information are believed to be secure. The event underscores the vulnerability of organizations to supply chain attacks, where a compromise at a less secure partner can lead to direct, high-profile impact on the primary company's customers and brand.

---

## Threat Overview
The incident was not a direct breach of ASOS's core systems. Instead, an attacker compromised a third-party platform that ASOS uses to send push notifications to its app users. The attacker then abused their access to this platform to send out the rogue messages. Subsequent investigation revealed that the **[Telegram](https://telegram.org/)** account responsible for the notification was also involved in trading accounts for online games, suggesting the perpetrator may have been an opportunistic, less sophisticated actor rather than a major cybercrime syndicate. Regardless of the actor's motivation, the incident caused significant customer confusion and reputational damage.

## Technical Analysis
This is a classic example of a supply chain compromise, mapped to MITRE ATT&CK [`T0866 - Supply Chain Compromise`](https://attack.mitre.org/techniques/T0866). The attacker compromised a trusted third-party relationship to impact the target organization. Once they gained access to the communications platform, they used its legitimate functionality to send malicious or disruptive content to end-users. This abuse of application features for malicious purposes can be seen as a form of [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/), where the attacker used the compromised vendor's account to operate.

## Impact Assessment
While the direct data loss appears to be limited to names and contact details, the impact on customer trust is significant. Receiving a notification that a trusted brand has been "hacked" directly on one's personal device is alarming and can lead to customer churn and negative publicity. The exposed contact details also create an increased risk of follow-on phishing attacks, where criminals could impersonate ASOS in emails or text messages to try and steal more sensitive information. The incident demonstrates that even a compromise of a non-critical, third-party marketing tool can have serious consequences for a business.

## IOCs — Directly from Articles
No specific, actionable Indicators of Compromise were provided in the source articles.

## Cyber Observables — Hunting Hints
To detect similar supply chain abuse, organizations can monitor:
| Type | Value | Description |
|---|---|---|
| log_source | API Gateway Logs | Monitor API calls to third-party services for unusual frequency, volume, or unauthorized function calls. |
| other | (Customer reports) | A sudden influx of customer reports about strange messages or emails should be treated as a potential indicator of a third-party compromise. |
| api_endpoint | (Message sending APIs) | Pay close attention to the authentication and authorization logs for any API endpoints capable of sending communications to customers. |

## Detection & Response
- **Third-Party API Monitoring:** Implement robust monitoring and alerting on the APIs used to integrate with third-party services. Look for anomalies in usage, such as a spike in the number of messages sent or authentication attempts from new IP addresses.
- **Incident Response Plan:** Your incident response plan must include specific playbooks for handling third-party and supply chain breaches. This should include pre-defined communication plans for customers and steps for disabling the integration with the compromised vendor.
- **Customer Communication Channels:** Establish clear, out-of-band communication channels (e.g., a dedicated status page or social media account) to provide customers with accurate information during a security incident.

## Mitigation
- **Vendor Risk Management:** Conduct thorough security assessments of all third-party vendors before integrating their services. This should include reviewing their security policies, certifications (e.g., SOC 2), and incident response capabilities.
- **Principle of Least Privilege:** When integrating with a third party, grant them the absolute minimum level of access and permissions required for the service to function. API keys should be tightly scoped and regularly rotated.
- **Contractual Obligations:** Ensure that contracts with third-party vendors include strong security requirements, such as immediate notification of any security incident on their end that could impact your data or customers.

**Tags:** push notification, supply chain, third-party risk, customer communication, retail

## Sources
- [ASOS Customers Receive Bizarre “Hacked” Message Amid Suspected Snowflake Compromise](https://www.infosecurity-magazine.com/news/fbi-secret-service-fortibleed/) — Infosecurity Magazine (2026-10-06)

---
Source: https://cyber.netsecops.io/articles/asos-customers-receive-hacked-messages-after-communications-breach/
