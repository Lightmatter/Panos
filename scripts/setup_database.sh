#!/bin/bash

RESULT=`psql -l | grep "codereview" | wc -l | awk '{print $1}'`;
if test $RESULT -eq 0; then
    echo "Creating Database";
    psql -c "create role codereview with createdb encrypted password 'codereview' login;"
    psql -c "alter user codereview superuser;"
    psql -c "create database codereview with owner codereview;"
else
    echo "Database exists"
fi

#run initial setup of database tables
python manage.py migrate
