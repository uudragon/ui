# build app
rm -rf dist && grunt build
# remove remote app directories
ssh root@119.255.25.130 -p 10086 'rm -rf /home/uudragon/app/ui/app'
# upload to server
scp -P 10086 -r dist root@119.255.25.130:/home/uudragon/app/ui/app
