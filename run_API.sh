docker build -t perfectpick_announcements_ms .
docker run -p 4000:4000 --name perfectpick_announcements_ms -e PORT=4000 -e DBPORT=3306 -e MySQL_USER=db_ads -e MySQL_PASSWORD=db_ads -e HOST=host.docker.internal  perfectpick_announcements_ms