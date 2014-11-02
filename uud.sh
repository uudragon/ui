# build app
rm -rf dist && grunt build
# tar dist
# tar -cf dist.tar dist
# upload to server
scp -P 10086 -r dist root@119.255.25.130:/home/uudragon/app/ui/app
# remove dist.tar
# rm dist.tar
# ssh to server
# ssh -p 10086 root@119.255.25.130
# deploy
# ssh root@119.255.25.130 '. deploy_ui.sh'
