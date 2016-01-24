@Echo Off

echo.
echo building data storage
tsc plugins\data-storage.ts -out plugins\data-storage.js -target ES5

echo.
echo building snow background
tsc plugins\snow-back.ts -out plugins\snow-back.js -target ES5

echo.
echo building plugin2
tsc plugins\plugin2.ts -out plugins\plugin2.js -target ES5
