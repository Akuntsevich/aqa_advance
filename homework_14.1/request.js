// request.js
const axios = require('axios');

// Функція для виклику помилки
async function fetchInvalidUrl() {
    try {
        await axios.get('https://invalid.url');
    } catch (error) {
        return handleError(error);
    }
}

// Функція обробки помилок
function handleError(error) {
    if (error.response) {
        // Сервер відповів статусом, відмінним від 2xx
        return `Error: Received ${error.response.status} status`;
    } else if (error.request) {
        // Запит був зроблений, але відповіді не отримано
        return 'Error: No response received';
    } else {
        // Інша помилка
        return `Error: ${error.message}`;
    }
}

// Функція для запиту з параметрами та заголовками
async function fetchDataWithHeadersAndParams() {
    try {
        const response = await axios.get('https://example.com/api/data', {
            headers: {
                'Custom-Header': 'CustomValue'
            },
            params: {
                key1: 'value1',
                key2: 'value2'
            }
        });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

// Експорт функцій
module.exports = {
    fetchInvalidUrl,
    fetchDataWithHeadersAndParams
};
