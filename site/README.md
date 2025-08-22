## Prerequisites

- [Node and NPM](https://nodejs.org/)
- Python 3 (for local development server)

## Running locally

⚠️ **Node.js Compatibility Note**: This project requires Node.js legacy OpenSSL support due to outdated dependencies.

```bash
# Navigate to the site directory
cd site

# Install dependencies
npm install

# Set Node.js compatibility flag (required)
export NODE_OPTIONS="--openssl-legacy-provider"

# Build CSS and JavaScript assets
npm run build:assets

# Build the site templates
npx @11ty/eleventy@0.8.3

# Start local development server
cd dist && python3 -m http.server 8080
```

The site will be available at http://localhost:8080

## Development Workflow

When making changes:

1. **Template changes** (`.njk`, `.md` files): Run `npx @11ty/eleventy@0.8.3` to rebuild
2. **CSS/JS changes**: Run `npm run build:assets` to rebuild assets
3. **Both**: Run both commands, then refresh browser

## Quick Start Script

```bash
# From the site directory
export NODE_OPTIONS="--openssl-legacy-provider"
npm run build:assets && npx @11ty/eleventy@0.8.3
cd dist && python3 -m http.server 8080
```

## Troubleshooting

- **"Cannot find module" errors**: Run `npm install`
- **CSS not loading**: Run `npm run build:assets`
- **Templates not updating**: Run `npx @11ty/eleventy@0.8.3`
- **Server won't start**: Kill existing processes with `pkill -f "python.*8080"`

