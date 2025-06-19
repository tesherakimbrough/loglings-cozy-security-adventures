
# 🌱 Loglings: Cozy Cybersecurity Forest 🌿

A magical, cozy cybersecurity learning game where you explore the enchanted forest while mastering threat detection and log analysis. Join the Loglings on their journey to protect the digital woodland!

![Forest Badge](https://img.shields.io/badge/Status-Beta%20Grove-8bc97a)
![Learning Badge](https://img.shields.io/badge/Learning-Cybersecurity-f6d976)
![Theme Badge](https://img.shields.io/badge/Theme-Cozy%20Forest-a8c2a0)
![Platform Badge](https://img.shields.io/badge/Platform-Web%20Browser-blue)

## 🌸 What is Loglings?

Loglings transforms the traditionally intimidating world of cybersecurity into a warm, welcoming forest adventure. Through gentle gameplay and cozy aesthetics, players learn to:

- 🔍 Analyze security logs and identify threats
- 🛡️ Assess risk levels in realistic scenarios  
- 📊 Understand cybersecurity patterns
- 🌱 Build confidence in digital security

**Platform**: Web-based game accessible through any modern browser
**Current Status**: Open Beta - Play immediately at [your-app-url.lovable.app](https://your-app-url.lovable.app)

Perfect for beginners and seasoned professionals who want a more mindful approach to cybersecurity education.

## 🎮 How to Play Right Now

### Instant Play (No Installation Required)
1. Visit [your-app-url.lovable.app](https://your-app-url.lovable.app) in your web browser
2. Choose your adventure mode:
   - **🏠 Cozy Everyday**: Gentle learning with extended time limits
   - **⚡ Forest Challenge**: Faster-paced scenarios for confident learners
3. Start analyzing log entries and making security decisions
4. Watch your forest grove grow as you learn!

### What Happens When You Play
Each scenario presents you with a realistic log entry like this:

```
🌲 Cozy Log Story Example:
---
Time: 2024-01-15 14:23:07
Source: web-server-01.enchanted-corp.com
Event: Multiple failed login attempts detected
User: admin@enchanted-corp.com
IP: 192.168.1.100 (Internal Network)
Attempts: 5 failed logins in 2 minutes

Your forest wisdom is needed: Is this a threat? 🤔
```

You'll assess the risk level and learn why certain patterns matter in cybersecurity.

## ✨ Forest Features

### 🎮 Core Gameplay
- **Real Log Analysis**: Work with authentic cybersecurity scenarios
- **Adaptive Difficulty**: The forest grows with you - scenarios adjust to your skill level
- **Contextual Learning**: Real-world cybersecurity scenarios in a cozy setting
- **Progressive Mastery**: Multiple difficulty levels from beginner to advanced
- **Streak System**: Build momentum with consecutive correct answers

### 🎨 Cozy Experience
- **Forest Aesthetic**: Warm colors, gentle animations, and magical elements
- **Ambient Audio**: Soothing forest sounds and cozy background music
- **Accessibility**: Full keyboard navigation and screen reader support
- **Mindful Design**: Stress-free learning environment

### 📈 Progress & Growth
- **Achievement System**: Unlock forest badges and celebrate milestones
- **Daily Challenges**: Fresh scenarios to keep your skills sharp
- **Learning Paths**: Guided journeys through cybersecurity topics
- **Progress Tracking**: Visual representation of your forest journey

## 🚀 Quick Start for Players

### System Requirements
- **Browser**: Chrome 80+, Firefox 75+, Safari 13+, or Edge 80+
- **Internet**: Stable connection required
- **Optional**: Headphones for full cozy audio experience

### Getting Started
1. **Play Now**: Visit the live game at [your-app-url.lovable.app](https://your-app-url.lovable.app)
2. **Choose Your Path**: Select Cozy Everyday for gentle learning or Forest Challenge for faster gameplay
3. **Complete Tutorial**: Follow the friendly Logling guides through your first scenarios
4. **Track Progress**: Create an account to save your forest journey (optional)

### Early Access & Waitlist
- **Current Status**: Open Beta - anyone can play immediately
- **Waitlist Benefits**: Join for updates on new features and premium content
- **Premium Features**: Advanced learning paths and extended content library (coming soon)

## 🛠️ Developer Setup

### Prerequisites
- **Node.js**: Version 18 or higher ([Download here](https://nodejs.org/))
- **Package Manager**: npm (included with Node.js) or bun
- **Supabase Account**: For backend features ([Sign up free](https://supabase.com))

### Local Development Setup

```bash
# 1. Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Configure Supabase (see Environment Setup below)
# Edit .env.local with your Supabase credentials

# 5. Start development server
npm run dev

# 6. Open your browser
# Navigate to http://localhost:8080
```

### Environment Setup

Create a `.env.local` file with your Supabase configuration:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

**Getting Supabase Credentials:**
1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → API
4. Copy your Project URL and anon public key
5. Paste them into your `.env.local` file

### Database Setup
The game uses Supabase for user profiles, progress tracking, and game sessions:

```sql
-- Key tables created automatically:
-- profiles: User information and preferences
-- user_progress: Learning progress and achievements  
-- game_sessions: Individual game session data
-- user_preferences: Audio, accessibility, and display settings
```

Run the included Supabase migrations to set up the database schema.

## 🌍 Deployment Options

### Option 1: Quick Deploy with Lovable (Recommended)
1. Open your [Lovable Project](https://lovable.dev/projects/df4af8dc-1c12-4dd5-bf66-0663e3f87d73)
2. Click **Share → Publish**
3. Your forest is live instantly! 🎉

### Option 2: Self-Hosting
Deploy the standard React app to any hosting platform:

**Vercel:**
```bash
npm install -g vercel
vercel --prod
```

**Netlify:**
```bash
npm run build
# Upload dist/ folder to Netlify
```

**Manual Deployment:**
```bash
npm run build
# Upload dist/ folder to your web server
```

### Custom Domain Setup
- **Lovable**: Connect custom domains in Project → Settings → Domains (requires paid plan)
- **Self-hosted**: Configure DNS records with your hosting provider

## 🛠️ Tech Forest

Built with modern, cozy technologies:

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS + Custom Cozy Theme
- **UI Components**: Shadcn/ui for consistent design
- **Build Tool**: Vite for fast development
- **Backend**: Supabase (Authentication, Database, Real-time)
- **Audio**: Howler.js for ambient forest sounds
- **Charts**: Recharts for progress visualization
- **Routing**: React Router for navigation
- **State Management**: React Query for data fetching

## 🎯 Learning Content

### Scenario Types
- **Authentication Logs**: Suspicious login patterns, brute force attempts
- **Network Traffic**: Unusual connections, data exfiltration indicators
- **System Events**: File modifications, privilege escalations
- **Application Logs**: Error patterns, injection attempts
- **Infrastructure**: Server health, performance anomalies

### Example Learning Scenario

```
🔍 Forest Scenario: "The Midnight Visitor"

Log Entry:
2024-01-15 02:47:33 | auth-server | LOGIN_ATTEMPT
User: backup-admin | IP: 203.0.113.42 | Status: SUCCESS
Previous failed attempts: 15 | Location: Romania
Last successful login: 45 days ago | Normal hours: 9AM-5PM EST

Your Assessment Options:
🟢 Low Risk - Legitimate late-night maintenance
🟡 Medium Risk - Unusual but potentially normal
🟠 High Risk - Suspicious pattern requiring investigation
🔴 Critical Risk - Likely security incident

Learning Outcome: Understanding normal vs. abnormal user behavior patterns
```

### Difficulty Progression
- **Beginner Grove**: Clear indicators, guided explanations
- **Learning Path**: Contextual hints and immediate feedback
- **Forest Ranger**: Complex scenarios with multiple factors
- **Master Guardian**: Real-world complexity and edge cases

## 🤝 Contributing to the Forest

### For Players
- **Bug Reports**: Use the in-game feedback system
- **Feature Requests**: Share ideas through the feedback collection
- **Beta Testing**: Help us improve through active play and feedback

### For Developers
```bash
# Development workflow
git checkout -b feature/your-feature-name
npm run dev
# Make your changes
npm run build  # Ensure it builds
npm run test   # Run any tests
git commit -m "Add cozy feature"
git push origin feature/your-feature-name
# Create pull request
```

### Content Creators
Help expand our scenario library:
- Create realistic log scenarios
- Develop learning paths for specific topics
- Contribute to accessibility features
- Enhance cozy aesthetic elements

## 📖 Documentation & Support

- **Player Guide**: [In-game tutorial and help system]
- **Developer Docs**: [Lovable Platform Documentation](https://docs.lovable.dev/)
- **API Reference**: Check `src/types/` for TypeScript definitions
- **Community Support**: [Discord Community](https://discord.com/channels/1119885301872070706/1280461670979993613)

### Troubleshooting Common Issues

**Game won't load:**
- Check browser compatibility (Chrome 80+, Firefox 75+)
- Disable ad blockers temporarily
- Clear browser cache and cookies

**Audio not working:**
- Check browser audio permissions
- Ensure autoplay is enabled for the site
- Try refreshing the page

**Progress not saving:**
- Create an account for persistent progress
- Check internet connection
- Verify Supabase connection in developer tools

## 🌟 Community & Support

- **Discord**: [Lovable Community](https://discord.com/channels/1119885301872070706/1280461670979993613)
- **Bug Reports**: In-game feedback system or GitHub Issues
- **Feature Requests**: Community Discord or feedback system
- **Developer Support**: Lovable documentation and community

## 📊 Project Status

- ✅ **Core Gameplay**: Fully functional log analysis scenarios
- ✅ **Cozy Experience**: Complete aesthetic and audio system
- ✅ **Progress Tracking**: User accounts and achievement system
- 🚧 **Premium Features**: Advanced learning paths (in development)
- 🚧 **Mobile Optimization**: Enhanced mobile experience (coming soon)
- 📋 **Planned**: Multiplayer forest exploration, advanced analytics

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Lovable Platform** - Making cozy development possible
- **Supabase** - Powering our backend forest infrastructure  
- **Forest Community** - Beta testers and feedback providers
- **Cybersecurity Educators** - Inspiring accessible security education
- **Open Source Contributors** - Building a better digital forest together

---

<div align="center">

**Ready to begin your forest journey?** 🌱

[🎮 Start Playing Now](https://your-app-url.lovable.app) | [📧 Join Updates](./src/pages/Waitlist.tsx) | [💻 Contribute](./CONTRIBUTING.md)

*Made with 🌿 for a more accessible cybersecurity world*

**Version**: Beta Grove | **Last Updated**: December 2024

</div>
