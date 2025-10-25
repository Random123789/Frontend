# LegaLens Components

This directory contains the main components for the LegaLens application:

## Main Components

- **Home.tsx** - Landing page with features, pricing, and hero section
- **AuthModal.tsx** - Login and signup modal
- **Dashboard.tsx** - Main dashboard for authenticated users with contract management
- **ContractAnalysis.tsx** - Detailed contract analysis view with summary and risk assessment
- **ContractComparison.tsx** - Side-by-side comparison of multiple contracts

## Data Flow

The app uses local state management with localStorage persistence for the prototype. In production, this would be replaced with Supabase for:
- User authentication
- Contract storage
- Analysis results persistence
- Payment tracking

## Mock Data

The prototype uses simulated processing and pre-configured mock analysis data to demonstrate the user experience without requiring actual AI/ML integration.
