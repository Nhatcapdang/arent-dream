## 🚦 NOTE
- The "Hiragino Kaku Gothic Pro" font is available at "@https://www.screen.co.jp/ga_product/sento/downloads.html," but I'm not sure how to use it. I've tried downloading the font from the website, but I'm unable to see anything with extensions .Woff.
I therefore choose to utilize Noto Sans JP rather than "Hiragino Kaku Gothic Pro."

## 🚦 Getting Started

### Prerequisites
- Node.js 24.2.0 or higher
- npm 10.0.0 or higher

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Nhatcapdang/arent-dream.git
cd arent-dream
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:3002`

### Production Build
```bash
npm run build
npm run start
```

## 📜 Available Scripts

### Development
- `npm run dev` - Start development server on port 3002
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run analyze` - Analyze bundle size

### Code Quality
- `npm run lint` - Run ESLint and Stylelint
- `npm run prettier:check` - Check code formatting
- `npm run prettier:write` - Format code
- `npm run typecheck` - Run TypeScript compiler


## 🚀 Features

- **Health Tracking Dashboard**: Monitor daily activities with interactive hexagonal navigation
- **Data Visualization**: Dynamic charts using Chart.js with real-time data updates
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Infinite Scroll**: Paginated data loading with smooth animations
- **Mock API Integration**: Fake data from MockAPI.io for development
- **Modern UI**: Framer Motion animations and custom components
- **TypeScript**: Full type safety throughout the application

### Core
- **Next.js 15.2.3** - React framework with App Router
- **React 19.0.0** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4.0.17** - Utility-first CSS framework

### Data & State Management
- **TanStack Query** - Data fetching and caching
- **Axios** - HTTP client
- **MockAPI.io** - Fake REST API for development

### UI & Animation
- **Framer Motion 12.7.4** - Smooth animations
- **Chart.js 4.5.0** & **react-chartjs-2** - Data visualization
- **Mantine Hooks** - Utility hooks
- **Lucide React** - Icon library

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Stylelint** - CSS linting


## 📁 Project Structure
├── app/ # Next.js App Router
│ ├── api/ # API routes
│ ├── challenge/ # Challenge page
│ ├── note/ # Notes page
│ └── layout.tsx # Root layout
├── src/
│ ├── @types/ # TypeScript type definitions
│ │ ├── env.d.ts
│ │ ├── mockapi.d.ts
│ │ └── ...
│ ├── components/ # Reusable UI components
│ │ ├── Header/
│ │ ├── LineChart/
│ │ ├── RingProgress/
│ │ ├── loading/
│ │ └── ui/
│ ├── constants/ # App constants and fake data
│ │ ├── fakeData.tsx
│ │ └── index.tsx
│ ├── global/ # Global styles and themes
│ │ ├── base.css
│ │ ├── theme.css
│ │ └── utilities.css
│ ├── hooks/ # Custom React hooks
│ │ ├── usePaginatedData.ts
│ │ ├── useProfile.tsx
│ │ └── useDiary.tsx
│ ├── providers/ # Context providers
│ │ ├── AOSProvider.tsx
│ │ └── tanstack-providers.tsx
│ ├── screens/ # Page components
│ │ ├── home.tsx
│ │ ├── challenge.tsx
│ │ └── note.tsx
│ └── utils/ # Utility functions
│ ├── cn.ts
│ ├── datetime.ts
│ └── localStorage.ts
├── public/ # Static assets
│ ├── images/
│ └── svgs/

## 🌐 Mock API Integration

The application uses MockAPI.io for development data:

- **Profile API**: `https://6892c589c49d24bce8684449.mockapi.io/profile`
- **Diary API**: `https://6892c589c49d24bce8684449.mockapi.io/diary`