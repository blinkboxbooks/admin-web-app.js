
Name: admin-web-app
Version: %{version}
Release: %{release}
Summary: %{name} rpm
Source0: %{name}-%{version}.tar.gz
Group: Applications/Internet
License: Various
Vendor: blinkbox books
BuildArch: noarch
BuildRoot: %{_tmppath}/%{name}-buildroot
Requires: server-web-app >= %{swa_required_version}
Requires: frontend-common-nginx >= %{frontend_common_nginx_required_version}

%description
Admin Web App based on AngularJS

%prep

%setup -q

%build

%install

ls -l

# nginx config
%{__mkdir} -p %{buildroot}%{_sysconfdir}/nginx/conf.d
%{__mkdir} -p %{buildroot}%{_sysconfdir}/nginx/inc

%{__install} frontend_admin.conf %{buildroot}%{_sysconfdir}/nginx/conf.d
%{__install} frontend_admin.inc  %{buildroot}%{_sysconfdir}/nginx/inc

# client web app
%{__install} -d %{buildroot}%{_localstatedir}/www/admin
%{__cp} -r * %{buildroot}%{_localstatedir}/www/admin

%clean
rm -rf %{buildroot}

%post

%files
%defattr(0644, root, root, 0755)
%{_localstatedir}/www/admin/*
%{_sysconfdir}/nginx/conf.d
%{_sysconfdir}/nginx/inc
%config(noreplace) %{_sysconfdir}/nginx/conf.d/frontend_admin.conf
%config(noreplace) %{_sysconfdir}/nginx/inc/frontend_admin.inc
