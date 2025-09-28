# Frontend - React + Vite
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy frontend code
COPY . .

# Expose port
EXPOSE 8175

# Run development server
CMD ["npm", "run", "dev", "--", "--host"]
