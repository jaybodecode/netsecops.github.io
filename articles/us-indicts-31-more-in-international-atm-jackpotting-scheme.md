# US Indicts 31 More in ATM Jackpotting Ring Linked to Tren de Aragua Gang

**Severity:** medium | **Category:** Threat Actor,Cyberattack,Malware | **Updated:** 2026-01-28 | **Reading time:** 4 min

A U.S. federal grand jury has indicted an additional 31 individuals for their participation in a widespread 'ATM jackpotting' conspiracy, bringing the total number of defendants to 87. The sophisticated scheme involved using malware to force ATMs to dispense large sums of cash. Many of the newly charged individuals are Venezuelan and Colombian nationals, including several identified members of the transnational criminal gang Tren de Aragua (TdA) who are in the U.S. illegally. The case highlights the growing convergence of organized crime and specialized cybercrime tactics.

## Executive Summary
The U.S. Department of Justice has announced a new indictment charging 31 individuals in connection with a multi-million dollar ATM "jackpotting" scheme that has targeted banks across the United States. This action, part of a Homeland Security Task Force operation, brings the total number of individuals charged in the conspiracy to 87. The indictment alleges that the defendants, many of whom are Venezuelan and Colombian nationals, conspired to commit bank fraud and computer intrusion. Notably, several members of the violent transnational gang **Tren de Aragua (TdA)** have been identified among the accused, illustrating a dangerous fusion of traditional organized crime with sophisticated cybercrime techniques.

---

## Threat Overview
The conspiracy revolves around a technique known as "ATM jackpotting." This is a type of logical attack where criminals use specialized malware and/or physical access to an ATM to force it to dispense all its cash on command. The operation was large-scale, involving coordinated teams of "money mules" who would travel to ATMs to collect the stolen cash.

The indictment includes 32 counts, covering charges such as:
-   Conspiracy to commit bank fraud
-   Conspiracy to commit bank burglary
-   Conspiracy to commit computer fraud and abuse

The involvement of the **Tren de Aragua (TdA)** gang is a significant development. TdA is a powerful and violent gang originating from Venezuela, known for extortion, kidnapping, and drug trafficking. Their expansion into high-tech financial crimes like ATM jackpotting shows an evolution in their capabilities and a diversification of their criminal enterprise.

## Technical Analysis
ATM jackpotting attacks typically involve several steps:
1.  **Gaining Access:** Criminals need to gain physical or logical access to the ATM's internal components. This is often done by picking locks on the ATM's top-hat (the cabinet housing the computer) or by using a stolen master key.
2.  **Malware Installation:** Once they have access, they connect a device (like a laptop or a Raspberry Pi) to the ATM's internal USB or network ports to install malware. Famous ATM malware families include **[Ploutus](https://malpedia.caad.fkie.fraunhofer.de/details/win.ploutus)** and Tyupkin.
3.  **Command and Control:** The malware allows the criminals to control the cash dispenser. In some cases, the malware is controlled locally via a connected keyboard. In more sophisticated attacks, the malware connects to a remote command-and-control (C2) server, often via a mobile phone attached inside the ATM. The C2 operator can then send a command to a specific ATM to dispense cash.
4.  **Cash-Out:** A team of money mules is dispatched to the targeted ATM at a pre-arranged time to collect the dispensed cash.

## Impact Assessment
-   **Financial Losses:** The primary impact is direct financial loss for the banks and financial institutions that own the ATMs. These losses can run into the millions of dollars over the course of a campaign.
-   **Organized Crime:** The involvement of a major transnational gang like TdA demonstrates that profits from cybercrime are being used to fund other criminal activities, increasing the overall threat to public safety.
-   **Public Trust:** Widespread ATM fraud can erode public trust in the banking system and the security of financial infrastructure.

## Mitigation for Financial Institutions
1.  **Physical Security:** Strengthen physical security controls on all ATMs. This includes using high-security locks, installing alarms on cabinet doors, and conducting regular physical inspections.

2.  **Application Whitelisting:** Implement application whitelisting on the ATM's underlying operating system (often Windows). This prevents any unauthorized executables, including malware, from running.

3.  **Harden the OS:** Apply security hardening baselines to the ATM's operating system, disable autorun features for USB devices, and restrict boot sequences to the primary hard drive.

4.  **Network Segmentation:** Isolate the ATM network from other parts of the bank's corporate network. Monitor traffic for any suspicious outbound connections.

5.  **File Integrity Monitoring:** Use file integrity monitoring to detect any unauthorized changes to critical system files or the addition of new files on the ATM's hard drive.

**Tags:** ATM jackpotting, Tren de Aragua, bank fraud, cybercrime, indictment, malware

## Sources
- [Cyber Threat Intelligence 28 January 2026](https://ncsa.web.th/2026/01/28/cyber-threat-intelligence-28-january-2026/) — NCSA Webboard (2026-01-28)

---
Source: https://cyber.netsecops.io/articles/us-indicts-31-more-in-international-atm-jackpotting-scheme/
