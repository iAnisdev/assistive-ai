PROJECT_NAME=assistive_ai

# ===== GLOBAL COMMANDS (All Services) =====
PROJECT_NAME=assistive_ai

setup:
	@echo "🔧 Setting up project..."

	# Check for Xcode installation
	@if ! [ -d "/Applications/Xcode.app" ]; then \
		echo "❌ Xcode is not installed. Please install it from the App Store."; \
		exit 1; \
	fi

	# Check if Xcode is set as active developer directory
	@if [ "$$(xcode-select -p)" != "/Applications/Xcode.app/Contents/Developer" ]; then \
		echo "⚠️ Xcode CLI tools are set incorrectly."; \
		echo "🔁 Fixing with: sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer"; \
		sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer; \
	fi

	# Accept Xcode license (if not accepted)
	@sudo xcodebuild -license accept > /dev/null 2>&1 || true

	# Create Docker volume
	docker volume create $(PROJECT_NAME)_data

up:
	@echo "🚀 Starting all services..."
	docker-compose up --build -d

stop:
	@echo "🛑 Stopping all services..."
	docker-compose stop

kill:
	@echo "🔥 Killing and removing all containers..."
	docker-compose down

restart:
	@echo "🔄 Restarting all services..."
	make stop
	make up

clean:
	@echo "🧹 Cleaning all containers, volumes, networks, and build cache..."
	docker-compose down -v --rmi all --remove-orphans
	docker volume rm $(PROJECT_NAME)_data || true
	docker network rm $(PROJECT_NAME)_net || true

# ===== PLATFORM-SPECIFIC TOOLS =====

logs-backend:
	@echo "📜 Showing logs for backend..."
	docker-compose logs -f backend

shell-backend:
	@echo "🔧 Entering backend container shell..."
	docker exec -it assistive_backend /bin/bash || docker exec -it assistive_backend /bin/sh

logs-app:
	@echo "⚛️ Showing logs for app..."
	docker-compose logs -f app

shell-app:
	@echo "🧑‍💻 Entering app container shell..."
	docker exec -it assistive_app /bin/bash || docker exec -it assistive_app /bin/sh
