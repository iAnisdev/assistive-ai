PROJECT_NAME=assistive_ai

setup:
	@echo "🔧 Setting up project..."
	docker volume create $(PROJECT_NAME)_data

up:
	@echo "🚀 Starting backend..."
	docker-compose up --build -d

stop:
	@echo "🛑 Stopping backend..."
	docker-compose stop

kill:
	@echo "🔥 Killing and removing containers..."
	docker-compose down

restart:
	@echo "🔄 Restarting backend..."
	make stop
	make up

clean:
	@echo "🧹 Cleaning all containers, volumes, networks, and build cache..."
	docker-compose down -v --rmi all --remove-orphans
	docker network rm $(PROJECT_NAME)_net || true
	docker volume rm $(PROJECT_NAME)_data || true
