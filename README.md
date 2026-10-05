# 🦕 SoloTrip

A travel-buddy app for solo travellers, designed **women-first**. Find people heading to the same place at the same time, and meet them on your own terms.

> Work in progress. Built from scratch as a learning project, one small module at a time.

## Why

Most "travel buddy" apps make women pay for being visible. SoloTrip flips the defaults: safety rules live in the product's logic, not in settings people have to find.

## Product rules

- **Women-only visibility.** A woman can choose to be visible only to other women. The rule is symmetric: she is hidden from everyone else, and she only sees women.
- **Destination and trip verification.** Profiles show verified trips, so people are going where they say they are.
- **Vouched badge for men.** Men's profiles show how many women have vouched for them.
- **Granular "shells".** Instead of a blind like, you send a shell to a specific photo, prompt or place.
- **Structured first message.** No free-text opener and no images in chat, to reduce harassment.
- **Report and remove.** Blocked or reported users disappear from the feed.

## Status

| Module | State |
| --- | --- |
| App shell, bottom navigation, routing | Done |
| Types and mock data | Done |
| Visibility rules (unit tested) | Done |
| Swipe deck with drag gestures | Done |
| Shells on specific items | Next |
| Buddy inbox, Messages, Profile | Planned |

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router) and React 18
- TypeScript
- Tailwind CSS 3
- Framer Motion for gestures and animation
- lucide-react for icons
- Vitest for unit tests

## Getting started

Requires Node.js 18.17 or newer.

```bash
git clone https://github.com/Bribri0na/soloTrip.git
cd soloTrip
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm test` | Run unit tests once |
| `npx tsc --noEmit` | Type-check the whole project |

## Project structure

```
src/
├── app/
│   ├── layout.tsx            Root layout, fonts
│   ├── page.tsx              Redirects to /discover
│   └── (main)/               Routes that share the phone frame and tab bar
│       ├── layout.tsx
│       ├── discover/         Swipe deck
│       ├── buddy/
│       ├── messages/
│       └── profile/
├── components/features/      BottomNav, ProfileCard, SwipeDeck
├── data/                     Mock profiles, the current user, activity tags
├── lib/                      Pure logic with tests: visibility, date formatting
└── types/                    Shared TypeScript types
```

## Design notes

- Palette: forest `#3F6E2F`, sage `#A3BD8E`, cream `#FAFBF6`, mist `#EEF3E6`, ink `#1E2A18`, sunset `#E0823A`.
- Typeface: Plus Jakarta Sans.
- Wording stays travel-flavoured: "shells" instead of likes, "Next" instead of pass.

## Roadmap

- [ ] Send a shell to a specific photo, prompt or place, with a preset first message
- [ ] Filter sheet: destination,