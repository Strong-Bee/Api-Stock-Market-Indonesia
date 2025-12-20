# QuantumStock API Documentation Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)

**Enterprise-grade Stock Market API Documentation Platform**

[Live Demo](#) • [Documentation](https://docs.quantumstock.com) • [API Reference](#)

</div>

## 📋 Overview

QuantumStock API Documentation Platform adalah landing page modern dan profesional untuk mendokumentasikan API saham dengan tema dark mode. Platform ini dirancang khusus untuk menampilkan data finansial real-time dengan antarmuka yang intuitif dan performa tinggi.

## ✨ Features

### 🎨 **Modern Dark Theme**

- **Glassmorphism Design** dengan efek transparansi dan blur
- **Neon Gradient Accents** (cyan, emerald, purple)
- **Smooth Animations** dan micro-interactions
- **Responsive Design** untuk semua perangkat

### 📊 **Market Data Display**

- Real-time market overview dengan data saham
- Top gainers/losers tracking
- Major indices monitoring (IHSG, LQ45, S&P 500, NASDAQ)
- Market statistics dengan visualisasi

### 🔧 **API Documentation**

- Interactive API endpoints dengan expandable details
- Code examples dalam berbagai bahasa
- Rate limiting dan authentication info
- Copy endpoint functionality

### 🚀 **Developer Experience**

- SDK examples untuk Python, JavaScript, Node.js
- API playground integration
- WebSocket streaming demos
- Postman collection ready

## 🛠️ Tech Stack

### Core Framework

- **Next.js 16.1.0** - React framework dengan App Router
- **React 19.2.3** - UI library terbaru
- **TypeScript 5.9.3** - Type safety dan developer experience

### Styling & UI

- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Icon library yang konsisten
- **Custom CSS Animations** - Smooth transitions dan effects

### Data & API

- **Yahoo Finance 2** - Stock market data integration
- **Recharts** - Data visualization
- **RSS Parser** - Market news integration

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Font Optimization** - Custom font loading

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm atau yarn
- API key untuk Yahoo Finance (opsional)

### Installation

1. **Clone repository**

```bash
git clone https://github.com/yourusername/quantumstock-api-docs.git
cd quantumstock-api-docs
```

2. **Install dependencies**

```bash
npm install
# atau
yarn install
```

3. **Setup environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` dengan konfigurasi API Anda:

```env
NEXT_PUBLIC_API_URL=https://api.quantumstock.com
# Tambahkan API keys jika diperlukan
```

4. **Run development server**

```bash
npm run dev
# atau
yarn dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
quantumstock-api-docs/
├── app/
│   ├── layout.tsx              # Root layout dengan metadata
│   ├── page.tsx                # Homepage utama
│   ├── globals.css             # Global styles dan animations
│   └── api/                    # API routes (jika ada)
├── components/
│   ├── Header.tsx              # Navigation header
│   ├── Footer.tsx              # Site footer
│   ├── HeroSection.tsx         # Hero section dengan CTA
│   ├── MarketOverview.tsx      # Real-time market data
│   ├── ApiFeatures.tsx         # Feature showcase
│   ├── ApiList.tsx             # Interactive API documentation
│   ├── IntegrationShowcase.tsx # SDK dan code examples
│   └── CTA.tsx                 # Call-to-action section
├── public/
│   ├── favicon.ico
│   └── images/                 # Static assets
├── lib/                        # Utility functions
├── types/                      # TypeScript definitions
└── config/                     # Configuration files
```

## 🎯 Key Components

### 1. Header (`components/Header.tsx`)

- Responsive navigation dengan glassmorphism effect
- Real-time market indicator
- User profile dan notifications

### 2. Market Overview (`components/MarketOverview.tsx`)

- Live market data display
- Interactive tabs untuk indices/gainers/losers
- API code examples

### 3. API Documentation (`components/ApiList.tsx`)

- Expandable API endpoint cards
- Method badges (GET, POST, WebSocket)
- Rate limiting info
- Copy-to-clipboard functionality

### 4. Integration Showcase (`components/IntegrationShowcase.tsx`)

- Multi-language code examples
- Technology stack display
- Developer tools integration

## 🎨 Customization

### Theme Configuration

Edit `app/globals.css` untuk custom styling:

```css
:root {
  --primary-gradient: linear-gradient(
    135deg,
    #60a5fa 0%,
    #8b5cf6 50%,
    #ec4899 100%
  );
  --glass-opacity: 0.7;
  --border-radius: 1rem;
}
```

### Brand Colors

Update `tailwind.config.js` untuk custom color scheme:

```javascript
theme: {
  extend: {
    colors: {
      brand: {
        primary: '#0ea5e9',
        secondary: '#8b5cf6',
        accent: '#ec4899'
      }
    }
  }
}
```

### API Endpoints

Modify `components/ApiList.tsx` untuk menambah/update API documentation:

```typescript
const apiEndpoints: ApiEndpoint[] = [
  {
    id: 1,
    name: "Your API Name",
    description: "API description here",
    method: "GET",
    endpoint: "/api/v1/your-endpoint",
    category: "Category",
    latency: "<100ms",
    requiresAuth: true,
    rateLimit: "1000/hour",
    features: ["Feature 1", "Feature 2"],
  },
];
```

## 📱 Responsive Design

Platform ini sudah dioptimalkan untuk:

- **Desktop**: Layout penuh dengan sidebar
- **Tablet**: Grid layout dengan spacing optimal
- **Mobile**: Single column dengan touch-friendly interactions

### Breakpoints:

- `sm`: 640px (mobile)
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)
- `xl`: 1280px (large desktop)

## 🔌 API Integration

### Real-time Data

```javascript
// Contoh penggunaan WebSocket API
import { QuantumStock } from "@quantumstock/sdk";

const client = new QuantumStock({ apiKey: "your-key" });
const stream = client.websocket.subscribe(["BBCA.JK", "TLKM.JK"]);

stream.on("quote", (data) => {
  console.log(`${data.symbol}: ${data.price}`);
});
```

### Historical Data

```javascript
// Contoh fetch data historis
const historical = await client.historical.get({
  symbol: "BBCA.JK",
  interval: "1d",
  start: "2024-01-01",
  end: "2024-03-15",
});
```

## 🧪 Testing

### Development Testing

```bash
# Run ESLint
npm run lint

# Type checking
npx tsc --noEmit

# Development server
npm run dev
```

### Production Testing

```bash
# Build untuk production
npm run build

# Preview build
npm run start

# Lighthouse audit
npx lighthouse http://localhost:3000 --view
```

## 📈 Performance

### Optimizations:

- **Image Optimization**: Next.js Image component
- **Font Optimization**: Next.js Font optimization
- **Code Splitting**: Automatic dengan Next.js
- **Bundle Analysis**: Built-in analyzer

### Performance Metrics:

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

## 🔒 Security

### Implemented Security Features:

- **Content Security Policy** (CSP) headers
- **XSS Protection** dengan React
- **API Key Security** best practices
- **Environment Variables** untuk sensitive data

### Best Practices:

- Selalu gunakan HTTPS
- Validasi semua user inputs
- Implement rate limiting
- Regular security audits

## 🤝 Contributing

Kami menyambut kontribusi! Berikut cara untuk berkontribusi:

1. **Fork repository**
2. **Create feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open Pull Request**

### Development Guidelines:

- Ikuti TypeScript best practices
- Gunakan ESLint untuk code consistency
- Tulis unit tests untuk new features
- Update documentation sesuai perubahan

## 📄 License

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 🆘 Support

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Issues & Bugs

Jika Anda menemukan bug atau memiliki pertanyaan:

1. Check [existing issues](https://github.com/yourusername/quantumstock-api-docs/issues)
2. Open [new issue](https://github.com/yourusername/quantumstock-api-docs/issues/new)
3. Provide detailed description dan reproduction steps

### Community

- [GitHub Discussions](https://github.com/yourusername/quantumstock-api-docs/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/quantumstock-api)

## 🏢 Enterprise Support

Untuk enterprise customers, kami menyediakan:

- **Priority Support**: 24/7 technical support
- **Custom Integration**: Dedicated engineering team
- **SLA Guarantee**: 99.99% uptime SLA
- **Security Audit**: Regular security assessments

Hubungi: enterprise@quantumstock.com

## 📊 Analytics & Monitoring

Platform ini sudah terintegrasi dengan:

- **Vercel Analytics** untuk performance monitoring
- **Sentry** untuk error tracking
- **Google Analytics** untuk user analytics
- **Custom Dashboards** untuk API usage

## 🔄 Updates & Changelog

### Version 2.1.0 (Current)

- ✅ WebSocket API support
- ✅ Real-time market data streaming
- ✅ Dark mode theme improvements
- ✅ Performance optimizations

### Version 2.0.0

- ✅ Next.js 16 migration
- ✅ Tailwind CSS 4 upgrade
- ✅ TypeScript strict mode
- ✅ New API documentation system

[View Full Changelog](CHANGELOG.md)

## 🙏 Acknowledgements

- [Next.js Team](https://nextjs.org) untuk framework yang luar biasa
- [Tailwind CSS](https://tailwindcss.com) untuk utility-first CSS
- [Lucide Icons](https://lucide.dev) untuk icon set yang konsisten
- [Yahoo Finance API](https://github.com/gadicc/node-yahoo-finance2) untuk data saham

---

<div align="center">

**Dibuat dengan ❤️ oleh [Nama Anda/Tim Anda]**

[![Twitter Follow](https://img.shields.io/twitter/follow/quantumstock?style=social)](https://twitter.com/quantumstock)
[![GitHub Stars](https://img.shields.io/github/stars/yourusername/quantumstock-api-docs?style=social)](https://github.com/yourusername/quantumstock-api-docs)

_"Empowering financial innovation with real-time market data"_

</div>
#   Q u a n t u m S t o c k - A P I  
 