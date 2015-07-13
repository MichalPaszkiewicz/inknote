@Echo Off

echo.
echo building data storage
tsc scripts\plugins\instances\data-storage.ts -out scripts\plugins\instances\data-storage.js -target ES5

echo.
echo building plugin1
tsc scripts\plugins\instances\plugin1.ts -out scripts\plugins\instances\plugin1.js -target ES5

echo.
echo building plugin2
tsc scripts\plugins\instances\plugin2.ts -out scripts\plugins\instances\plugin2.js -target ES5
