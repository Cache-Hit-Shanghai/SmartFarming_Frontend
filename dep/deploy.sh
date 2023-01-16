name="frontend"

rm -rf ${name}/build
rm -rf ${name}/public
rm ${name}/babel.config.js
rm ${name}/next.config.js
rm ${name}/package.json
# rm ${name}/i18n.js
cp -r build ${name}/
cp -r public ${name}/
# cp -r locales ${name}/

cp babel.config.js ${name}
cp next.config.js ${name}
# cp i18n.js ${name}
# echo  "config.pagesInDir='build/server/pages';" >>  ${name}/i18n.js
cp package.json ${name}
cp pm2.json5 ${name}

node --input-type=module dep/makePackageJson.js 

echo "tar"

tar -caf   ${name}.tar.gz ${name}
ls -l ${name}