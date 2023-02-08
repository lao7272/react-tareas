### Como correr nginx pm2 y forever 

Comandos por cmd de FOREVER: 
    MODO CLUSTER: forever start server.js --watch <puerto> <modo>
    MODO FORK: forever start server.js --watch  <puerto> 
Comandos por cmd de PM2: 
    MODO CLUSTER:   pm2 start src/server.js --name="CLUSTER SERVER" --watch -- <puerto> <modo>
    OTRA OPCION PARA MODO CLUSTER:   pm2 start src/server.js --name="CLUSTER SERVER" --watch -i max  -- <puerto> 
    MODO FORK:   pm2 start src/server.js --name="FORK SERVER" --watch -- <puerto>

Para corre nginx: 

    Para correr el hilo principal:  pm2 start src/server.js --name="FORK SERVER" --watch -- 8080 

    Para correr la ruta random:
    pm2 start src/server.js --name="CLUSTER SERVER" --watch -- 8081 CLUSTER 
    pm2 start src/server.js --name="FORK SERVER1" --watch -- 8082
    pm2 start src/server.js --name="FORK SERVER2" --watch -- 8083
    pm2 start src/server.js --name="FORK SERVER3" --watch -- 8084
    pm2 start src/server.js --name="FORK SERVER4" --watch -- 8085

    