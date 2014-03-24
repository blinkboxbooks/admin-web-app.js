#!/bin/bash

# build
vagrant ssh-config | ssh -F /dev/stdin default 'cd /vagrant;npm install;bower install;grunt;cd /vagrant/web-app/server-web-app;npm install;grunt'

# use nginx 'dist' config and restart nginx
vagrant ssh-config | ssh -F /dev/stdin default 'sudo cp /vagrant/vagrant-conf/nginx/ci-conf/nginx.conf /usr/local/nginx/conf;sudo service nginx reload'

# start node app
vagrant ssh-config | ssh -F /dev/stdin default 'cd /vagrant/web-app/server-web-app;killall node;node app.js'

