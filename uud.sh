# build app
rm -rf dist && grunt build
# remove remote app directories
ssh root@120.26.118.251 -p 10086 'rm -rf /home/uudragon/app/ui/app'
# upload to server
scp -P 10086 -r dist root@120.26.118.251:/home/uudragon/app/ui/app
