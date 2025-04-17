FROM node:20

# Set working directory
WORKDIR /app

# Do NOT install global expo-cli anymore
# Just install dependencies
COPY app/package*.json ./
RUN npm install

# Copy rest of the app
COPY app/ .

# Expose needed ports
EXPOSE 19000 19001 19002 8081

# Use npx expo to start (tunnel mode)
CMD ["npx", "expo", "start", "--tunnel"]
