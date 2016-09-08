TAG=`cat version.txt`
echo $TAG ;
cd $HOME/devspace/ayi_pub ;
./rocket_pub.sh  --prj web_order --tag $TAG --host $*