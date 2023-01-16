

dep/build.sh

dep/deploy.sh
path="/root/webrtc/app"

ips=("139.224.228.200")

for ip in ${ips[*]}
do

scp -i /c/work/jujiu/ssh/pem/jujiu.pem ./frontend.tar.gz root@${ip}:${path}
scp ./frontend.tar.gz root@${ip}:${path}

ssh -i /c/work/jujiu/ssh/pem/jujiu.pem root@${ip}  << deploy

cd ${path}

# rm -rf ./frontend
tar -xzvf frontend.tar.gz

chown -R  root frontend
chgrp -R  root frontend

cd frontend

pm2 delete pm2.json5
rm package-lock.json
npm i --legacy-peer-deps
pm2 start pm2.json5

exit
deploy

done


dep/flush.sh