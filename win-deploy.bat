# build
yarn run gh:build
# navigate into the build output directory
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/GlobalArtLimited/vue-atlaskit.git master:gh-pages
cd .
