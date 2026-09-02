# Akamai Report: Financial Sector Under Siege from AI-Powered Botnets and Escalating DDoS Attacks

**Severity:** informational | **Category:** Threat Intelligence,Cyberattack,Policy and Compliance | **Updated:** 2026-05-24 | **Reading time:** 5 min

According to a new 'State of the Internet' report from Akamai, the financial services sector is facing a growing threat from increasingly sophisticated cyberattacks. The report highlights the use of AI-empowered botnets that operate with greater speed and autonomy, launching what Akamai's Advisory CISO calls a 'sustained siege' rather than simple nuisance attacks. Digital transformation has expanded the attack surface, with API vulnerabilities being a key area of risk. The report, echoed by other industry leaders, concludes that financial institutions must adopt AI-driven defensive technologies to combat AI-weaponizing adversaries, particularly against threats like Authorized Push Payment (APP) fraud and advanced DDoS attacks.

## Executive Summary

The financial services industry has become a primary target for highly sophisticated and persistent cyberattacks, increasingly powered by **[Artificial Intelligence (AI)](https://en.wikipedia.org/wiki/Artificial_intelligence)**. A new "State of the Internet" report from **[Akamai](https://www.akamai.com/)** reveals that threat actors are moving beyond simple nuisance attacks to what is described as a "sustained siege" against financial institutions. Key findings highlight the rise of AI-empowered botnets capable of autonomous and rapid attacks, the exploitation of API visibility gaps created by digital transformation, and an overall escalation in the persistence of Distributed Denial-of-Service (DDoS) campaigns. The report serves as a stark warning that as the industry adopts new technologies, its attack surface is widening, and adversaries are leveraging AI to exploit these new weaknesses with unprecedented efficiency.

## Threat Overview

The report outlines a strategic shift in how cybercriminals are targeting the financial sector. The core threats identified are:

-   **AI-Empowered Botnets**: Traditional botnets required direct command-and-control. New AI-driven botnets can operate more autonomously, adapting their attack methods in real-time to bypass defenses. They can execute complex, multi-stage attacks at a scale and speed that is difficult for human-led security teams to counter.
-   **Escalating DDoS Attacks**: Attacks are no longer just about overwhelming a server with traffic. They are becoming more persistent and targeted, aiming to disrupt specific services, exploit application-layer vulnerabilities, and create smokescreens for other malicious activities like data theft or fraudulent transactions.
-   **API Vulnerabilities**: The rapid adoption of APIs for mobile banking, open banking, and internal services has created a new, often poorly monitored, attack surface. Attackers are actively targeting these APIs to bypass traditional security perimeters and access sensitive data or functionality directly.
-   **Authorized Push Payment (APP) Fraud**: This type of fraud, where a customer is tricked into sending money to an attacker-controlled account, is becoming more sophisticated through the use of AI for social engineering and credential harvesting.

## Technical Analysis

The trends identified in the report point to a new level of sophistication in attacks against the financial sector.

-   **AI in Attacks**: AI is being used to:
    -   **Optimize DDoS Traffic**: AI can analyze a target's defenses and dynamically change attack vectors (e.g., switching protocols, source IPs, traffic patterns) to maximize impact and evade mitigation.
    -   **Automate Vulnerability Discovery**: AI-powered tools can scan for and identify vulnerabilities in web applications and APIs much faster than manual methods.
    -   **Enhance Social Engineering**: AI can generate highly convincing phishing emails, text messages, and even deepfake voice calls to manipulate victims in APP fraud schemes.
-   **API Attack Vectors**: Common API attacks include Broken Object Level Authorization (BOLA), where an attacker manipulates an API call to access data they are not authorized for, and credential stuffing attacks against API authentication endpoints.

### MITRE ATT&CK Techniques
- [`T1498 - Network Denial of Service`](https://attack.mitre.org/techniques/T1498/): The core technique for DDoS attacks, now being enhanced with AI.
- [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/): Represents the targeting of vulnerable APIs.
- [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/): A key component of APP fraud, enhanced by AI-driven content generation.
- [`T1580 - Cloud Infrastructure Discovery`](https://attack.mitre.org/techniques/T1580/): Attackers use automated tools to discover and map an organization's cloud and API footprint.

## Impact Assessment

The escalation of these threats poses a systemic risk to the financial industry.

- **Financial Losses**: Successful attacks can lead to direct financial losses through fraud, theft, and the cost of remediation. The disruption caused by a sustained DDoS attack can also lead to significant revenue loss.
- **Regulatory Scrutiny**: Financial institutions are heavily regulated. A major incident can lead to severe fines, increased regulatory oversight, and legal action.
- **Loss of Customer Trust**: Trust is the cornerstone of the financial industry. A significant breach or service disruption can cause irreparable damage to a bank's reputation, leading to customer attrition.
- **Systemic Risk**: A successful, large-scale attack on a major financial institution or a critical financial market infrastructure could have cascading effects throughout the global economy.

## IOCs — Directly from Articles

As this is a trend report, no specific Indicators of Compromise were provided.

## Detection & Response

The report emphasizes that fighting AI-powered attacks requires AI-powered defenses.

- **Detection**: Financial institutions need to move beyond signature-based detection. This requires:
    -   **Behavioral Analysis**: Use UEBA and network traffic analysis to baseline normal activity and detect anomalies indicative of an AI-driven attack.
    -   **AI-Powered WAFs and API Security**: Deploy security tools that use machine learning to detect and block sophisticated attacks against web applications and APIs in real-time.
    -   **DDoS Mitigation**: Utilize cloud-based DDoS mitigation services that can absorb large-scale attacks and use AI to distinguish between human and bot traffic.
- **Response**: Develop automated response playbooks (SOAR) that can react to threats at machine speed, such as automatically blocking malicious IPs or isolating compromised systems.

## Mitigation

- **Adopt Defensive AI**: As stated by Martin Rehak, CEO of **[Resistant AI](https://resistant.ai/)**, using AI for fraud prevention and security is now "essential, not optional." This includes deploying AI-driven tools for transaction monitoring, identity verification, and threat detection.
- **Comprehensive API Security**: Implement a dedicated API security strategy that includes discovery (maintaining an inventory of all APIs), testing (regularly scanning for vulnerabilities), and runtime protection (using an API gateway or WAF).
- **Zero Trust Architecture**: Move towards a Zero Trust model where no user or service is trusted by default. This involves enforcing strict access controls, micro-segmentation, and continuous verification for all requests.
- **Threat Intelligence**: Proactively consume and integrate threat intelligence to stay ahead of evolving attacker TTPs, especially those involving AI.

**Tags:** Akamai, Threat Intelligence, AI, Botnet, DDoS, Financial Services, API Security

## Sources
- [This Week's Top Five Stories in Cyber](https://cybermagazine.com/articles/this-weeks-top-five-stories-in-cyber) — Cyber Magazine (2026-05-23)

---
Source: https://cyber.netsecops.io/articles/akamai-report-ai-powered-botnets-and-ddos-attacks-escalating-against-financial-sector/
