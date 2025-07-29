# Noovix 🚀

**Generate beautiful web applications instantly with AI prompts**

Noovix is an AI-powered web application generator that transforms your ideas into fully functional, live web apps through simple text prompts. Built with Next.js 15, it leverages cutting-edge AI to create, preview, and share web applications in real-time.

## ✨ Features

- **AI-Powered Generation**: Transform natural language prompts into complete web applications
- **Live Preview**: See your generated apps running in real-time
- **Instant Sharing**: Share your creations with friends through unique URLs
- **Modern Stack**: Built with Next.js 15, React 19, and TypeScript
- **Code Interpretation**: Execute and preview code dynamically with E2B integration
- **Beautiful UI**: Responsive design with Tailwind CSS and Radix UI components
- **Authentication**: Secure user management with Clerk
- **Database**: Persistent storage with Prisma and PostgreSQL
- **Dark Mode**: Full theme support with next-themes

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with Turbopack
- **Frontend**: React 19, TypeScript, Tailwind CSS
- **UI Components**: Radix UI, Lucide Icons
- **Authentication**: Clerk
- **Database**: Prisma ORM
- **AI Integration**: E2B Code Interpreter
- **State Management**: TanStack Query, tRPC
- **Code Highlighting**: Prism.js
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database
- Clerk account for authentication
- E2B account for code interpretation

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Alisha-21-cloud/Noovix.git
cd Noovix
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in your environment variables:
```env
# Database
DATABASE_URL="your-postgresql-url"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
CLERK_SECRET_KEY="your-clerk-secret-key"

# E2B Code Interpreter
E2B_API_KEY="your-e2b-api-key"

# Inngest
INNGEST_EVENT_KEY="your-inngest-event-key"
INNGEST_SIGNING_KEY="your-inngest-signing-key"
```

4. Set up the database:
```bash
npx prisma migrate dev
npx prisma generate
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app running!

## 📖 How It Works

1. **Describe Your App**: Enter a natural language prompt describing the web application you want to create
2. **AI Generation**: Vibe's AI analyzes your prompt and generates the complete application code
3. **Live Preview**: See your app running instantly in the integrated preview
4. **Share & Collaborate**: Get a shareable URL to show your creation to others
5. **Iterate**: Refine your prompts to modify and improve your generated apps

## 🎯 Example Prompts

- "Create a todo app with dark mode and local storage"
- "Build a weather dashboard with charts and animations"
- "Make a portfolio website with a contact form"
- "Generate a calculator with a modern glassmorphism design"
- "Create a music player interface with playlist support"

## 🏗️ Project Structure

```
vibe/
├── src/
│   ├── app/              # Next.js 15 app directory
│   ├── components/       # Reusable UI components
│   ├── lib/             # Utility functions and configurations
│   ├── server/          # tRPC API routes and database logic
│   └── types/           # TypeScript type definitions
├── prisma/              # Database schema and migrations
├── public/              # Static assets
└── package.json         # Dependencies and scripts
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run postinstall` - Generate Prisma client

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vercel](https://vercel.com) for Next.js and deployment platform
- [Clerk](https://clerk.com) for authentication
- [E2B](https://e2b.dev) for code interpretation
- [Radix UI](https://radix-ui.com) for accessible components
- [Tailwind CSS](https://tailwindcss.com) for styling

