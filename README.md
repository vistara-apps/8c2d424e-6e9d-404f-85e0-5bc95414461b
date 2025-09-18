# EchoScribe - Base MiniApp

Never miss a meeting detail. Record, transcribe, and get action items automatically.

## Features

- **Calendar-Triggered Recording**: Automatically starts recording when joining meetings
- **High-Fidelity Audio Processing**: AI-powered noise reduction and audio enhancement
- **Automated Transcription & Summarization**: Convert speech to searchable text with AI summaries
- **Action Item & Decision Extraction**: Automatically identify tasks and decisions from meetings

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base network integration via MiniKit
- **UI**: Tailwind CSS with custom design system
- **Audio**: Web Audio API with MediaRecorder
- **AI**: OpenAI/Google Cloud/AssemblyAI for transcription

## Getting Started

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd echoscribe
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Add your API keys:
   - `NEXT_PUBLIC_MINIKIT_API_KEY`: Your MiniKit API key
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in Base App**:
   Navigate to `http://localhost:3000` in your Base App or compatible Farcaster client.

## Project Structure

```
app/
├── layout.tsx          # Root layout with providers
├── page.tsx           # Main application page
├── providers.tsx      # MiniKit and OnchainKit providers
├── globals.css        # Global styles and design tokens
└── loading.tsx        # Loading UI

components/
├── AppBar.tsx                # Navigation header
├── RecordingInterface.tsx    # Main recording controls
├── RecentRecordings.tsx      # Recording history
├── RecordingListItem.tsx     # Individual recording item
├── ActionItemChip.tsx        # Action item display
└── ui/
    ├── Button.tsx            # Reusable button component
    └── Sheet.tsx             # Modal/drawer component

lib/
├── types.ts           # TypeScript type definitions
├── utils.ts           # Utility functions
└── constants.ts       # App configuration constants
```

## Design System

The app uses a custom design system with semantic color tokens:

- **Colors**: Professional blue/teal palette with proper contrast
- **Typography**: Clear hierarchy with readable font sizes
- **Spacing**: Consistent 8px grid system
- **Motion**: Smooth transitions with cubic-bezier easing
- **Components**: Modular, reusable UI components

## Business Model

- **Micro-transactions**: Pay-per-meeting transcription ($0.10 per 10 minutes)
- **Free Tier**: 30 minutes per month
- **Premium**: $5/month for unlimited transcriptions

## API Integration

The app is designed to integrate with:

- **Transcription APIs**: OpenAI Whisper, Google Cloud Speech-to-Text, or AssemblyAI
- **Calendar APIs**: Google Calendar for automatic meeting detection
- **Base Chain**: For payment processing and usage tracking

## Development Notes

- Uses Next.js 15 App Router for optimal performance
- Mobile-first responsive design
- Proper error boundaries and loading states
- TypeScript for type safety
- Tailwind CSS for consistent styling

## Deployment

The app can be deployed to any platform supporting Next.js:

- Vercel (recommended)
- Netlify
- Railway
- Self-hosted

Make sure to set environment variables in your deployment platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
