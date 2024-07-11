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
        const data = response.data.result; // Предположим, что данные находятся в result

        // Формируем строку для записи в файл
        let fileContent = `export const cryptoData = {
  result: [\n`;

        // Добавляем каждый элемент данных в строку
        data.forEach(item => {
            fileContent += `    ${JSON.stringify(item)},\n`;
        });

        // Закрываем массив и объект
        fileContent += `  ]\n};\n`;

        // Путь к файлу, в который будем записывать данные
        const filePath = 'cryptodata.js';

        // Запись данных в файл
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