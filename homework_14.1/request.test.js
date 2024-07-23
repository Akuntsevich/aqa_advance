// request.test.js
const axios = require('axios');
const { fetchInvalidUrl, fetchDataWithHeadersAndParams } = require('./request'); // Імпорт функцій

jest.mock('axios'); // Мокаємо axios

test('should handle error correctly and return proper error message', async () => {
    axios.get.mockRejectedValue({ request: {} }); // Мок для створення помилки

    const errorMessage = await fetchInvalidUrl();
    expect(errorMessage).toBe('Error: No response received');
});

test('should include correct headers and params in the request', async () => {
    axios.get.mockResolvedValue({ data: { success: true } });

    await fetchDataWithHeadersAndParams();

    expect(axios.get).toHaveBeenCalledWith('https://example.com/api/data', {
        headers: {
            'Custom-Header': 'CustomValue'
        },
        params: {
            key1: 'value1',
            key2: 'value2'
        }
    });
});
