const { readdir, readFile } = require('fs');
const pathUtil = require('path');

const folderPath = pathUtil.join(__dirname, '2kk_words_400x400');

function getFileText(path) {
    return new Promise((resolve, reject) => {
        readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function getFileNames(path) {
    return new Promise((resolve, reject) => {
        readdir(path, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

async function uniqueValues(folderPath) {
    try {
        const fileNames = await getFileNames(folderPath);
        const fileTexts = await Promise.all(
            fileNames.map((name) => getFileText(folderPath + '/' + name))
        );

        const filesNames = fileTexts.map((text) => text.split('\n'));
        const allNames = filesNames.reduce(
            (acc, names) => acc.concat(names),
            []
        );

        return new Set(allNames).size;
    } catch (error) {
        console.log(error);
    }
}

async function existInAllFiles(folderPath) {
    try {
        const fileNames = await getFileNames(folderPath);
        const fileTexts = await Promise.all(
            fileNames.map((name) => getFileText(folderPath + '/' + name))
        );

        const filesNames = fileTexts
            .map((text) => text.split('\n'))
            .map((values) => new Set(values));

        const allFileNames = Array.from(filesNames[0]).filter((name) => {
            for (let fileName of filesNames) {
                if (!fileName.has(name)) {
                    return false;
                }
            }
            return true;
        });

        return allFileNames.length;
    } catch (error) {
        console.log(error);
    }
}

async function existInAtLeastTen(folderPath) {
    try {
        const fileNames = await getFileNames(folderPath);
        const fileTexts = await Promise.all(
            fileNames.map((name) => getFileText(folderPath + '/' + name))
        );
        const filesNames = fileTexts
            .map((text) => text.split('\n'))
            .map((values) => new Set(values));

        const uniqueNames = filesNames.reduce((acc, names) => {
            names.forEach((name) => acc.add(name));
            return acc;
        }, new Set());

        const atLeastTenFileNames = Array.from(uniqueNames).filter((name) => {
            let counter = 0;
            for (let fileName of filesNames) {
                if (fileName.has(name) && counter++ && counter === 10) {
                    return true;
                }
            }
            return false;
        });

        return atLeastTenFileNames.length;
    } catch (error) {
        console.log(error);
    }
}

async function getTime() {
    const startTime = performance.now();
    console.log(await uniqueValues(folderPath));
    const endTime = performance.now();
    console.log(`Took ${(endTime - startTime) / 1000} seconds`);
}
getTime();
