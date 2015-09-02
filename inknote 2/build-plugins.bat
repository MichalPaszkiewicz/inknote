@Echo Off

echo.
echo building data storage
tsc scripts\plugins\instances\data-storage.ts -out scripts\plugins\instances\data-storage.js -target ES5

echo.
echo building snow background
tsc scripts\plugins\instances\snow-back.ts -out scripts\plugins\instances\snow-back.js -target ES5

echo.
echo building plugin2
tsc scripts\plugins\instances\plugin2.ts -out scripts\plugins\instances\plugin2.js -target ES5
