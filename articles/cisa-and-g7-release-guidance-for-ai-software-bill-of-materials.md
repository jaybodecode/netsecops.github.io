# CISA and G7 Partners Release New Guidance for AI SBOMs

**Severity:** informational | **Category:** Policy and Compliance,Regulatory,Cloud Security | **Updated:** 2026-05-13 | **Reading time:** 4 min

The U.S. Cybersecurity and Infrastructure Security Agency (CISA) and its G7 partners have published new joint guidance on the minimum elements for a Software Bill of Materials for Artificial Intelligence (AI SBOM). The guidance aims to increase transparency and security in the AI supply chain by providing a framework for documenting the components, models, and data used to build AI systems. While not mandatory, it is expected to become a standard for procurement and risk management.

## Executive Summary
In a coordinated effort to enhance the security and transparency of the artificial intelligence ecosystem, the U.S. **[Cybersecurity and Infrastructure Security Agency (CISA)](https://www.cisa.gov)**, along with its counterparts in the G7 nations and the European Union, has released a new publication: "Software Bill of Materials for AI – Minimum Elements." This guidance extends the traditional concept of a Software Bill of Materials (SBOM) to the unique complexities of AI systems. It proposes a framework for documenting not just software components, but also critical details about AI models, training data, and infrastructure. The goal is to provide consumers of AI technology with the necessary information to assess risk, manage vulnerabilities, and understand the provenance of the AI systems they deploy.

## Regulatory Details
The guidance is a non-binding consensus document developed by cybersecurity experts from Canada, France, Germany, Italy, Japan, the UK, the US, and the EU. It is not a formal regulation but is intended to serve as a foundational standard for the industry. It builds upon the established principles of SBOMs and adapts them for AI, recognizing that AI systems are a specialized form of software.

### Key Supplemental Elements for AI SBOMs:
The guidance introduces seven "clusters" of information that should be included in an AI SBOM in addition to standard software components:
1.  **Metadata:** Basic information about the AI SBOM itself, such as author and timestamp.
2.  **System Level Properties:** A high-level description of the AI system's purpose and architecture.
3.  **AI Model Properties:** Details about the model, including architecture, parameters, and any fine-tuning.
4.  **AI Dataset Properties:** Information about the data used to train, test, and validate the model, including its source and any preprocessing steps.
5.  **Infrastructure Information:** Dependencies on hardware and cloud services required for the AI system to operate.
6.  **Cybersecurity Measures:** Information on security evaluations performed, such as red-teaming or vulnerability scanning.
7.  **Performance Indicators:** Metrics used to evaluate the model's performance and limitations.

## Affected Organizations
This guidance will affect a broad range of organizations:
- **AI Developers and Suppliers:** They will be expected to generate and provide AI SBOMs for their products.
- **Public and Private Sector Consumers:** They will use AI SBOMs as part of their procurement and vendor risk management processes.
- **Regulators and Policymakers:** They will likely reference this guidance in future regulations and standards.

## Impact Assessment
The primary impact of this guidance will be to increase transparency and accountability in the AI supply chain. By providing a standardized "ingredients list," AI SBOMs will enable organizations to better understand the risks associated with the AI tools they use. This can help identify vulnerabilities in underlying components, detect potential data poisoning or model tampering, and make more informed decisions about AI adoption. In the short term, it will create new compliance and documentation overhead for AI developers. In the long term, it is expected to foster a more secure and trustworthy AI ecosystem.

## Compliance Guidance
While adoption is voluntary, organizations should begin preparing for a future where AI SBOMs are standard practice:
- **AI Developers:** Start building processes and tools to automatically generate AI SBOMs as part of the development lifecycle. Treat it as a core part of "secure-by-design" principles for AI.
- **AI Consumers:** Begin incorporating requests for AI SBOMs into procurement contracts and vendor security questionnaires. Develop internal processes to ingest, analyze, and act on the information contained within them.
- **Security Teams:** Familiarize yourselves with the new guidance. Plan how to integrate AI SBOM data into existing vulnerability management and application security programs. Use D3FEND's [`System File Analysis (D3-SFA)`](https://d3fend.mitre.org/technique/d3f:SystemFileAnalysis) as a conceptual model for how to analyze the components listed in an SBOM.

**Tags:** AI, Artificial Intelligence, SBOM, supply chain security, CISA, G7, transparency

## Sources
- [CISA and Partners Release New Software Bill of Materials for AI Guidance](https://www.hstoday.us/subject-matter-areas/cybersecurity/cisa-and-partners-release-new-software-bill-of-materials-for-ai-guidance/) — Homeland Security Today (2026-05-12)
- [Global Cyber Agencies Issue New SBOMs for AI Guidance to Tackle AI Supply Chain Risks](https://www.infosecurity-magazine.com/news/g7-cisa-sbom-ai-guidance-supply/) — Infosecurity Magazine (2026-05-13)
- [Major world economies spell out key elements of AI ‘ingredients list’](https://cyberscoop.com/g7-cisa-sbom-ai-guidance/) — CyberScoop (2026-05-12)
- [CISA's AI SBOM guidance pushes software supply-chain oversight into new territory](https://www.csoonline.com/article/2126583/cisas-ai-sbom-guidance-pushes-software-supply-chain-oversight-into-new-territory.html) — CSO Online (2026-05-13)

---
Source: https://cyber.netsecops.io/articles/cisa-and-g7-release-guidance-for-ai-software-bill-of-materials/
