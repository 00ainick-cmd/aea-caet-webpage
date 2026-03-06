# CAET-Advanced Page — Implementation Notes (v2)

## Overview
Create a new page at `www.aea.net/CAET-Advanced`. This page is NOT a clone of the base `/caet/` page — it has a fundamentally different structure because CAET-Advanced uses a three-part sequential assessment (PQS practical → written exam → oral board), not just a written test.

## URL Configuration

| URL | Action |
|-----|--------|
| `www.aea.net/CAET-Advanced` | Primary URL — new page lives here |
| `www.aea.net/caetadvanced` | 301 redirect → `/CAET-Advanced` |
| `www.aea.net/caet-advanced` | 301 redirect → `/CAET-Advanced` |

## Key Sections (in order)

| Section | Purpose |
|---------|---------|
| Hero | "CAET-Advanced" — Level 2 certification, three-part assessment |
| What is CAET-Advanced? | Description + Quick Facts sidebar |
| **Three-Part Assessment** | Visual pathway: PQS Practical → Written → Oral (sequential) |
| **8 Skill Categories** | Grid of all 8 PQS categories with 65 total tasks |
| **PQS Sign-Off Process** | 4-step evaluator workflow explaining how tasks get signed off |
| **Apprenticeship Connection** | How CAET-Advanced integrates with AEA Registered Apprenticeship |
| Benefits | 6 benefit cards |
| Badge Comparison | 3 badges — CAET links to /caet/, Advanced is active, Pro says "Available in 2026" |
| Testimonial | Danny Santiago quote (swap when Advanced-specific available) |
| New to CAET? | Link back to /caet/ |
| FAQs | 6 tabs: General, PQS Practical, Written & Oral, For Employers, Recertification, Support |
| Contact | Nick Brown |

## The 8 PQS Categories (correct names)
1. Attitude, Heading & Air Data Systems
2. Flight Management & Navigation
3. Autopilot & Flight Control Systems
4. Avionics Systems Integration
5. Wire Harness Fabrication & Installation
6. Audio & Communication Systems
7. Software, Documentation & Configuration
8. Surveillance Systems

## IMPORTANT: No Gap Exam on This Page
The gap exam is for AET → CAET transitions (legacy NCATT holders). It belongs on the main `/caet/` page, NOT here. There is no gap exam pathway from CAET to CAET-Advanced.

## Images
Reuse from existing AEA assets:
- `/images/caet/CAET_Advanced_480.png` — hero and badge sections
- `/images/caet/CAET_CERTIFIED_480.png` — badge comparison
- `/images/caet/CAET_Pro_480.png` — badge comparison
- `/pressroom/images/photos/NickBrown_480.jpg` — contact section

## Navigation Update
Add CAET-Advanced under Training menu, either as a sub-item or update the existing CAET label.
