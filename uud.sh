# build app
rm -rf dist && grunt build
# tar dist
tar -cf dist.tar dist
# upload to server
scp -P 10086 dist.tar root@119.255.25.130:/home/uudragon/app/ui
# remove dist.tar
rm dist.tar
# ssh to server
ssh -p 10086 root@119.255.25.130
# deploy
. deploy_ui.sh
