# QOOMLEE AIRLINE SYSTEM - PROJECT STRUCTURE

## Overview
This repository contains the design documentation and planning materials for the Qoomlee Airline System - a hybrid (LCC comfort+) carrier connecting Southeast Asian tier-2 cities to Australian gateways.

## Project Organization

### Root Directory
The root directory contains high-level project documents and planning materials:

- `README.md` - This file, project overview and structure

### 00-Planning Directory
Strategic planning and project initiation documents:

```
00-planning/
├── 00-project_tracking_board.md          # Project tracking board with sprints and stories
├── 01-backlog_refinement.md              # Detailed backlog refinement with acceptance criteria
├── 02-sprint_zero_tasks.md               # Sprint Zero foundational setup tasks
├── 03-backlog_refinement_operations.md   # Operational backlog refinement for aviation compliance
├── 04-definition_of_done.md              # Definition of Done for all user stories
├── plan.md                               # Main project plan and methodology
└── archive/mvp_action_plan_archived.md   # Archived MVP action plan (completed)
```

### 01-Documentation Directory
Business and technical documentation organized by purpose:

```
01-documentation/
├── Qoomlee_Definition.md                    # Core system definition and concepts
├── Qoomlee_Route_Market_Analysis.md         # Business case and market opportunity
├── Qoomlee_MVP_PRD.docx                     # Product requirements for MVP
├── Qoomlee_DB_Schema_API_Contract.docx      # Technical specifications for data and APIs
└── stitch_ui_prompt.md                      # UI/UX design specifications
```

### 02-Architecture Directory
System architecture and design:

```
02-architecture/
├── api/
│   └── api_documentation.md                 # Comprehensive API documentation
├── architecture/
│   ├── Qoomlee_C4_L1_Context.d2            # System context diagram source
│   ├── Qoomlee_C4_L1_Context.svg           # System context diagram
│   ├── Qoomlee_C4_L2_Container.d2          # Container diagram source
│   ├── Qoomlee_C4_L2_Container.svg         # Container diagram
│   ├── Qoomlee_C4_L3_Component.d2          # Component diagram source
│   ├── Qoomlee_C4_L3_Component.svg         # Component diagram
│   └── technical_review.md                  # Technical architecture review
└── README.md                               # Architecture documentation overview
```

### 03-Database Directory
Database schema and data:

```
03-database/
└── qoomlee_seeds.sql                       # Database seed data
```

### 04-UI-UX Directory
User interface and user experience:

```
04-ui-ux/
├── DESIGN.md                               # Design system specification
├── stitch_ui_prompt.md                     # UI design prompts for Stitch
└── ui_mockups.md                           # UI mockup documentation
```

## File Naming Convention
Files follow the pattern: `XX-[category]-[description].[extension]`
- XX: Sequential number for chronological order
- category: Broad classification (planning, architecture, etc.)
- description: Specific content description
- extension: File format

## Development Workflow
1. Start with files in `00-planning/` for project understanding
2. Review `01-documentation/` for business requirements
3. Study `02-architecture/` for technical design
4. Use `03-database/` for data structure understanding
5. Reference `04-ui-ux/` for interface design

## Getting Started
For new team members, begin with:
1. `00-planning/plan.md` - Understanding the methodology
2. `00-planning/00-project_tracking_board.md` - Project tracking and sprints
3. `01-documentation/Qoomlee_Definition.md` - System definition
4. `02-architecture/architecture/Qoomlee_C4_L1_Context.svg` - System context
5. `00-planning/05-mvp_checklist.md` - Current progress and next steps

## Contributing
When adding new files:
1. Place in the appropriate directory
2. Follow the naming convention
3. Update this README if adding new categories
4. Maintain chronological order with numbering

## Maintenance
- Keep this README updated when directory structure changes
- Archive old files in `archive/` directory rather than deleting
- Use symbolic links for frequently accessed files across directories