.PHONY: help up down logs clean install migrate

help:
	@echo "GeoGuide Development Commands"
	@echo "============================="
	@echo "make up        - Start all services"
	@echo "make down      - Stop all services"
	@echo "make logs      - View logs"
	@echo "make clean     - Clean volumes and containers"
	@echo "make install   - Install dependencies"
	@echo "make migrate   - Run database migrations"

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

clean:
	docker-compose down -v
	rm -rf backend/node_modules frontend/node_modules

install:
	cd backend && npm install
	cd frontend && npm install

migrate:
	cd backend && npx prisma migrate dev
	cd backend && npx prisma generate
