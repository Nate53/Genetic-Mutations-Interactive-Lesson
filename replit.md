# Genetic Mutations: The Engine of Variation

## Overview
An educational module/app for AP and IB Biology students focused on understanding genetic mutations as the raw material for evolution. The app features interactive learning components, case studies, and a Reading Frame puzzle.

## Project Structure
- `client/src/pages/` - All page components
  - `home.tsx` - Landing page with overview
  - `big-idea.tsx` - Theoretical framework page
  - `mechanisms.tsx` - How mutations occur
  - `types.tsx` - Point mutations and frameshifts
  - `outcomes.tsx` - Biological fitness outcomes
  - `case-studies.tsx` - Real-world examples
  - `puzzle.tsx` - Interactive Reading Frame puzzle
- `client/src/components/` - Reusable components
  - `app-sidebar.tsx` - Navigation sidebar
  - `theme-provider.tsx` - Dark/light mode provider
  - `theme-toggle.tsx` - Theme toggle button
- `client/src/lib/codon-table.ts` - Codon translation utilities

## Core Features
1. **Content Modules**: Three educational pillars (Mechanisms, Types, Outcomes)
2. **Theoretical Framework**: Big Idea explaining mutation-evolution relationship
3. **Case Studies**: Sickle Cell, Antibiotic Resistance, Lactose Tolerance
4. **Interactive Puzzle**: Reading Frame deletion/insertion simulator

## Tech Stack
- React + TypeScript (Vite)
- Wouter for routing
- Tailwind CSS + shadcn/ui components
- Tanstack Query for data fetching

## Design
- Biology/science themed green color palette
- Dark/light mode support
- Responsive sidebar navigation
- Interactive components with hover states

## Running
Use "npm run dev" to start the development server on port 5000.
