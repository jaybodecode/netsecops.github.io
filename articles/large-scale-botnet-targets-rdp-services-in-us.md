# Massive Botnet of 100k+ IPs Targets U.S. RDP Services

**Severity:** high | **Category:** Cyberattack,Threat Intelligence | **Updated:** 2025-10-14 | **Reading time:** 5 min

Security researchers at GreyNoise have identified a massive, coordinated botnet campaign targeting Remote Desktop Protocol (RDP) services across the United States. The operation, which began on October 8, 2025, involves over 100,000 unique IP addresses from more than 100 countries. The botnet is using enumeration and timing attacks against RD Web Access and RDP web clients to identify valid user credentials. The widespread and centrally controlled nature of the campaign poses a significant threat to any organization exposing RDP to the internet, as a successful compromise can quickly lead to ransomware deployment or data theft.

## Executive Summary
Security firm **[GreyNoise](https://www.greynoise.io/)** has observed a large-scale and coordinated attack campaign targeting **[Remote Desktop Protocol (RDP)](https://en.wikipedia.org/wiki/Remote_Desktop_Protocol)** services in the United States. Since October 8, 2025, a botnet comprising over 100,000 unique IP addresses spanning more than 100 countries has been actively scanning and attacking RDP endpoints. The attackers are not using simple brute-force methods but are employing more nuanced timing and enumeration attacks against RD Web Access and RDP web clients to discover valid usernames. The high level of coordination suggests a centrally controlled botnet. This activity represents a significant and active threat, as exposed and vulnerable RDP is a primary initial access vector for a wide range of threat actors, including ransomware groups.

---

## Threat Overview
The campaign is characterized by a massive volume of traffic targeting TCP port 3389 (RDP) and associated web access ports (typically 443). The attackers' goal is to identify valid credentials without triggering standard brute-force detection mechanisms. The primary techniques observed are:

-   **RD Web Access Timing Attacks**: By measuring the server's response time to login attempts, attackers can sometimes distinguish between attempts with a valid username and those with an invalid one. This allows them to enumerate users without generating failed login events.
-   **RDP Web Client Login Enumeration**: Similar to timing attacks, attackers abuse features in RDP web clients that may respond differently to valid versus invalid usernames, allowing for credential enumeration.

GreyNoise assesses with high confidence that this is a coordinated botnet due to the simultaneous start of the activity from thousands of IPs and the similarity in their TCP fingerprints. The global distribution of the botnet nodes makes simple IP-based blocking challenging.

---

## Technical Analysis
The botnet's activity falls under several MITRE ATT&CK techniques:

-   **Initial Access**: The ultimate goal is to gain initial access via [`T1021.001 - Remote Desktop Protocol`](https://attack.mitre.org/techniques/T1021/001/).
-   **Credential Access**: The methods used are forms of password guessing and brute force, specifically [`T1110.001 - Password Guessing`](https://attack.mitre.org/techniques/T1110/001/) and [`T1110.003 - Password Spraying`](https://attack.mitre.org/techniques/T1110/003/). The enumeration techniques are a precursor to this step.
-   **Reconnaissance**: The initial scanning activity is a form of [`T1595.002 - Vulnerability Scanning`](https://attack.mitre.org/techniques/T1595/002/), where the 'vulnerability' is an exposed RDP service.

> The use of enumeration and timing attacks is a step up from simple brute-forcing. It allows attackers to be stealthier and more efficient, building a list of valid usernames before attempting to guess passwords.

---

## Impact Assessment
Exposed RDP is one of the most common and dangerous security misconfigurations. A successful compromise of an RDP account can lead to severe consequences:
-   **Ransomware Deployment**: Threat actors frequently use RDP access to manually deploy ransomware across a network.
-   **Data Theft**: Attackers can exfiltrate sensitive data from compromised systems and networks.
-   **Persistent Access**: An RDP foothold can be sold on dark web markets or used to install other forms of persistent backdoors.
-   **Lateral Movement**: Once inside, attackers can use the compromised system as a pivot point to move deeper into the network.

Given the scale of this botnet, any organization with RDP exposed to the internet is likely being targeted and is at high risk of compromise.

---

## Detection & Response
1.  **Monitor RDP Login Failures**: While these attacks attempt to be stealthy, they will still generate failed login events once password guessing begins. Monitor Windows Security Event ID `4625` for a high volume of failures, especially across multiple accounts from a single source IP or for a single account from multiple IPs. Use D3FEND's [`D3-ANET: Authentication Event Thresholding`](https://d3fend.mitre.org/technique/d3f:AuthenticationEventThresholding).
2.  **Network Traffic Analysis**: Monitor for a large number of inbound connections to port `3389` from a wide range of geographically diverse IP addresses. Even if the connections don't result in a successful login, the pattern itself is an indicator of being targeted. Use D3FEND's [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis).
3.  **Threat Intelligence**: Leverage threat intelligence feeds, such as the one provided by GreyNoise, to proactively block IPs known to be part of this botnet campaign.

---

## Mitigation
1.  **Disable Internet-Facing RDP**: The most effective mitigation is to ensure that RDP is not exposed directly to the internet. Access should be provided through a secure gateway, such as a VPN or a zero-trust network access (ZTNA) solution. This is a form of [`M1035 - Limit Access to Resource Over Network`](https://attack.mitre.org/mitigations/M1035/).
2.  **Enforce Multi-Factor Authentication (MFA)**: MFA is a critical defense against credential-based attacks. Even if an attacker successfully guesses a password, they will be unable to log in without the second factor. This is the core of D3FEND's [`D3-MFA: Multi-factor Authentication`](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication).
3.  **Strong Password Policies and Account Lockout**: Enforce the use of long, complex passwords. Implement an account lockout policy that will temporarily disable an account after a certain number of failed login attempts to frustrate brute-force attacks. This aligns with D3FEND's [`D3-SPP: Strong Password Policy`](https://d3fend.mitre.org/technique/d3f:StrongPasswordPolicy) and [`D3-AL: Account Locking`](https://d3fend.mitre.org/technique/d3f:AccountLocking).
4.  **Network Level Authentication (NLA)**: Enable NLA on all RDP connections. NLA requires a user to authenticate before a full RDP session is established, which is more resource-efficient and provides an earlier layer of protection.

**Tags:** Botnet, RDP, Brute Force, Credential Stuffing, Cyberattack

## Sources
- [Researchers warn of widespread RDP attacks by 100K-node botnet](https://securityaffairs.com/176964/hacking/widespread-rdp-attacks-botnet.html) — Security Affairs (2025-10-14)
- [GreyNoise Tracks Large-Scale Botnet Targeting RDP Services](https://www.greynoise.io/blog/widespread-rdp-attacks-by-100k-node-botnet) — GreyNoise (2025-10-14)

---
Source: https://cyber.netsecops.io/articles/large-scale-botnet-targets-rdp-services-in-us/
