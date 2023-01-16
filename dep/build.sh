git pull
git submodule foreach git pull

rm -rf back

mv build back

npm run build