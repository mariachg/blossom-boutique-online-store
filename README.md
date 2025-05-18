## To run the application locally, do the following:

- Install docker 

```
brew install --cask docker
```

- Install MongoDB using docker

```
docker run --name local-mongo -d -p 27017:27017 mongo
```

- Install MongoDB database tools

```
brew tap mongodb/brew
brew install mongodb-database-tools
```

- Populate the MongoDB collections used by the application

```
mongorestore --uri="mongodb://localhost:27017/e-commerce" backend/db/store_data/e-commerce
```