# Assistive AI

An AI-powered assistive system for visually impaired users, leveraging zero-shot object detection with CLIP and OWL-ViT. Built with React Native, FastAPI, and Docker, with real-time audio feedback and scalable architecture.

## About the Project
This project was developed as part of the Machine Learning course in the Master of Science in Artificial Intelligence program. The goal is to create an accessible and efficient assistive technology that helps visually impaired users understand their surroundings through advanced AI-powered object detection and real-time audio feedback.

### Academic Context
- **Institution**: National College of Ireland
- **Program**: MS in Artificial Intelligence
- **Course**: Machine Learning
- **Semester**: Spring 2024

### Project Goals
- Implement zero-shot object detection for flexible and extensible object recognition
- Create an accessible mobile interface for visually impaired users
- Provide real-time audio feedback for detected objects
- Demonstrate practical application of machine learning in assistive technology

## Features
- Zero-shot object detection (ZSOD)
- CLIP + OWL-ViT integration
- Mobile + backend API architecture
- Real-time voice feedback
- Optional vector database (Qdrant)

## Tech Stack
React Native · FastAPI · Docker · HuggingFace Transformers · Qdrant · Scikit-learn

## Project Structure
```
assistive-ai/
├── app/                    # React Native mobile app
├── backend/               # FastAPI backend server
├── docker/               # Docker configuration files
├── Makefile              # Project automation commands
└── docker-compose.yml    # Docker services configuration
```

## Prerequisites
- Xcode (for iOS development)
- Docker
- Node.js and npm
- Python 3.8+

## Getting Started

1. **Initial Setup**
```bash
# Set up the project (installs dependencies and creates Docker volumes)
make setup
```

2. **Running the Services**
```bash
# Start all services
make up

# Stop all services
make stop

# Restart all services
make restart

# Kill and remove all containers
make kill
```

3. **Development Commands**
```bash
# View backend logs
make logs-backend

# Access backend shell
make shell-backend

# View app logs
make logs-app

# Access app shell
make shell-app
```

4. **Cleanup**
```bash
# Remove all containers, volumes, and build cache
make clean
```

## Running the Mobile App

1. **iOS Simulator**
```bash
cd app
npm install
npx expo start
# Press 'i' to open in iOS simulator
```

2. **Physical Device**
- Install Expo Go on your device
- Run `npx expo start`
- Scan the QR code with your device camera

## Environment Variables
Create `.env` files in both `app/` and `backend/` directories:

```env
# app/.env
EXPO_PUBLIC_API_URL=http://localhost:5000

# backend/.env
MODEL_PATH=./models
DEBUG=True
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
