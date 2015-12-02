#!/bin/bash

if [ "$1" == "" ]; then
	forever -p ./   --spinSleepTime  3000 --uid nuoya_wesing  -l ./access.log -e ./error.log -a  -s start master.js
	echo "run  pro"
elif [ "$1" == "test" ]; then
	forever -p ./   --spinSleepTime  3000 --uid nuoya_wesing_test  -l ./access.log -e ./error.log -a  -s start  master.js  --port 9899 --mode pro --api bleach.testapi.591ku.com
	echo "run  test"
fi
