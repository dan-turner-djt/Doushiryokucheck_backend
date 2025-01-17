killall screen
sudo certbot renew
git pull
npm install
npm run build
screen -d -m npm start