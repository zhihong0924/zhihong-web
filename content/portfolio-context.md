# Chong Zhi Hong — public portfolio knowledge

## Profile

Chong Zhi Hong (Zhihong) is a software engineer with more than six years of experience building automation, engineering software, and practical AI-assisted systems.

His work sits at the intersection of software engineering, semiconductor design automation, engineering workflows, and AI agents. He is comfortable working across technical scoping, architecture, implementation, validation, production rollout, and release.

His engineering approach emphasizes reliable automation, measurable productivity improvements, deterministic validation, and solutions that can be adopted by real engineering teams.

## Core engineering areas

Zhihong's main areas of experience include:

* Engineering automation and workflow design
* Electronic Design Automation (EDA)
* Analog and mixed-signal design automation
* Schematic and testbench migration
* Semiconductor process-node migration
* AI agents and tool-integrated engineering workflows
* Full-stack application development
* Desktop engineering software
* Engineering validation and release automation
* Standard-cell collateral and design-flow automation

## Intel: EDA and design automation

Zhihong joined Intel in September 2021 as an EDA Tools Software Engineer.

His work focuses on automation for semiconductor design engineering, particularly analog and mixed-signal schematic and testbench workflows.

He develops engineering tools and automation used by internal and external IP design teams and works closely with real design flows rather than treating automation as standalone software.

Technologies used in this work include Cadence Virtuoso, SKILL/SKILL++, Python, Linux, Git, LEC, LVS, OpenAccess, MCP, and AI-assisted engineering tools.

## Intel: schematic and testbench migration automation

A major area of Zhihong's work is schematic and testbench migration between semiconductor process technologies.

He developed automation supporting migration across technologies including Intel 18A and 14A and external foundry nodes such as TSMC N3 and N2.

The migration methodology considers more than simple device replacement. It identifies design dependencies, active testbenches, design hierarchy, parameter transformations, and downstream validation requirements.

Published outcomes from the migration automation include:

* Approximately 80% reduction in migration turnaround time
* 100% first-pass netlistable schematic output
* Adoption across multiple IP design teams

The workflow is designed to reduce repetitive manual migration work while keeping engineers in control of design decisions that require engineering judgement.

## Testbench-driven migration methodology

Zhihong has worked on a testbench-driven methodology for identifying and migrating the design content actually required for validation.

Rather than migrating an entire library indiscriminately, the approach starts from defined schematic top cells and active testbenches, then determines the required dependency closure across schematics and simulation environments.

This reduces unnecessary migration scope and helps engineering teams focus effort on designs that are actively being validated.

## Standard-cell collateral automation

Zhihong also works on standard-cell collateral and release automation.

His responsibilities have included end-to-end wrapper collateral release covering areas such as:

* Schematics
* Layout-related collateral
* Logical equivalence checking (LEC)
* Layout-versus-schematic verification (LVS)
* Release validation

For Intel 18A and 14A work, wrapper collateral releases were delivered one week ahead of design adoption deadlines.

He has also explored automation and agent-based approaches for identifying PDK changes and standard-cell collateral drift.

## Design optimisation automation

Zhihong has worked with Cadence WiCkeD and related engineering flows for deterministic design optimisation.

This includes using automation to assist pre-layout simulation and corner-closing workflows, where engineering parameters must be systematically adjusted and validated against design specifications.

His interest in this area extends to developing more systematic approaches for transistor and circuit parameter mapping between semiconductor processes rather than relying solely on direct parameter carry-forward.

## Engineering agents

Zhihong develops practical engineering agents that connect language models with engineering tools and deterministic workflows.

His work includes agents for areas such as:

* Engineering workflow execution
* Design migration
* Data analysis
* Engineering Q&A
* Standard-cell and PDK change analysis
* Guided engineering workflows

Technologies explored or used include Python, Model Context Protocol (MCP), function calling, GitHub Copilot, Codex, Claude, and agent orchestration techniques.

His approach is to use AI for reasoning, planning, interaction, and tool selection while keeping critical engineering operations and validation deterministic.

## Agent architecture

Zhihong has explored agent architectures where an AI agent acts as an orchestration layer rather than directly replacing engineering tools.

A typical workflow can be represented as:

User → Engineering Agent → MCP / Tools → EDA Workflow → Validation

