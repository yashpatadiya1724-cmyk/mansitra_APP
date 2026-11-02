FROM node:20-alpine AS runner

WORKDIR /app

# Install production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose backend port
EXPOSE 3001

ENV NODE_ENV=production
ENV PORT=3001

USER node

CMD ["node", "server.js"]
