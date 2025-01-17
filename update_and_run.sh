killall screen
sudo certbot renew
git pull
npm run build
screen -d -m npm start