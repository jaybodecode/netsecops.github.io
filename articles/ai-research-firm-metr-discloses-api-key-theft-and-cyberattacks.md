# AI Research Firm METR Discloses $600k API Key Theft

**Severity:** high | **Category:** Cyberattack,Cloud Security,Data Breach | **Updated:** 2026-09-02 | **Reading time:** 4 min

AI safety non-profit METR disclosed two security incidents. In March 2026, a stolen API key was used to fraudulently consume approximately $600,000 in AI credits. In May, a separate, sustained campaign involved automated probing of its public infrastructure, credential stuffing, and phishing.

## Executive Summary

**[METR (Model Evaluation and Threat Research)](https://metr.org/)**, a non-profit focused on AI safety, has disclosed two significant security incidents that occurred earlier this year. The first, in March 2026, involved the theft of an API key that was subsequently used by a financially motivated actor to rack up approximately $600,000 in fraudulent charges for AI model inference. The second incident, in May 2026, was a sustained, automated attack campaign targeting **[METR](https://metr.org/)'s** public infrastructure. While **[METR](https://metr.org/)** states no sensitive information was accessed, these events underscore the high value of AI resources and the increasing targeting of AI research organizations by threat actors.

---

## Threat Overview

**[METR](https://metr.org/)** detailed two distinct attacks that highlight different threat vectors against AI organizations:

**Incident 1 (March 2026): API Key Theft**
An attacker gained access to an API key used for inference on public AI models. This key was then abused to consume a massive amount of cloud computing resources, resulting in a financial loss of about $600,000. This type of attack, known as cryptojacking or resource hijacking, is purely financially motivated and exploits the high cost of AI computation.

**Incident 2 (May 2026): Sustained Probing Campaign**
This was a more sophisticated, multi-faceted attack involving automated agents. The campaign included:
-   Systematic scanning of **[METR](https://metr.org/)'s** public infrastructure for vulnerabilities.
-   Credential stuffing attacks against authentication providers.
-   Attempts to abuse OAuth token grant mechanisms.
-   Phishing campaigns targeting **[METR](https://metr.org/)** staff.

During this period, **[METR](https://metr.org/)** also discovered an unrelated, inadvertent exposure of a read-only SQL query mechanism that could have potentially leaked unpublished evaluation data.

## Technical Analysis

The incidents demonstrate a range of TTPs targeting AI infrastructure:
-   **API Key Theft**: The March incident centered on [`T1528 - Steal Application Access Token`](https://attack.mitre.org/techniques/T1528/). The key was likely exfiltrated from a misconfigured server, public code repository, or a compromised developer machine.
-   **Automated Reconnaissance**: The May attack heavily utilized techniques like [`T1595 - Active Scanning`](https://attack.mitre.org/techniques/T1595/) to probe for weaknesses in real-time.
-   **Credential Attacks**: The attackers employed [`T1110.003 - Password Spraying`](https://attack.mitre.org/techniques/T1110/003/) or credential stuffing against login portals.
-   **Social Engineering**: The use of phishing against staff ([`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/)) shows a blended approach, combining technical and human-targeted attacks.

## Impact Assessment

-   **Financial Impact**: The most direct impact was the $600,000 financial loss from the fraudulent API usage. This highlights the significant monetary risk associated with unsecured AI/ML cloud resources.
-   **Operational Disruption**: Responding to these incidents required significant time and resources from **[METR](https://metr.org/)'s** security and engineering teams, diverting them from their primary mission.
-   **Reputational Risk**: Although **[METR](https://metr.org/)** reported that no sensitive data was lost, the incidents can damage the reputation of an organization focused on security and safety.
-   **Potential Data Exposure**: The accidentally exposed SQL API, while not exploited by the attackers, represented a significant risk of leaking sensitive research data and model information.

## Detection & Response

-   **Cloud Cost Monitoring**: Implement billing alerts and cost anomaly detection in cloud environments. A sudden, massive spike in spending is a primary indicator of resource hijacking. This relates to D3FEND's **[Resource Access Pattern Analysis (D3-RAPA)](https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis)**.
-   **API Key Monitoring**: Use tools to scan code repositories and public assets for exposed credentials. Monitor API usage logs for anomalous activity, such as calls from unusual IP addresses or a sudden increase in request volume.
-   **Authentication Log Analysis**: Monitor authentication logs for high rates of failed logins, which can indicate password spraying or credential stuffing attacks. This is a form of D3FEND's **[Authentication Event Thresholding (D3-ANET)](https://d3fend.mitre.org/technique/d3f:AuthenticationEventThresholding)**.

## Mitigation

-   **Credential Management**: Store all API keys, tokens, and secrets in a secure vault (e.g., HashiCorp Vault, AWS Secrets Manager). Never hardcode credentials in source code or configuration files.
-   **Least Privilege for API Keys**: Create API keys with the minimum required permissions. Use short-lived tokens whenever possible and restrict key usage to specific IP address ranges.
-   **Multi-Factor Authentication (MFA)**: Enforce MFA on all user accounts, especially for developers and administrators, to protect against credential stuffing.
-   **Security Awareness Training**: Train employees to recognize and report phishing attempts, a key component of MITRE mitigation [`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/).

**Tags:** METR, AI Security, API Security, Cloud Security, Cyberattack

## Sources
- [Attackers Steal METR API Key and Consume AI Credits Worth About $600,000](https://thehackernews.com/2026/09/attackers-steal-metr-api-key-and.html) — The Hacker News (2026-09-01)

---
Source: https://cyber.netsecops.io/articles/ai-research-firm-metr-discloses-api-key-theft-and-cyberattacks/
