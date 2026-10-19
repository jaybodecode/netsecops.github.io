# 'Shadow Campaign' Hacks Governments in 37 Countries, China-Linked Group Suspected

**Severity:** critical | **Category:** Threat Actor,Cyberattack,Industrial Control Systems | **Updated:** 2026-02-05 | **Reading time:** 5 min

Security researchers have uncovered a massive, long-running cyber-espionage operation dubbed 'Shadow Campaign.' The campaign is attributed to a suspected Chinese nation-state group, TGR-STA-1030, and has successfully compromised at least 70 government and critical infrastructure organizations in 37 countries. The group's reconnaissance activities have been even broader, targeting government infrastructure in 155 countries. Targets include high-value entities like national law enforcement, border control, finance ministries, and telecommunications companies. The operational footprint, including tools and timezone activity (GMT+8), strongly points towards a China-based actor.

## Executive Summary

A prolific and sophisticated state-aligned cyberespionage group, tracked as **TGR-STA-1030** (also known as **UNC6619** by Mandiant), has been attributed to a massive global intrusion campaign impacting government and critical infrastructure sectors in at least 37 countries. The operation, named the "Shadow Campaign" by researchers at **[Palo Alto Networks Unit 42](https://unit42.paloaltonetworks.com/shadow-campaigns-uncovering-global-espionage/)**, has infiltrated a minimum of 70 organizations over the past year, with reconnaissance activities spanning 155 countries between November and December 2025.

While formal attribution is pending, operational characteristics—including the use of regional tooling, language preferences, activity hours corresponding to the GMT+8 time zone, and upstream infrastructure connections—strongly suggest alignment with the People's Republic of China. The campaign's primary objective is intelligence gathering, targeting sensitive data related to military, law enforcement, diplomatic, and economic affairs. The scale of the operation and the strategic nature of the targets indicate a well-resourced, persistent threat with significant long-term implications for international security and economic stability.

---

## Threat Overview

The "Shadow Campaign" represents a large-scale, coordinated cyberespionage effort focused on long-term intelligence collection. Unit 42 first identified TGR-STA-1030 in early 2025 while investigating malicious phishing campaigns targeting European governments. Infrastructure dating back to January 2024 suggests the group has been active for at least two years.

The threat actors have demonstrated a deep understanding of geopolitical events, timing their attacks to coincide with sensitive negotiations, ministerial meetings, and international operations. For instance, attacks on Indonesian and Mexican entities aligned with trade negotiations, while intrusions in Venezuela intensified following the U.S. Operation Absolute Resolve in January 2026.

### Successfully Compromised Targets

The group has successfully compromised:
- **Five national-level law enforcement/border control entities**
- **Three ministries of finance and various other government ministries**
- **One nation's parliament and a senior elected official of another**
- **National telecommunications companies**
- **Departments globally that align with economic, trade, natural resources and diplomatic functions**

### Specific High-Value Victims

- **Brazil**: Ministry of Mines and Energy (rare earth minerals intelligence)
- **Greece**: Syzefxis Project infrastructure (public sector modernization)
- **Indonesia**: Law enforcement, government officials, and an airline during aircraft purchase negotiations
- **Taiwan**: Major power equipment supplier
- **Zambia & DRC**: Government networks related to mining operations
- **Malaysia**: Multiple government departments and a financial institution
- **Mongolia**: Law enforcement entity before ministerial meetings
- **Panama**: Government infrastructure related to monument investigation
- **Venezuela**: Venezolana de Industria Tecnológica facility following Operation Absolute Resolve
- **Cyprus**: Government infrastructure during EU Council presidency preparations
- **Thailand**: Government department focused on economic and international trade intelligence
- **Djibouti**: Government network during naval handover operations
- **Bolivia**: Entity associated with mining amid election focus on mineral rights

---

## Technical Analysis

### Initial Access Vectors

**Phishing Campaigns**

TGR-STA-1030 employs sophisticated phishing campaigns with lures relevant to target organizations. In February 2025, Unit 42 investigated campaigns targeting European governments with emails about ministry reorganizations, containing links to malicious archives hosted on mega[.]nz.

**Diaoyu Loader**

The group developed a custom malware loader called "Diaoyu" (translating to "fishing/phishing"). This sophisticated tool employs multiple evasion techniques:
- Requires horizontal screen resolution ≥1440 pixels
- Environmental dependency check for specific file (pic1.png) in execution directory
- Audits for specific security products (Kaspersky, Avira, Bitdefender, Sentinel One, Symantec)
- Downloads payloads from GitHub repositories
- Ultimately deploys Cobalt Strike beacons

**N-Day Exploitation**

The group routinely exploits known vulnerabilities in public-facing applications. Over the past year, Advanced Threat Prevention services detected exploitation attempts including:
- SAP Solution Manager privilege escalation
- Microsoft Exchange Server RCE
- Microsoft Open Management Infrastructure RCE
- Atlassian Crowd (CVE-2019-11580)
- Pivotal Spring Data Commons XXE
- Struts2 OGNL RCE
- D-Link RCE vulnerabilities
- Various regional software (Weaver Ecology-OA, Zhiyuan OA, Eyou Email System, Ruijieyi Networks, Beijing Grandview Century eHR)
- HTTP directory traversal and SQL injection attempts
- Commvault CommCell CVSearchService authentication bypass

### MITRE ATT&CK Mapping

- [`T1566 - Phishing`](https://attack.mitre.org/techniques/T1566/): Carefully crafted lures relevant to target activities
- [`T1190 - Exploit Public-Facing Application`](https://attack.mitre.org/techniques/T1190/): Exploitation of known security flaws
- [`T1547 - Boot or Logon Autostart Execution`](https://attack.mitre.org/techniques/T1547/): Long-term persistence mechanisms
- [`T1071 - Application Layer Protocol`](https://attack.mitre.org/techniques/T1071/): HTTP/HTTPS for C2 communications
- [`T1560 - Archive Collected Data`](https://attack.mitre.org/techniques/T1560/): Data staging for exfiltration
- [`T1041 - Exfiltration Over C2 Channel`](https://attack.mitre.org/techniques/T1041/): Exfiltration of sensitive data
- [`T1589 - Gather Victim Identity Information`](https://attack.mitre.org/techniques/T1589/): Extensive reconnaissance
- [`T1078 - Valid Accounts`](https://attack.mitre.org/techniques/T1078/): Persistence and lateral movement

### Command and Control Frameworks

**VShell** (Primary C2)
- Go-based C2 framework
- Web access configured on 5-digit ephemeral TCP ports using ordered numbers
- Transitioned from Cobalt Strike to VShell as primary tool during 2024-2025
- Widely documented by NVISO as being used by multiple threat groups

**Additional C2 Frameworks**
- Cobalt Strike (legacy, still observed)
- Havoc
- SparkRat
- Sliver

### Web Shells

The group frequently deploys web shells on both external-facing and internal web servers:
- **Behinder**: Common web shell
- **Neo-reGeorg**: Tunneling and proxy capabilities
- **Godzilla**: Often obfuscated using Tas9er GitHub project code

### Tunneling Tools

- **GOST** (GO Simple Tunnel)
- **FRPS** (Fast Reverse Proxy Server)
- **IOX**: Cross-platform port forwarding tool

### ShadowGuard: Custom Linux Rootkit

Unit 42 discovered a new, unique Linux kernel rootkit used exclusively by TGR-STA-1030. **ShadowGuard** is an Extended Berkeley Packet Filter (eBPF) rootkit with advanced stealth capabilities:

**Capabilities:**
- Kernel-level concealment of processes
- Syscall interception via custom kill signals
- Can hide up to 32 processes simultaneously
- File and directory hiding (hard-coded check for "swsecret" directories/files)
- Allow-listing mechanism to exclude specific processes

**Detection Challenges:**
- Operates entirely in trusted kernel space
- Does not appear as separate kernel modules
- Executes inside kernel's BPF virtual machine
- Manipulates core system functions before security tools can see true data

**Usage Commands:**
```
kill -900 [PID]    # Add PID to allow list
kill -901 [PID]    # Remove PID from allow list
```

---

## Infrastructure Analysis

### Multi-Tiered Network Structure

**Victim-Facing (C2 Servers)**
- Hosted on legitimate VPS providers (DigitalOcean, Linode, etc.)
- Strategically placed in countries with strong rule of law: US, UK, Singapore
- Appears more legitimate to network defenders
- Enables low-latency connections across Americas, Europe, and Southeast Asia
- Complicates international law enforcement cooperation

**Relay Infrastructure**
- Additional VPS leased to relay traffic
- SSH on port 22 or high-numbered ephemeral ports
- Some configured with RDP on port 3389

**Proxies**
- DataImpulse residential proxy services (early 2025)
- Tor network
- Various commercial proxy services

**Upstream (Operator Infrastructure)**
- Direct connections observed from AS 9808 (ISP in actor's region)
- Geolocation consistent with GMT+8 timezone operations

### Domains

The group registers domains with specific TLDs: .me, .live, .help, .tech

**Notable Domains:**
- **gouvn[.]me**: Targeting Francophone countries (mimicking "gouv" government domains)
- **dog3rj[.]tech**: Targeting European nations (possible "DOGE Jr" reference)
- **zamstats[.]me**: Targeting Zambian government
- **msonline[.]help**: Mimicking Microsoft online services

---

## Impact Assessment

### Economic Espionage

**Rare Earth Minerals Intelligence:**
- Brazil's Ministry of Mines and Energy compromised; Brazil has world's second-largest rare earth reserves
- Bolivia entity related to mining targeted amid election focus on mining deals
- Multiple African nations targeted (DRC, Zambia) following mining accidents involving Asian companies
- Interest in countries with significant rare earth mineral reserves

**Trade Negotiations:**
- Indonesian airline compromised during aircraft purchase negotiations with US manufacturer
- Mexican ministries targeted within 24 hours of tariff investigation announcement
- Multiple compromise timings aligned with economic partnership discussions
- Czech government infrastructure scanned during Dalai Lama 90th birthday gala preparations

### National Security Impact

**Law Enforcement & Border Control:**
- Five national-level law enforcement/border control entities compromised
- Mongolian police targeted before key ministerial meeting with Asian counterpart
- Access to investigation data, informant identities, operational plans

**Government Administration:**
- Parliament of one nation compromised
- Senior elected official of another nation compromised
- Ministries of Interior, Foreign Affairs, Finance, Trade compromised across 37 countries

**Critical Infrastructure:**
- Taiwan power equipment supplier compromised (supply chain risk)
- Greece's Syzefxis Project (public sector connectivity infrastructure)
- National telecommunications companies across multiple countries
- Djibouti infrastructure during naval operations

### Long-Term Strategic Intelligence

- Persistent access maintained for months
- Monitoring of communications and policy decisions
- Intelligence gathering correlated with geopolitical events (U.S. government shutdown in October 2025, Operation Absolute Resolve, trade negotiations)
- Positioning for potential future disruptive operations

---

## Indicators of Compromise

### IP Addresses

```
138.197.44[.]208
142.91.105[.]172
146.190.152[.]219
157.230.34[.]45
157.245.194[.]54
159.65.156[.]200
159.203.164[.]101
178.128.60[.]22
178.128.109[.]37
188.127.251[.]171
188.166.210[.]146
208.85.21[.]30
```

### Domains

```
abwxjp5[.]me
brackusi0n[.]live
dog3rj[.]tech
emezonhe[.]me
gouvn[.]me
msonline[.]help
pickupweb[.]me
pr0fu5a[.]me
q74vn[.]live
servgate[.]me
zamstats[.]me
zrheblirsy[.]me
```

### File Hashes

**Diaoyu Loader / Phishing:**
- `66ec547b97072828534d43022d766e06c17fc1cafe47fbd9d1ffc22e2d52a9c0`
- `23ee251df3f9c46661b33061035e9f6291894ebe070497ff9365d6ef2966f7fe`

**Cobalt Strike Beacons:**
- `5175b1720fe3bc568f7857b72b960260ad3982f41366ce3372c04424396df6fe`
- `358ca77ccc4a979ed3337aad3a8ff7228da8246eebc69e64189f930b325daf6a`
- `293821e049387d48397454d39233a5a67d0ae06d59b7e5474e8ae557b0fc5b06`
- `c876e6c074333d700adf6b4397d9303860de17b01baa27c0fa5135e2692d3d6f`
- `b2a6c8382ec37ef15637578c6695cb35138ceab42ce4629b025fa4f04015eaf2`
- `5ddeff4028ec407ffdaa6c503dd4f82fa294799d284b986e1f4181f49d18c9f3`
- `182a427cc9ec22ed22438126a48f1a6cd84bf90fddb6517973bcb0bac58c4231`

**ShadowGuard Rootkit:**
- `7808b1e01ea790548b472026ac783c73a033bb90bbe548bf3006abfbcb48c52d`

**CVE-2019-11580 Exploit:**
- `9ed487498235f289a960a5cc794fa0ad0f9ef5c074860fea650e88c525da0ab4`

---

## Detection & Response

Defending against a sophisticated actor like **TGR-STA-1030** requires a mature security program with proactive threat hunting capabilities.

1. **Assume Breach Mentality**: Given the scale of this campaign, organizations in the targeted sectors (government, critical infrastructure) should assume they are being targeted and proactively hunt for signs of compromise.

2. **Network Traffic Analysis**: Implement [`D3-NTA: Network Traffic Analysis`](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) to baseline normal traffic patterns for critical assets. Monitor for large or unusual data transfers, especially to geolocations inconsistent with business operations. Pay close attention to traffic during GMT+8 working hours. Look for connections to ephemeral 5-digit TCP ports with ordered numbers (VShell characteristic).

3. **Endpoint Detection and Response (EDR)**: Deploy EDR solutions to monitor for suspicious process execution (PowerShell invoked by office applications, archiving utilities). Hunt for web shell indicators (Behinder, Neo-reGeorg, Godzilla). Look for eBPF programs and anomalous kernel-level activity indicative of ShadowGuard rootkit.

4. **Log Monitoring & Correlation**: Ingest and analyze logs from public-facing applications, VPNs, and email gateways. Correlate login events with geographic data to identify access from unexpected regions. Use [`D3-DAM: Domain Account Monitoring`](https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring) for anomalous privileged account use. Alert on creation of files/directories beginning with "swsecret".

5. **Threat Intelligence Integration**: Actively consume and operationalize threat intelligence related to TGR-STA-1030. Use IOCs to hunt in logs and create detection rules. This is a form of [`D3-FCR: File Content Rules`](https://d3fend.mitre.org/technique/d3f:FileContentRules) and hash-based detection.

6. **Threat Hunting**: Proactively hunt for evidence of N-day exploitation on internet-facing systems. Search for web shell activity and signs of lateral movement from perimeter devices. Conduct regular IOC sweeps using indicators provided by Unit 42 and industry partners. Investigate any connections to/from AS 9808 IP space.

---

## Mitigation

1. **Patch Management**: Aggressively patch known vulnerabilities in all internet-facing systems, prioritizing CVEs exploited by this group. This corresponds to MITRE mitigation [`M1051 - Update Software`](https://attack.mitre.org/mitigations/M1051/).

2. **Security Awareness Training**: Since phishing is a primary vector, implement continuous user training ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/)) to help employees recognize and report suspicious emails, especially those with links to file-sharing services like mega[.]nz.

3. **Network Segmentation**: Implement [`M1030 - Network Segmentation`](https://attack.mitre.org/mitigations/M1030/) to limit lateral movement. Isolate critical systems from the general corporate network and restrict communication paths between segments. This aligns with [`D3-NI: Network Isolation`](https://d3fend.mitre.org/technique/d3f:NetworkIsolation).

4. **Multi-Factor Authentication (MFA)**: Enforce MFA ([`M1032 - Multi-factor Authentication`](https://attack.mitre.org/mitigations/M1032/)) on all external access points, including VPNs and cloud services, to protect against credential theft. Prioritize phishing-resistant MFA like FIDO2.

5. **Egress Filtering**: Implement strict outbound traffic filtering ([`D3-OTF: Outbound Traffic Filtering`](https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering)) to block connections to known malicious infrastructure and restrict exfiltration channels. Only allow traffic to required destinations on necessary ports.

6. **eBPF Monitoring**: Implement monitoring for eBPF program loading and kernel-level anomalies to detect ShadowGuard rootkit activity. Alert on unusual kernel module activity and syscall interceptions.

7. **File Integrity Monitoring**: Alert on unauthorized changes to system binaries and configurations. Monitor for files/directories with names beginning with "swsecret".

8. **Attack Surface Reduction**: Reduce the external attack surface by disabling unnecessary services and enforcing strong access controls on all internet-facing systems.


**Tags:** Shadow Campaign, APT, China, Espionage, TGR-STA-1030, Critical Infrastructure

## Sources
- [Cyberspy Group Hacked Governments and Critical Infrastructure in 37 Countries](https://www.securityweek.com/cyberspy-group-hacked-governments-and-critical-infrastructure-in-37-countries/) — SecurityWeek (2026-02-05)
- ['Shadow Campaign': Advanced Chinese APT Compromises 70+ Orgs Worldwide](https://thehackernews.com/2026/02/shadow-campaign-apt.html) — The Hacker News (2026-02-05)
- [New APT group breached gov and critical infrastructure orgs in 37 countries](https://www.csoonline.com/article/1311090/new-apt-group-breached-gov-and-critical-infrastructure-orgs-in-37-countries.html) — csoonline.com (2026-02-05)
- [Unit 42 identifies TGR-STA-1030 cyber espionage group targeting critical infrastructure, government networks](https://industrialcyber.co/government/unit-42-identifies-tgr-sta-1030-cyber-espionage-group-targeting-critical-infrastructure-government-networks/) — industrialcyber.co (2026-02-06)
- [Asian government's espionage campaign breached critical infrastructure in 37 countries](https://www.recordedfuture.com/news/asian-governments-espionage-campaign-breached-critical-infrastructure-in-37-countries) — recordedfuture.com (2026-02-05)
- [The Shadow Campaigns: Uncovering Global Espionage](https://unit42.paloaltonetworks.com/shadow-campaigns-uncovering-global-espionage/) — Unit 42 (2026-02-05)

---
Source: https://cyber.netsecops.io/articles/shadow-campaign-espionage-activity-uncovered-china-suspected/
