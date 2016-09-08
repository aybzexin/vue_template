#!/usr/bin/env bash


### Step1 build出最新的 dist/release , 且构造多入口文件

gulp deploy-prepare --release true;

./bin/rigger_conf.sh lab_local,release;
gulp deploy-entry --release true;

./bin/rigger_conf.sh demo_local,release;
gulp deploy-entry --release true;

./bin/rigger_conf.sh online_local,release;
gulp deploy-entry --release true;

### Step2 提交 dist/release

git add -A -f dist/release

# git commit -m "update release"
#
# git push

### Step3 更新版本号 并打tag 推送 


rg rc 
# TAG=`cat version.txt`
# echo $TAG ;
# cd $HOME/devspace/ayi_pub ;
# ./rocket_pub.sh  --prj web_baojie --tag $TAG --host $*