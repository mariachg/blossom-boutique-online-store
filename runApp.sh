#!/bin/bash

set -e 

command_exists () {
    command -v "$1" >/dev/null 2>&1
}

if ! docker info > /dev/null 2>&1; then
    echo "Docker is installed but not running. Please start Docker Desktop and rerun this script."
    exit 1
fi

if [ "$(docker ps -q -f name=local-mongo)" ]; then
    echo "MongoDB container 'local-mongo' is already running."
elif [ "$(docker ps -aq -f status=exited -f name=local-mongo)" ]; then
    echo "▶Restarting existing MongoDB container..."
    docker start local-mongo
else
    echo "Starting a new MongoDB container..."
    docker run --name local-mongo -d -p 27017:27017 mongo
fi

if ! command_exists mongorestore; then
    echo "Installing MongoDB database tools with Homebrew..."
    brew tap mongodb/brew
    brew install mongodb-database-tools
fi

echo "Populating MongoDB database with seed data..."
mongorestore --uri="mongodb://localhost:27017/e-commerce" backend/db/store_data/e-commerce

echo "Installing npm dependencies..."
for dir in frontend backend admin; do
  echo "Installing in $dir..."
  (cd $dir && npm install)
done

trap 'echo "Stopping services..."; kill 0; exit' SIGINT

echo "Starting all services..."
(cd backend && node index.js) &
(cd frontend && npm start) &
(cd admin && npm run dev) &

wait
