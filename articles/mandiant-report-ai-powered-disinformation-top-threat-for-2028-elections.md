# AI-Powered Disinformation is Top Threat to 2028 Elections, Mandiant Warns

**Severity:** informational | **Category:** Threat Intelligence,Policy and Compliance,Other | **Updated:** 2026-07-01 | **Reading time:** 5 min

A new report from Mandiant (part of Google Cloud) identifies AI-powered disinformation and influence operations as the most significant cyber threat to the 2028 U.S. election cycle. The report warns of a future filled with hyper-realistic deepfakes and AI-driven social media manipulation designed to sow discord and influence voters. Researchers highlight the democratization of these tools, with 'Disinformation-as-a-Service' (DaaS) platforms emerging on the dark web. Mandiant urges a collaborative effort between tech platforms, government, and the public to develop new countermeasures.

## Executive Summary

A new threat horizon report from **[Mandiant](https://www.mandiant.com)** (part of **Google** Cloud) has issued a stark warning: AI-powered disinformation campaigns have surpassed traditional hacking as the number one cyber threat to the integrity of the 2028 U.S. elections. The report, "Democracy Under Digital Siege," predicts a massive increase in the scale and sophistication of influence operations. These campaigns will leverage hyper-realistic, **[AI](https://en.wikipedia.org/wiki/Artificial_intelligence)**-generated content (**[deepfakes](https://en.wikipedia.org/wiki/Deepfake)**) to manipulate public opinion, suppress voter turnout, and erode trust in the democratic process. The report highlights the alarming democratization of these capabilities, with 'Disinformation-as-a-Service' (DaaS) platforms making it easy for a wide range of actors to launch sophisticated campaigns.

---

## Threat Overview

Mandiant's report shifts the focus from the security of voting machines to the security of the information ecosystem itself. The core threat is the ability of malicious actors to manipulate reality at scale.

*   **Threat Actors:** The threat is no longer limited to a few powerful nation-states. The report notes that the availability of open-source AI models and DaaS platforms allows smaller state actors, domestic extremist groups, and even well-funded individuals to conduct influence operations that were previously impossible.
*   **New TTPs:** The report details several new and evolving tactics:
    *   **Hyper-Realistic Content:** AI will be used to generate convincing fake videos, audio clips, and text of political candidates, officials, and news events.
    *   **Disinformation-as-a-Service (DaaS):** Emerging dark web platforms allow malicious actors to simply define a target demographic and a narrative, and the service automates the creation and distribution of synthetic content across multiple social media platforms.
    *   **'AI-ad-libbing':** This refers to AI-powered bots or agents that can engage in real-time, context-aware conversations on social media to push a narrative, making them far more believable and harder to detect than traditional bots.

## Technical Analysis

The technological shift is driven by the rapid advancement and accessibility of large language models (LLMs) and diffusion models (for image/video generation). What required a Hollywood-level budget and expertise a few years ago can now be done with a powerful GPU and open-source software. The DaaS platforms are a logical, albeit dangerous, evolution of the cybercrime economy, applying the 'as-a-service' model to influence operations.

### MITRE ATT&CK TTPs (Adapted for Influence Operations)

*   **Reconnaissance:** [`T1593 - Search Open Websites/Domains`](https://attack.mitre.org/techniques/T1593/) - Scraping social media and public records to build profiles of target demographics.
*   **Resource Development:** [`T1585 - Establish Accounts`](https://attack.mitre.org/techniques/T1585/) - Creating thousands of fake social media accounts for the AI agents.
*   **Execution:** [`T1129 - Shared Modules`](https://attack.mitre.org/techniques/T1129/) - Using open-source AI models to generate content.
*   **Impact:** The goal is not technical impact like data encryption, but cognitive impact: to sow discord, change opinions, and undermine trust in institutions. This is a form of [`T1491 - Defacement`](https://attack.mitre.org/techniques/T1491/), but of public discourse rather than a website.

## Impact Assessment

The potential impact of these AI-driven campaigns on the 2028 election is profound:

*   **Erosion of Trust:** A flood of high-quality fake content can lead to a situation where citizens don't know what to believe, eroding trust in media, government, and the election process itself.
*   **Voter Manipulation:** Highly targeted and personalized disinformation can effectively manipulate public opinion and voting behavior.
*   **Voter Suppression:** False information about when, where, and how to vote can be used to suppress turnout in specific demographics.
*   **Political Instability:** The increased polarization and discord can lead to civil unrest and political instability.

## Detection & Response

Detecting and responding to this threat is a complex challenge that goes beyond traditional cybersecurity.

*   **Detection:**
    *   **Content Provenance:** Developing and adopting standards for digital content provenance (e.g., C2PA) that can certify the origin and history of a piece of media.
    *   **AI-based Detection:** Using AI to detect AI-generated content, looking for subtle artifacts and statistical giveaways.
    *   **Behavioral Analysis:** Social media platforms analyzing account behavior to identify inauthentic, coordinated activity, such as the 'AI-ad-libbing' described in the report.
*   **Response:**
    *   **Rapid Fact-Checking:** A coordinated effort between government, media, and civil society to rapidly identify and debunk false narratives before they go viral.
    *   **Platform Action:** Social media platforms must be able to quickly label, down-rank, or remove verifiably false and harmful synthetic media.

## Mitigation Recommendations

Mandiant's report calls for a whole-of-society approach:

*   **For Government:** Invest in research for AI detection and content provenance. Work with allies to establish international norms against the malicious use of AI in elections.
*   **For Tech Platforms:** Continue to invest in and improve detection capabilities. Adopt and promote content provenance standards. Be transparent about influence operations discovered on their platforms.
*   **For Media:** Educate journalists on how to spot synthetic media. Be cautious in reporting and avoid amplifying disinformation.
*   **For the Public:** Increase public awareness and media literacy education to help citizens critically evaluate the information they encounter online.

**Tags:** ai, disinformation, influence operations, election security, deepfake, mandiant, threat intelligence

## Sources
- [Mandiant Threat Horizon Report: AI-Powered Disinformation and the 2028 Elections](https://www.mandiant.com/resources/reports/threat-horizon-2028-elections) — Mandiant (2026-07-01)
- [Mandiant Warns AI Disinformation is Top Threat to 2028 Election](https://www.wired.com/story/mandiant-report-ai-disinformation-2028-election-threat/) — Wired (2026-07-01)

---
Source: https://cyber.netsecops.io/articles/mandiant-report-ai-powered-disinformation-top-threat-for-2028-elections/
