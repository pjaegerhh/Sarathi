
# Sarathi

A modern React application with multi-language support, authentication, and community features.

## 🚀 Features

- **Multi-language Support**: Internationalization with multiple language support
- **Authentication**: Secure user authentication with Supabase
- **Community Features**: User profiles, stories, and community interactions
- **Admin Dashboard**: Administrative tools and user management
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Modern UI**: Built with Radix UI and Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Backend**: Supabase
- **Routing**: React Router DOM

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🌳 Branch Strategy

- **main**: Production-ready code (version bumps: +0.1.0)
- **testing**: Test environment (version bumps: +0.0.1)
- **pj-working**: Development branch (no automatic version bumps)

## 📋 Version Management

- Initial version: 1.0.0
- Automated version bumping based on branch
- Change tracking in `versioninfo.md`

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📁 Project Structure

```
src/
├── components/          # React components
├── contexts/           # React contexts
├── assets/            # Static assets
├── utils/             # Utility functions
├── styles/            # Global styles
└── supabase/          # Supabase configuration
```

## 🤝 Contributing

1. Work on the `pj-working` branch
2. Test changes on the `testing` branch
3. Merge to `main` for production releases

## 📄 License

This project is licensed under the MIT License.
  