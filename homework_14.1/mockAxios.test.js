// mockAxios.test.js
const axios = require('axios');

jest.mock('axios');

test('should handle successful request', async () => {
    axios.get.mockResolvedValue({ data: { message: 'Success' } });

    const response = await axios.get('https://example.com/api/success');
    expect(response.data.message).toBe('Success');
});

test('should handle failed request', async () => {
    axios.get.mockRejectedValue(new Error('Request failed'));

    try {
        await axios.get('https://example.com/api/fail');
    } catch (error) {
        expect(error.message).toBe('Request failed');
    }
});
