git clone https://github.com/roy-lau/vue.git --depth 1 -b app-music-mobile  app-music-mobile
cd app-music-mobile
yarn 
cd ..
git clone https://github.com/roy-lau/vue.git --depth 1 -b fund-back fund-back
cd fund-back/server
yarn
cd ../..
git clone git@github.com:roy-lau/vue.git --depth 1 -b fund-oracle fund-oracle
cd fund-oracle
yarn && yarn build
cd ..
git clone git@github.com:roy-lau/vue.git --depth 1 -b jdjr jdjr
cd jdjr
npm i && npm run build --mode dev
cd ..
git clone git@github.com:roy-lau/vue.git --depth 1 -b mall mall
cd mall
yarn && yarn build 
cd ..
git clone git@github.com:roy-lau/vue.git --depth 1 -b mt-pc mt-pc
cd mt-pc
yarn && yarn build
cd ..
