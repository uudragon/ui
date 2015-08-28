# build app
rm -rf dist && grunt build
# remove remote app directories
ssh root@106.2.166.234 -p 10086 'rm -rf /home/uudragon/app/ui/app'
# upload to server
scp -P 10086 -r dist root@106.2.166.234:/home/uudragon/app/ui/app
