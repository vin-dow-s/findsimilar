# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Development server with Turbopack
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Linting
pnpm lint
```

## Project Architecture

**FindSimilar** is a Next.js 15 recommendation app using the App Router that helps users find similar books, games, and movies. The app is built with TypeScript, Tailwind CSS, and integrates with external APIs.

### Key Architecture Patterns

- **App Router Structure**: Uses Next.js App Router with route-specific organization under `src/app/`
- **API Integration**: Connects to Google Books API, IGDB (games), and TMDB (movies) through dedicated API routes
- **Domain-Driven Organization**: Features are organized by content type (books, games, movies) with parallel structure
- **Server-First Approach**: Leverages Server Components and API routes for data fetching

### Directory Structure

```
src/
├── app/
│   ├── api/           # API routes for each content type
│   │   ├── books/     # Google Books API integration
│   │   ├── games/     # IGDB API integration  
│   │   └── movies/    # TMDB API integration
│   ├── books/         # Books recommendation page
│   ├── games/         # Games recommendation page
│   ├── movies/        # Movies recommendation page
│   └── feedback/      # Feedback collection page
├── components/        # React components organized by domain
│   ├── books/         # Book-specific components
│   ├── games/         # Game-specific components
│   ├── movies/        # Movie-specific components
│   └── ui/           # Shared UI components
├── hooks/            # Custom React hooks by domain
├── lib/              # Utilities and type definitions
└── public/           # Static assets organized by content type
```

### External API Integration

The app integrates with three main APIs through dedicated API routes:
- **Google Books API**: Book search and recommendations
- **IGDB API**: Game data and recommendations  
- **TMDB API**: Movie data and recommendations

Each domain follows the same pattern:
1. Search suggestions endpoint
2. External API fetch endpoint
3. AI-powered similar titles endpoint

### Custom Hooks Pattern

Each content type has parallel custom hooks:
- Suggestions hooks: `useBookSuggestions`, `useGameSuggestions`, `useMovieSuggestions`
- Similar content hooks: `useSimilarBooks`, `useSimilarGames`, `useSimilarMovies`

### Styling and Fonts

Uses Tailwind CSS with custom font families loaded via next/font:
- Inter (default)
- Lora 
- Poppins
- Cinzel
- Josefin Sans

### Key Configuration

- **Image Optimization**: Configured for external domains (books.google.com, images.igdb.com, image.tmdb.org)
- **Analytics**: Vercel Analytics integration
- **SEO**: Comprehensive metadata with OpenGraph and Twitter cards

### Development Standards (from .cursorrules)

- Use Server Components by default, mark Client Components with 'use client'
- Focus on Next.js App Router conventions
- Implement proper loading and error states
- Use TypeScript strictly with proper type definitions
- Follow component organization with shared components in `/components/ui/`