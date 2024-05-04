echo "Delete existing Ads container"

docker stop perfectpick_announcements_ms
docker rm perfectpick_announcements_ms

echo "Delete existing Ads image"

docker rmi perfectpick_announcements_ms

echo "Build image Ads"

docker build -t perfectpick_announcements_ms .

echo "running docker..."

docker run --network perfectpicknetwork -p 4000:4000 --name perfectpick_announcements_ms -e PORT=4000 -e DBPORT=3306 -e MySQL_USER=db_ads -e MySQL_PASSWORD=db_ads -e HOST=host.docker.internal  perfectpick_announcements_ms