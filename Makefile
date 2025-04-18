PROJECT_NAME=assistive_ai

# ===== GLOBAL COMMANDS (All Services) =====
PROJECT_NAME=assistive_ai

setup:
	@echo "🔧 Setting up project..."


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
	make stop
	make kill
	@echo "🧹 Cleaning all containers, volumes, networks, and build cache..."
	docker-compose down -v --rmi all --remove-orphans
	docker volume rm $(PROJECT_NAME)_data || true

go:
	@echo "🚀 Starting all services..."
	make setup
	make up

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
