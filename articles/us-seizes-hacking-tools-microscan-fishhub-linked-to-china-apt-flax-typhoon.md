# US Seizes Hacking Tools Used by China-Linked Group Flax Typhoon

**Severity:** high | **Category:** Threat Actor,Cyberattack,Industrial Control Systems | **Updated:** 2026-10-13 | **Reading time:** 5 min

The U.S. Department of Justice and FBI have seized two hacking tools, 'Microscan' and 'FishHub,' and their controlling domains, linked to the Chinese state-sponsored group Flax Typhoon. The tools, created by the sanctioned firm Integrity Technology Group, were used in global campaigns targeting critical infrastructure, government, and educational institutions, particularly in the U.S. and Taiwan. CISA also added five related CVEs to its KEV catalog.

## Executive Summary
On October 8, 2026, the U.S. **[Department of Justice (DOJ)](https://www.justice.gov/)** and the **[FBI](https://www.fbi.gov/)** announced a court-authorized operation to seize and disrupt hacking infrastructure used by the Chinese state-sponsored threat actor **[Flax Typhoon](https://attack.mitre.org/groups/G1017/)** (also known as Ethereal Panda). The operation dismantled two custom hacking tools, `Microscan` and `FishHub`, by seizing seven domains used for their command and control. These tools were developed by Integrity Technology Group, a Chinese company previously sanctioned by the U.S. for supporting state-sponsored hacking operations. The campaign targeted a wide array of victims globally, including critical infrastructure in the U.S., airports in Japan and Poland, and numerous government and university targets in Taiwan. The disruption was accompanied by a joint advisory and the addition of five CVEs exploited by the group to CISA's KEV catalog.

---

## Threat Overview
**Flax Typhoon** is a sophisticated threat actor linked to the People's Republic of China, focusing on intelligence gathering and initial access operations. This campaign demonstrates their use of a multi-stage attack methodology, leveraging custom-built tools for reconnaissance and initial compromise.

*   **`Microscan`**: This tool was used for large-scale vulnerability scanning to identify potential targets. It was operated via a botnet of **[Mirai](https://attack.mitre.org/software/S0268/)**-infected IoT devices, allowing the actor to obfuscate the origin of their scanning activity. Targets included a power company in South Carolina and critical infrastructure operators in allied nations.
*   **`FishHub`**: This was a dedicated spearphishing platform used to deliver malicious payloads and gain initial access to targeted networks. It was successfully used against at least 20 universities in Taiwan.

Once initial access was gained, the threat actor was observed deploying **SoftEther VPN** software to establish persistent remote access, enabling long-term espionage and data theft.

## Technical Analysis
The operation showcases a clear and structured attack chain employed by a nation-state actor.

### Tactics, Techniques, and Procedures (TTPs)
*   **Reconnaissance**: Flax Typhoon used the `Microscan` tool, powered by a Mirai botnet, to conduct widespread vulnerability scanning against critical sectors. [`T1595.002 - Vulnerability Scanning`](https://attack.mitre.org/techniques/T1595/002/).
*   **Resource Development**: The group developed and operated custom tools (`Microscan`, `FishHub`) and acquired infrastructure (domains, botnet) to support their campaigns. [`T1587 - Develop Capabilities`](https://attack.mitre.org/techniques/T1587/) and [`T1583 - Acquire Infrastructure`](https://attack.mitre.org/techniques/T1583/).
*   **Initial Access**: The `FishHub` platform was used to conduct targeted spearphishing campaigns. [`T1566.001 - Spearphishing Attachment`](https://attack.mitre.org/techniques/T1566/001/). The group also exploited at least five known vulnerabilities, now added to the CISA KEV catalog.
*   **Persistence**: The actor deployed `SoftEther VPN` on compromised systems to maintain long-term, encrypted access to victim networks. [`T1133 - External Remote Services`](https://attack.mitre.org/techniques/T1133/).

## Impact Assessment
The primary impact of Flax Typhoon's activity is espionage and intelligence gathering against strategic targets in the U.S. and its allies, particularly Taiwan. By compromising critical infrastructure, government agencies, and universities, the actor gains access to sensitive political, economic, and military information. While this campaign did not appear to involve disruptive or destructive payloads, the persistent access it established creates the potential for future disruptive attacks during a time of crisis. The seizure operation by the DOJ and FBI serves to degrade the actor's capabilities and publicly attribute the activity, raising the cost of their operations.

## IOCs — Directly from Articles
While the articles mention the seizure of seven domains, the specific domain names were not listed.

## Cyber Observables — Hunting Hints
Security teams can hunt for signs of Flax Typhoon activity using the following observables:
| Type | Value | Description |
|---|---|---|
| `process_name` | `softether_vpn.exe` | The presence of SoftEther VPN client or server processes on systems where it is not approved software. |
| `network_traffic_pattern` | Inbound traffic from known Mirai-infected IoT device IP ranges. | Potential scanning activity from the `Microscan` botnet. |
| `file_name` | `Microscan.exe`, `FishHub.exe` | The names of the custom tools, if they are written to disk. |
| `log_source` | VPN Logs | Look for unauthorized or unexpected `SoftEther VPN` connections, especially those originating from endpoints and connecting to external IPs. |

## Detection & Response
*   **Threat Intelligence Integration**: Ingest the CVEs and any available IOCs from the CISA advisory into your vulnerability management and security monitoring tools. Prioritize patching the five KEV CVEs.
*   **Network Monitoring**: Monitor for traffic associated with `SoftEther VPN` or other unauthorized remote access tools. **[D3FEND Outbound Traffic Filtering](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)** can block connections to known malicious domains.
*   **Email Security**: Enhance email security gateways to detect and block spearphishing attempts. Analyze emails for lures related to topics of interest to the targeted institutions.

## Mitigation
*   **Patch Management**: Immediately patch the five vulnerabilities exploited by Flax Typhoon that were added to the CISA KEV catalog. This is the most effective way to prevent initial access via this vector. This aligns with **[D3FEND Software Update](https://d3fend.mitre.org/technique/d3f:SoftwareUpdate)**.
*   **Application Control**: Use application control solutions to prevent the execution of unauthorized software, such as `SoftEther VPN`. This is an implementation of **[D3FEND Executable Allowlisting](https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting)**.
*   **Reduce Attack Surface**: Disable or restrict access to services and ports that are not essential for business operations to limit the effectiveness of the `Microscan` vulnerability scanner.

**Tags:** Flax Typhoon, APT, China, DOJ, FBI, Cyber Espionage, Mirai, SoftEther VPN

## Sources
- [DOJ, FBI seize hacking tools used by Chinese state-linked group to target critical infrastructure](https://cyberscoop.com/doj-fbi-seize-flax-typhoon-hacking-tools-microscan-fishhub/) — CyberScoop (2026-10-10)
- [Justice Department and FBI Seize Vulnerability Scanning and Spear Phishing Tools Operated by People’s Republic of China-Affiliated Hacking Group](https://www.justice.gov/opa/pr/justice-department-and-fbi-seize-vulnerability-scanning-and-spear-phishing-tools-operated) — Department of Justice
- [FBI seizes domains controlling Chinese hacking tools Microscan and FishHub](https://www.helpnetsecurity.com/2026/10/09/fbi-flax-typhoon-microscan-fishhub-domains/) — Help Net Security
- [US Disrupts Chinese State-Sponsored Hacking Tools](https://www.securityweek.com/us-disrupts-chinese-state-sponsored-hacking-tools/) — SecurityWeek

---
Source: https://cyber.netsecops.io/articles/us-seizes-hacking-tools-microscan-fishhub-linked-to-china-apt-flax-typhoon/
