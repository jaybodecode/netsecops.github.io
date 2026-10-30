# Pwn2Own Berlin 2026 Concludes with $1.3M Awarded for 47 Zero-Days in Enterprise Software

**Severity:** informational | **Category:** Vulnerability,Security Operations | **Updated:** 2026-05-18 | **Reading time:** 4 min

The Pwn2Own Berlin 2026 ethical hacking competition has concluded, with researchers earning nearly $1.3 million for disclosing 47 unique zero-day vulnerabilities in a range of major enterprise software products. The Taiwanese team DEVCORE won the coveted 'Master of Pwn' title, demonstrating high-impact exploits against Microsoft Exchange and SharePoint. The event highlighted critical security weaknesses in widely used technologies, including virtualization platforms, browsers, and AI systems, reinforcing the value of coordinated vulnerability disclosure.

## Executive Summary
The Pwn2Own Berlin 2026 hacking competition, held from May 14-16, has concluded with a total of $1,298,250 awarded to security researchers for the successful demonstration of 47 unique zero-day vulnerabilities. The event focused on enterprise software, virtualization, and AI products, revealing significant flaws in widely deployed technologies. The Taiwanese research team **DEVCORE** was crowned the "Master of Pwn," earning $505,000 for their exploits. Their victories included a three-bug chain against **[Microsoft Exchange Server](https://www.microsoft.com/en-us/microsoft-365/exchange/)** for $200,000 and a two-bug chain against **Microsoft SharePoint** for $100,000. All discovered vulnerabilities have been responsibly disclosed to the affected vendors, who are now working on patches.

## Incident Timeline
The competition spanned three days, with numerous successful exploits demonstrated:
-   **Dates:** May 14 - May 16, 2026
-   **Total Payout:** $1,298,250
-   **Total Zero-Days:** 47

## Response Actions
The primary response action is from the vendors whose products were successfully exploited. Through Trend Micro's Zero Day Initiative (ZDI), which runs Pwn2Own, all 47 vulnerabilities were privately disclosed to the respective vendors. These vendors now have a standard 90-day deadline to develop and release security patches before ZDI publicly discloses limited details about the flaws. This process of coordinated vulnerability disclosure is central to the event's mission.

## Technical Findings
While specific technical details of the exploits remain private to give vendors time to patch, the competition revealed several high-impact attack chains:

-   **DEVCORE's Exchange RCE:** The highest-value exploit of the event was a three-bug chain demonstrated by **DEVCORE** that achieved remote code execution with `SYSTEM` privileges on a fully patched **Microsoft Exchange Server**. This is a critical finding, as Exchange remains a top target for nation-state and ransomware actors.

-   **STARLabs SG's ESXi Exploit:** The **STARLabs SG** team demonstrated a sophisticated exploit against **[VMware](https://www.vmware.com/)** ESXi, which included a cross-tenant code execution component, earning them $200,000. This type of vulnerability is extremely dangerous in multi-tenant cloud environments.

-   **Other Notable Targets:** Researchers also successfully demonstrated exploits against:
    -   Microsoft Windows 11
    -   Microsoft Edge
    -   **[Red Hat](https://www.redhat.com/en)** Enterprise Linux
    -   **OpenAI** Codex
    -   LiteLLM (AI Gateway)

The breadth of targets highlights that vulnerabilities exist across the entire technology stack, from operating systems and hypervisors to browsers and emerging AI platforms.

## Lessons Learned
1.  **Enterprise Software Remains Vulnerable:** Despite years of security investment, core enterprise products like Exchange, SharePoint, and ESXi continue to harbor critical, chainable vulnerabilities.
2.  **The Value of Offensive Security Research:** Events like Pwn2Own are crucial for proactively identifying and fixing flaws before they can be exploited by malicious actors. The high payouts incentivize top-tier talent to participate in responsible disclosure.
3.  **AI as a New Attack Surface:** The inclusion of AI platforms as targets signifies a new and complex frontier for security research. As AI becomes more integrated into business processes, securing these models and their infrastructure is paramount.

## Mitigation Recommendations
For end-users, the immediate mitigation is to prepare for a wave of critical patches from the affected vendors.

-   **Patch Management:** Organizations should monitor security advisories from **Microsoft**, **VMware**, **Red Hat**, and others over the next 90 days and be prepared to deploy the resulting patches on an expedited basis. This aligns with MITRE Mitigation **[M1051 - Update Software](https://attack.mitre.org/mitigations/M1051/)**.
-   **Defense-in-Depth:** The success of multi-bug chains underscores the need for a defense-in-depth strategy. Even if one security layer is bypassed, others like network segmentation ([`M1030`](https://attack.mitre.org/mitigations/M1030/)), strict access controls, and EDR solutions can prevent a full compromise.
-   **Assume Breach Mentality:** Given the continuous discovery of zero-days, organizations should operate under an 'assume breach' mentality, investing in robust detection and response capabilities to quickly identify and contain intrusions that leverage unknown vulnerabilities.

**Tags:** Pwn2Own, zero-day, vulnerability, hacking contest, DEVCORE, Microsoft Exchange

## Sources
- [Pwn2Own Berlin 2026, Day Three: DEVCORE Crowned Master of Pwn, $1.298 Million Total](https://securityaffairs.co/192250/hacking/pwn2own-berlin-2026-day-three-devcore-crowned-master-of-pwn-1-298-million-total.html) — Security Affairs (2026-05-17)
- [Hackers earn $1,298,250 for 47 zero-days at Pwn2Own Berlin 2026](https://www.bleepingcomputer.com/news/security/hackers-earn-1-298-250-for-47-zero-days-at-pwn2own-berlin-2026/) — BleepingComputer (2026-05-18)
- [At Pwn2Own Berlin 2026, hackers push enterprises to the limit and earn $1.3 million](https://cybernews.com/news/pwn2own-berlin-2026-hackers-earn-1-3-million/) — Cybernews (2026-05-18)

---
Source: https://cyber.netsecops.io/articles/pwn2own-berlin-2026-awards-1-3m-for-47-zero-days-in-enterprise-software/
