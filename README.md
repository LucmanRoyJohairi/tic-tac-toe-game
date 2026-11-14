# Tic-Tac-Toe 🦶

A playful, modern take on the classic **Tic-Tac-Toe** game built with **React 19**, **Next.js**, **Tailwind CSS**, and **shadcn/ui**—complete with custom player names, retro 8-bit chiptune audio, winning-line highlights, and celebratory confetti.

## ✨ Features

- **Custom Player Setup:** Interactive welcome modal to enter names for Player X and Player O before starting a match.
- **Retro 8-Bit Arcade Audio:** Zero-dependency Web Audio API synthesizer generating distinct X/O placement pops, victory fanfares, draw jingles, and a bouncy chiptune background loop (with a quick mute toggle).
- **Interactive Game Board:** Ghost hover previews showing the active player's mark, smooth placement animations, and glowing highlights across the winning three-in-a-row tiles.
- **Victory Celebrations:** Confetti bursts followed by a color-matched end-of-round summary modal.
- **Live Scoreboard:** Tracks wins for both players plus draws across multiple rounds.
- **Mobile Responsive:** Adapts seamlessly between mobile, tablet, and desktop viewports.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **Library:** [React 19](https://react.dev)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **UI Components:** [shadcn/ui](https://shadcn.com) & [Lucide Icons](https://lucide.dev)
- **Effects & Audio:** `canvas-confetti` & native Web Audio API

## 📁 Project Structure

```text
├── public/
│   └── tic-tac-toe-logo.png      # Custom game logo
└── src/
    ├── app/
    │   ├── globals.css           # Tailwind styles & cursor rules
    │   ├── layout.tsx            # Inter font & metadata config
    │   └── page.tsx              # Main game state & layout
    ├── components/
    │   ├── game/
    │   │   ├── game-board.tsx        # 3x3 grid with hover previews & win highlights
    │   │   ├── game-over-modal.tsx   # End-of-round summary pop-up
    │   │   ├── game-status.tsx       # Active turn & winner banner
    │   │   ├── player-name-modal.tsx # Initial player setup pop-up
    │   │   ├── score-board.tsx       # Win & draw tracker
    │   │   └── types.ts              # Shared TypeScript interfaces
    │   └── ui/                   # shadcn/ui primitives (Button, Card, Dialog, Input, Label)
    └── lib/
        └── sound-effects.ts      # Web Audio API 8-bit synthesizer
```

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd tic-tac-toe
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start playing.