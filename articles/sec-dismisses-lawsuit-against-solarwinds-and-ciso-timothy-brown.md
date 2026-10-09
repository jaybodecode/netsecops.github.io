# SEC Abandons Landmark Lawsuit Against SolarWinds and its CISO

**Severity:** informational | **Category:** Policy and Compliance,Regulatory,Cyberattack | **Updated:** 2025-11-21 | **Reading time:** 5 min

In a surprising move, the U.S. Securities and Exchange Commission (SEC) has voluntarily dismissed its civil enforcement action against SolarWinds and its CISO, Timothy G. Brown. The lawsuit, filed in October 2023, had accused the company and Brown of misleading investors about their cybersecurity posture before the 2020 SUNBURST supply chain attack. The dismissal is seen as a major victory for the cybersecurity community, which had feared the case would set a dangerous precedent for holding security executives personally liable for breaches and create a chilling effect on transparency.

## Executive Summary

The U.S. **[Securities and Exchange Commission (SEC)](https://www.sec.gov)** has voluntarily dismissed its landmark lawsuit against **[SolarWinds Corp.](https://www.solarwinds.com/)** and its Chief Information Security Officer (CISO), Timothy G. Brown. The case, which alleged fraud and internal control failures related to the 2020 **[SUNBURST](https://attack.mitre.org/software/S0559/)** cyberespionage campaign, was withdrawn on November 20, 2025. The SEC's lawsuit had been a source of major concern across the cybersecurity industry, with many professionals fearing it would establish personal liability for CISOs following major cyberattacks and discourage open communication about security weaknesses. The dismissal, which follows a July 2024 court ruling that threw out a significant portion of the charges, has been hailed as a "welcome vindication" by SolarWinds and a relief to security leaders nationwide.

---

## Regulatory Details

The lawsuit, filed in October 2023, was a pivotal moment in cybersecurity regulation. The **SEC** accused **SolarWinds** and CISO Timothy G. Brown of violating antifraud provisions of federal securities laws. The core allegations were:
1.  **Misleading Disclosures:** The SEC claimed that SolarWinds' public statements and SEC filings from 2018 to 2020 overstated the company's cybersecurity practices and understated known risks, creating a false sense of security for investors.
2.  **Internal Control Failures:** The complaint alleged that the company failed to maintain adequate internal accounting controls, which the SEC argued was linked to its cybersecurity posture.
3.  **Personal Liability:** In a highly controversial move, the SEC charged Brown personally, alleging he was aware of the security shortcomings and was therefore complicit in the misleading statements.

The case was built around the premise that cybersecurity failures constitute a direct risk to investors that must be accurately and transparently disclosed. The SUNBURST incident, attributed to the Russian state-sponsored actor **[APT29](https://attack.mitre.org/groups/G0016/)**, involved injecting malicious code into SolarWinds' Orion Platform, which was then distributed to thousands of customers, including U.S. federal agencies.

The dismissal was filed as a joint motion to dismiss the action "with prejudice," meaning the SEC cannot refile the same claim in the future. The agency cited its "discretion" in the filing, without providing a detailed explanation for its reversal.

---

## Affected Organizations

The primary entities involved were **SolarWinds Corp.** and its CISO, **Timothy G. Brown**. However, the implications of the case extended to the entire community of publicly traded companies and their cybersecurity leadership. CISOs and their legal counsel across all industries were watching the case closely, as a ruling against SolarWinds and Brown could have fundamentally altered the landscape of executive liability and corporate risk management. The dismissal directly benefits Brown, who avoids a potentially career-ending legal battle, and SolarWinds, which can now move past the legal overhang from the SUNBURST attack.

---

## Impact Assessment

The SEC's decision to drop the case carries significant implications for the cybersecurity industry and corporate governance:

- **Reduced 'Chilling Effect':** The primary concern was that the lawsuit would discourage CISOs and their teams from documenting and communicating security issues internally for fear that such communications could be used against them in future litigation. The dismissal alleviates this pressure, potentially fostering more open internal dialogue about risk.
- **Clarification on CISO Liability:** While the case is dismissed, it has already heightened the focus on the role of the CISO and their responsibility in public disclosures. Boards and executives are now more aware of the need to accurately represent their security posture. The dismissal prevents the establishment of a legal precedent for personal liability in this specific context, but the SEC may pursue similar actions in other cases.
- **Vindication for SolarWinds:** For SolarWinds, the dismissal is a major public relations and legal victory. It supports the company's long-held position that it and its security team acted in good faith with the information they had at the time. This was bolstered by a July 2024 court ruling that dismissed parts of the SEC's case as relying on "impermissible hindsight."
- **Future SEC Strategy:** The SEC stated the dismissal does not reflect its position on other cases, indicating it may still pursue enforcement actions related to cybersecurity disclosures. However, this high-profile withdrawal suggests the agency may recalibrate its approach, perhaps focusing on more clear-cut cases of intentional fraud rather than alleged negligence.

---

## Compliance Guidance

Despite the dismissal, the SEC's focus on cybersecurity is not diminishing. The case served as a powerful warning to all public companies. Organizations should continue to strengthen their governance and disclosure practices:

1.  **Accurate Public Disclosures:** Ensure that all public statements, including SEC filings and marketing materials, accurately reflect the company's cybersecurity posture. Avoid generic or overly optimistic language. Statements should be reviewed by both legal and technical experts.
2.  **Board-Level Oversight:** The board of directors must be actively engaged in overseeing cybersecurity risk. This includes regular briefings from the CISO and a clear understanding of the company's risk appetite and security investments.
3.  **Document Diligence:** Maintain thorough records of security assessments, risk acceptance decisions, and remediation efforts. This documentation demonstrates due diligence and provides a defensible record of the company's security program.
4.  **Empower the CISO:** The CISO must have a direct line of communication to executive leadership and the board. They must be empowered to report on risks without fear of retribution. The role should be clearly defined with respect to its influence on public disclosures.
5.  **Incident Response Planning:** Have a well-documented and practiced incident response plan that includes clear protocols for determining the materiality of an incident and making timely disclosures as required by SEC rules.

---

## Mitigation

While this is a legal and policy issue, the underlying event was a technical failure. Mitigations against future SUNBURST-style attacks remain critical:

- **Software Supply Chain Security:** Implement rigorous security checks for all software development and build processes. This includes code signing, dependency scanning, and ensuring the integrity of the build environment. This maps to MITRE Mitigation [`M1045 - Code Signing`](https://attack.mitre.org/mitigations/M1045/).
- **Network Segmentation:** Use [`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/) to limit the blast radius of a compromise. Critical systems, like build environments, should be isolated from the general corporate network.
- **Comprehensive Auditing:** Implement [`M1047 - Audit`](https://attack.mitre.org/mitigations/M1047/) to log and monitor all activity on critical systems, enabling faster detection of anomalous behavior.
- **User Account Management:** Enforce the principle of least privilege and use [`M1026 - Privileged Account Management`](https://attack.mitre.org/mitigations/M1026/) to control access to sensitive systems and data.

**Tags:** SEC, CISO Liability, Legal, SolarWinds, SUNBURST, APT29, Cybersecurity Law

## Sources
- [SEC Dismisses Civil Enforcement Action Against SolarWinds and Chief Information Security Officer](https://www.sec.gov/litigation/litreleases/2025/lr26423.htm) — U.S. Securities and Exchange Commission (2025-11-20)
- [SEC voluntarily dismisses SolarWinds lawsuit](https://therecord.media/sec-voluntarily-dismisses-solarwinds-lawsuit) — The Record (2025-11-21)
- [SEC bails on SolarWinds lawsuit](https://www.theregister.com/2025/11/20/sec_solarwinds_lawsuit_dropped/) — The Register (2025-11-20)
- [SEC Drops SolarWinds Case After Years of High-Stakes Cybersecurity Scrutiny](https://thehackernews.com/2025/11/sec-drops-solarwinds-case-after-years.html) — The Hacker News (2025-11-21)

---
Source: https://cyber.netsecops.io/articles/sec-dismisses-lawsuit-against-solarwinds-and-ciso-timothy-brown/