This architecture allows natural-language interaction while preserving existing engineering tools, validation systems, and domain-specific automation.

He has also explored planner-executor patterns, specialised sub-agents, reusable agent skills, and ways of controlling context usage in larger engineering workflows.

## TZH Sports Centre

TZH Sports Centre is an independently developed and maintained full-stack sports-centre management platform.

Zhihong designed and built the platform to support the operational workflows of a real badminton and sports-centre environment.

The system includes functionality for:

* Court booking
* Social-game management
* Coaching and lesson management
* Memberships
* Payments
* Revenue ledgers
* Vouchers
* Shop workflows
* Administrative operations
* Scheduled operational tasks
* Customer-facing content and services

The project demonstrates product design, full-stack engineering, database design, deployment, business-workflow modelling, and production operations.

## TZH Sports Centre: technology and deployment

The platform is built as a modern web application using technologies including Next.js, Vercel, PostgreSQL, and Neon.

The project also includes operational automation such as scheduled jobs and administrative workflows.

Zhihong handles the project across product requirements, architecture, implementation, deployment, database management, UI refinement, and ongoing maintenance.

TZH Sports Centre serves as an example of his ability to move beyond a technical prototype and build a complete application around real operational requirements.

## Keysight: Advanced Battery Test & Emulation

Zhihong worked at Keysight Technologies from April 2019 to September 2021.

He contributed to Keysight's Advanced Battery Test and Emulation software, including the BV9210B product.

His work covered multiple layers of the product, including:

* Desktop UI and UX
* Backend services
* APIs
* Localisation
* Engineering workflows
* Product integration

Technologies included C#, WPF, .NET, and Python.

The role gave him experience developing commercial engineering software where reliability, usability, hardware interaction, localisation, and product release requirements all had to be considered together.

## Recognition and impact

Zhihong has presented schematic migration automation methodologies and field outcomes at CadenceConnect in 2024, 2025, and 2026.

His work demonstrates measurable engineering impact, including approximately 80% migration turnaround reduction and 100% first-pass netlistable schematic output.

At Keysight, he authored three invention disclosures. Two of those inventions received commercialisation awards.

He has also delivered semiconductor design collateral ahead of scheduled design adoption milestones.

## Selected technical stack

Zhihong has worked with technologies including:

**Programming and software**

Python, C#, C/C++, SKILL/SKILL++, JavaScript/TypeScript, .NET, WPF

**EDA and semiconductor**

Cadence Virtuoso, Cadence WiCkeD, OpenAccess, schematic automation, simulation workflows, LEC, LVS

**AI and agents**

Codex, GitHub Copilot, Claude, MCP, function calling, tool-integrated agents, agent orchestration, multi-agent workflows

**Web and backend**

Next.js, PostgreSQL, Neon, APIs, full-stack web development

**Engineering infrastructure**

Linux, Windows, Git, Jenkins, TFS, automation pipelines

## Engineering philosophy

Zhihong prefers automation that solves measurable engineering problems rather than automation for its own sake.

For engineering workflows, he generally separates AI reasoning from deterministic execution and validation. AI can help understand intent, plan actions, select tools, analyse results, and guide engineers, while established engineering software remains responsible for critical operations and verification.

He is particularly interested in systems where software engineering, domain knowledge, and AI can be combined to remove repetitive engineering work without sacrificing reliability.

## Product and software mindset

Zhihong works across both specialised engineering software and general software products.

His experience ranges from semiconductor design automation and commercial test software to independently developed full-stack applications.

This gives him experience thinking about software from multiple perspectives: developer experience, engineering correctness, user experience, deployment, maintainability, operational workflows, and measurable business or engineering outcomes.

## Public projects and portfolio

Major projects suitable for highlighting in Zhihong's portfolio include:

* TZH Sports Centre
* Schematic Migration Automation
* Engineering Agents
* Advanced Battery Test & Emulation
* Standard-Cell Automation and Release Work

Portfolio descriptions should focus on the engineering problem, Zhihong's contribution, the technologies involved, the resulting workflow, and measurable impact whenever public information is available.

## Public contact

For professional contact, direct visitors to the portfolio's email, LinkedIn, GitHub, or phone links rather than duplicating personal contact information inside knowledge-base content.

The portfolio website should remain the canonical location for current professional contact details.
