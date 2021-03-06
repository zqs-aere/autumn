#!/bin/sh
#获取环境名
env=''

if [ x$1 != x ];then
  env=$1
else
  env='prod'
fi

#获取当前分支名
curr_branch=`git symbolic-ref --short -q HEAD`
echo '当前工作分支 => '${curr_branch}''

echo '读取配置文件:'
deploy_branch=`sed '/^'${env}_branch'=/!d;s/.*=//' deploy.conf`
deploy_host=`sed '/^'${env}_host'=/!d;s/.*=//' deploy.conf`
deploy_user=`sed '/^'${env}_user'=/!d;s/.*=//' deploy.conf`
deploy_path=`sed '/^'${env}_path'=/!d;s/.*=//' deploy.conf`
deploy_cache_path=`sed '/^'${env}_cache_path'=/!d;s/.*=//' deploy.conf`
echo '分支 => '${deploy_branch}
echo '地址 => '${deploy_host}
echo '用户 => '${deploy_user}
echo '路径 => '${deploy_path}
echo '缓存路径 => '${deploy_cache_path}

echo '储存当前修改'
git stash

echo '切换到需发布的分支 => '${deploy_branch}
git checkout $deploy_branch

echo '删除包'
rm -rf ./node_modules
echo '--------------------'
echo '删除成功'
echo '--------------------'

echo '下载包'
cnpm i
echo '--------------------'
echo '下载完成'
echo '--------------------'

echo '编译项目'
npm run build

echo '删除老版本和缓存'
ssh ${deploy_user}@${deploy_host} "rm -rf "${deploy_path}/dist ${deploy_cache_path}
echo '上传新版本'
scp -r ./dist ${deploy_user}@${deploy_host}:${deploy_path}

echo '切回工作分支 => '${curr_branch}
git checkout $curr_branch

echo '释放修改'
git stash pop

echo '部署成功'