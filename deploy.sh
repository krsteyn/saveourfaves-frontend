#! /bin/bash
npm install -y
npm run build
docker exec saveourfaves-server_frontend_1 nginx -s reload
