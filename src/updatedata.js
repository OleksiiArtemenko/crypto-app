import axios from 'axios';
import fs from 'fs'

const options = {
    method: 'GET',
    url: 'https://openapiv1.coinstats.app/coins',
    headers: {
        accept: 'application/json',
        'X-API-KEY': 'yC/vOuGVdHe3UE/YNiDIXY01q4R/tRqncCl2LmBMIkM='
    }
};

axios
    .request(options)
    .then(function (response) {
        const data = response.data.result;

        let fileContent = `export const cryptoData = {
  result: [\n`;

        data.forEach(item => {
            fileContent += `    ${JSON.stringify(item)},\n`;
        });

        fileContent += `  ]\n};\n`;

        const filePath = 'cryptodata.js';

        fs.writeFile(filePath, fileContent, (err) => {
            if (err) {
                console.error('Ошибка записи файла:', err);
            } else {
                console.log('Данные успешно записаны в файл:', filePath);
            }
        });
    })
    .catch(function (error) {
        console.error(error);
    });