A Todo list management system just to POC docker containerization and docker compose.

## Documentation 
Run following command to start. make sure your `80` port is open.

```docker compose up```

Check containers using following command

```docker ps```

After any change if fails, try `docker compose up --build -d --remove-orphans --force-recreate`
