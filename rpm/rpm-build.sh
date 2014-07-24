#!/bin/bash

# This script builds an RPM of the admin web app within the web virtual machine and is
# designed to be triggered after the admin web app has been built and the 'dist' folder has been generated
#
# Before this script is executed, the environment variables SWA_REQUIRED_VERSION must be defined with a value of the
# version and build number of the SWA this version of the AWA is compatible with e.g. 1.0.0-42
# and also the d


AWA_HOME=/vagrant/admin-web-app
RPM_HOME=/home/vagrant/rpmbuild

# initialse RPM structure
rpmdev-setuptree

cd $AWA_HOME

# gather AWA version and build number
AWA_FULL_VERSION=$(grep -o '.\{0,0\}Admin Panel.\{0,12\}' dist/scripts/*.scripts.js | cut -d " " -f4)
AWA_VERSION=$(echo $AWA_FULL_VERSION | cut -d'-' -f1)
AWA_BUILD_NUMBER=$(echo $AWA_FULL_VERSION | cut -d'-' -f2)

# prepare for building the RPM

cp -r dist/ $RPM_HOME/SOURCES/admin-web-app-${AWA_VERSION}
cp -rv rpm/nginx/conf.d/* $RPM_HOME/SOURCES/admin-web-app-${AWA_VERSION}
cp -rv rpm/nginx/inc/* $RPM_HOME/SOURCES/admin-web-app-${AWA_VERSION}

cp rpm/awa.spec $RPM_HOME/SPECS

cd $RPM_HOME/SOURCES
tar czf admin-web-app-${AWA_VERSION}.tar.gz admin-web-app-${AWA_VERSION}/

# build the RPM
echo -e 'T3amcI7y@BbB\n' | setsid rpmbuild --sign -ba $RPM_HOME/SPECS/awa.spec \
--define "_gpg_path /vagrant/gpg.books.teamcity.dev" \
--define "_gpgbin /usr/bin/gpg" \
--define "_signature gpg" --define "_gpg_name TeamCity (Dirty Development Signing Key) <tm-books-itops@blinkbox.com>" \
--define "version $AWA_VERSION" --define "release $AWA_BUILD_NUMBER" \
--define "frontend_common_nginx_required_version $FRONTEND_COMMON_NGINX_REQUIRED_VERSION" \
--define "swa_required_version $SWA_REQUIRED_VERSION"

# copy the resulting RPM into the admin web app rpm folder for CI to pick up
cp $RPM_HOME/RPMS/noarch/admin-web-app-${AWA_VERSION}-${AWA_BUILD_NUMBER}.noarch.rpm $AWA_HOME/rpm

# Show RPM overview
rpm -qip $AWA_HOME/rpm/admin-web-app-${AWA_VERSION}-${AWA_BUILD_NUMBER}.noarch.rpm
