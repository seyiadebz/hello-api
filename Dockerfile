# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --production 
#install only production dependencies

COPY . .

# Stage 2: Final, smaller image
FROM node:20-alpine AS production 
# Lean production image

#create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY --from=builder /app /app

# Switch to non-root user
USER appuser

#Document the port
EXPOSE 3000

# Health check built into image
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
   CMD node -e "require('http').get('http://localhost:3000/health', r => r.statusCode === 200 ? process.exit(0) : process.exit(1))"

# Start the App
CMD ["node", "server.js"]
