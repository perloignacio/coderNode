call forever start index.js --port=8081
echo "Se inicio el servidor con forever"
pause
call forever list
echo "Se listan los procesos activo"
pause
tasklist /fi "imagename eq node.exe"

call pm2 start index.js --name="servernode 8083" --watch  --node-args="index.js --port=8083"
call pm2 start index.js --name="servernode 8084" --watch  --node-args="index.js --port=8084"
call pm2 start index.js --name="servernode 8085" --watch  --node-args="index.js --port=8085"
call pm2 start index.js --name="servernode 8086" --watch  --node-args="index.js --port=8086"
echo "Se inicio el servidor con pm2"
pause
call pm2 list
echo "Se listan los procesos activo"
pause
tasklist /fi "imagename eq node.exe"
pause
call pm2 delete all
pause
call pm2 start index.js --name="servernode" --watch -i max --node-args="index.js --port=8082"
echo "Se inicio el servidor con pm2 en modo cluster" 
pause
call pm2 list
echo "Se listan los procesos activo"
pause
tasklist /fi "imagename eq node.exe"
pause



