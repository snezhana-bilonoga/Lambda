const { readdir, readFile } = require('fs');

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

async function uniqueValues() {
    const folderPath = '200k_words_100x100';

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

async function existInAllFiles() {
    const folderPath = '200k_words_100x100';
    try {
        const fileNames = await getFileNames(folderPath);
        const fileTexts = await Promise.all(
            fileNames.map((name) => getFileText(folderPath + '/' + name))
        );
        const filesNames = fileTexts.map((text) => text.split('\n'));
        const uniqueNames = new Set(filesNames[0]);
        const allFileNames = Array.from(uniqueNames).filter((name) => {
            for (let fileName of filesNames) {
                if (!fileName.includes(name)) {
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

async function existInAtLeastTen() {
    const folderPath = '200k_words_100x100';
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
        const uniqueNames = new Set(allNames);
        const atLeastTenFileNames = Array.from(uniqueNames).filter((name) => {
            let counter = 0;
            for (let fileName of filesNames) {
                if (fileName.includes(name)) {
                    counter += 1;

                    if (counter >= 10) {
                        return true;
                    }
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
    for (let i = 0; i < 1; i++) {
        console.log(await existInAtLeastTen());
    }
    const endTime = performance.now();
    console.log(`Took ${(endTime - startTime) / 1000} seconds`);
}
getTime();
