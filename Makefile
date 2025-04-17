PROJECT_NAME=assistive_ai

# ===== GLOBAL COMMANDS (All Services) =====

setup:
	@echo "🔧 Setting up project..."
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
