#!/bin/bash

# create a data dir
mkdir data

# create your mongod file that works with cloud 9
echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' >> mongod

# change permissions of dir to be executable to owner, group, all,
# regardless of previous permissions

chmod a+x mongod

# run it

#./mongod

# open a new tab to access it
# mongo