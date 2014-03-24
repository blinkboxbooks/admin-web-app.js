#!/bin/bash

# use nginx dev config and restart nginx
vagrant ssh-config | ssh -F /dev/stdin default 'sudo cp /vagrant/vagrant-conf/nginx/conf/nginx.conf /usr/local/nginx/conf;sudo service nginx reload'

# build and start node app
vagrant ssh-config | ssh -F /dev/stdin default 'cd /vagrant/web-app/server-web-app;npm install;killall node;node app.js' & # run in background but print to console

# start grunt server (live reload, watchers)
vagrant ssh-config | ssh -F /dev/stdin default 'cd /vagrant;npm install;bower install;grunt serve;'
