# NetRise Launches 'Provenance' to Uncover Contributor Risk in Software Supply Chains

**Severity:** informational | **Category:** Supply Chain Attack,Security Operations,Threat Intelligence | **Updated:** 2026-03-26 | **Reading time:** 4 min

Software supply chain security firm NetRise has launched 'Provenance,' a new product announced at RSA Conference 2026 designed to identify risks associated with the individual contributors and organizations behind open-source components. Moving beyond traditional SBOMs and vulnerability scanning, Provenance provides intelligence on the people and entities writing the code that enterprises rely on. The tool helps organizations identify potentially malicious contributors, understand their 'blast radius' across the software ecosystem, and enforce policies based on contributor risk, such as geographic location, to meet compliance obligations like OFAC.

## Executive Summary
On March 25, 2026, at the RSA Conference, software supply chain security company **[NetRise](https://www.netrise.io/)** launched a new product called **NetRise Provenance**. This solution provides a new layer of security intelligence by focusing on the human element of the open-source ecosystem. Instead of just analyzing code for vulnerabilities, Provenance identifies and assesses the risk associated with the individual developers and organizations that contribute to open-source projects. This allows customers to gain visibility into who is writing the code embedded in their software and connected devices, helping to defend against malicious contributor attacks and enforce governance policies based on contributor attribution and geography.

---

## Product Overview
NetRise Provenance is designed to address a critical gap in **[software supply chain security](https://en.wikipedia.org/wiki/Software_supply_chain)**. While Software Bills of Materials (SBOMs) list the components in a piece of software, they don't provide context about the people who created those components. Provenance aims to fill this gap.

**Key Capabilities:**
*   **Contributor Attribution:** The platform maps open-source components back to the real individuals and organizations that contributed to them. This creates a human-centric view of the supply chain.
*   **Risk Assessment:** It analyzes various signals to assess the risk associated with a contributor or project, such as project health, contributor history, and geographic footprint.
*   **Blast Radius Analysis:** If a contributor is identified as malicious or high-risk, Provenance can map their contributions across the entire open-source dependency graph, showing an organization every place that contributor's code exists within their software portfolio.
*   **Policy Enforcement:** The tool includes a policy engine that allows developers and security teams to set rules based on contributor risk. For example, a policy could automatically fail a software build if it includes a dependency from a contributor based in a sanctioned country, helping to meet regulatory requirements like OFAC (Office of Foreign Assets Control) obligations.

Provenance is available through the main NetRise Platform and can be integrated into the development lifecycle via API, a command-line interface (CLI), or a GitHub action.

---

## Market Problem and Solution
The launch of Provenance is a direct response to the growing threat of malicious actors infiltrating trusted open-source projects. High-profile incidents have shown that attackers can gain trust as maintainers or contributors over time, only to later introduce malicious code that gets distributed to thousands of downstream users. Examples include the `xz-utils` backdoor and other similar attacks.

Traditional security tools like Static Application Security Testing (SAST) and Software Composition Analysis (SCA) are designed to find known vulnerabilities in code, but they are often blind to a trusted contributor intentionally inserting a subtle, malicious backdoor. 

Provenance tackles this by shifting the focus from the *what* (the code) to the *who* (the contributor). By providing visibility into the people behind the code, it allows organizations to make proactive trust and risk management decisions. According to Thomas Pace, CEO of NetRise, this replaces guesswork with a clear view of the human element inside the software supply chain.

---

## Use Cases
*   **For Software Buyers:** An organization procuring new software or a connected device can use Provenance to vet the supply chain of the product, understanding the geographic and organizational origins of its open-source components before deployment.
*   **For Software Developers:** Development teams can integrate Provenance into their CI/CD pipeline to automatically check new dependencies against their organization's risk policies, preventing high-risk code from being introduced in the first place.
*   **For Incident Responders:** When a malicious contributor is discovered, security teams can use Provenance to instantly determine their organization's exposure and identify all affected assets.
*   **For Compliance Teams:** The tool helps automate the enforcement of policies related to geography and sanctions, reducing manual effort and compliance risk.

This approach represents a maturation of supply chain security, moving beyond vulnerability management to encompass trust, reputation, and geopolitical risk. It aligns with the principles of [`M1056 - Pre-compromise`](https://attack.mitre.org/mitigations/M1056/) by providing intelligence to make better procurement and development decisions before a compromise can occur.

**Tags:** supply chain security, open source, SBOM, DevSecOps, RSAC, contributor risk

## Sources
- [NetRise Provenance launched to expose open source contributor risk, map impact across software supply chains](https://industrialcyber.co/vendor-news/netrise-provenance-launched-to-expose-open-source-contributor-risk-map-impact-across-software-supply-chains/) — Industrial Cyber (2026-03-25)
- [Launch of NetRise Provenance Reveals Who and What Are Behind Open Source, And How Risk Propagates Through the Supply Chain](https://www.prnewswire.com/news-releases/launch-of-netrise-provenance-reveals-who-and-what-are-behind-open-source-and-how-risk-propagates-through-the-supply-chain-302100898.html) — PR Newswire (2026-03-25)
- [NetRise launches Provenance to trace open source risk](https://www.ecommercenews.com.au/story/netrise-launches-provenance-to-trace-open-source-risk) — eCommerce News Australia (2026-03-26)

---
Source: https://cyber.netsecops.io/articles/netrise-launches-provenance-to-vet-open-source-contributor-risk/
