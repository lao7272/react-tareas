 ARTILLERY 

// artillery quick --count 20 --num 50 http://localhost:8080/info/sin-comprimir --output info-log-artillery.txt 


PROFILING 
node --prof src/server.js
info-log
node --prof-process info-log.log > info-log.txt


AUTOCANNON

node src/performance/benchmark.js

0X

0x src/server.js 8080


CONCLUSION 

En conclusion, como hemos visto en clase, las funciones asincronas y los callbacks son mucho mas optimos a la hora de correr la aplicacion.

