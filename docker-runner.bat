docker build -t clientcatalog .
docker run -d --name clientcatalog -p 3000:8080 --hostname clientcataloghost --network catalogo-net  --env-file .env.production clientcatalog
