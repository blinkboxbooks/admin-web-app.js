#!/usr/bin/env bash

echo "Provisioning web-dev VM"

# ---------------------------------------------
# nginx conf
# ---------------------------------------------
cp -a /vagrant/vagrant-conf/nginx/conf/. /usr/local/nginx/conf
cp /vagrant/vagrant-conf/nginx/init.d/nginx /etc/init.d/nginx
chmod 775 /etc/rc.d/init.d/nginx
chkconfig --add nginx
chkconfig nginx on
service nginx start

# ---------------------------------------------
# Redis conf
# ---------------------------------------------
mkdir -p /etc/redis
mkdir -p /var/redis

cp /vagrant/vagrant-conf/redis/conf/redis.conf /etc/redis/redis.conf
cp /vagrant/vagrant-conf/redis/init.d/redis-server /etc/init.d/redis-server
chmod 775 /etc/rc.d/init.d/redis-server

chkconfig --add redis-server
chkconfig redis-server on
service redis-server start

# -------------------------------------------------------------------------
# Allow gem installation without sudo e.g. for gems required by smoke tests
# -------------------------------------------------------------------------
chown -R vagrant:vagrant /usr/local/rvm/gems/*