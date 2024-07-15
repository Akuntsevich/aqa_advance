const axios = require('axios');
const CircularJSON = require('circular-json');

axios.interceptors.request.use(request => {
  console.log('Starting Request', CircularJSON.stringify(request, null, 2));
  return request;
});

axios.interceptors.response.use(response => {
  console.log('Response:', CircularJSON.stringify(response, null, 2));
  return response;
});

const API_URL = 'https://jsonplaceholder.typicode.com';

describe('JSONPlaceholder API Tests', () => {
  test('GET /posts/1', async () => {
    const response = await axios.get(`${API_URL}/posts/1`);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id', 1);
  });

  test('GET /users/1', async () => {
    const response = await axios.get(`${API_URL}/users/1`);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id', 1);
  });

  test('POST /posts', async () => {
    const newPost = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    };
    const response = await axios.post(`${API_URL}/posts`, newPost);
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('title', 'foo');
    expect(response.data).toHaveProperty('body', 'bar');
    expect(response.data).toHaveProperty('userId', 1);
  });

  test('POST /users', async () => {
    const newUser = {
      name: 'Jane Doe',
      username: 'janedoe',
      email: 'janedoe@example.com',
    };
    const response = await axios.post(`${API_URL}/users`, newUser);
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('name', 'Jane Doe');
    expect(response.data).toHaveProperty('username', 'janedoe');
    expect(response.data).toHaveProperty('email', 'janedoe@example.com');
  });

  test('GET /comments?postId=1', async () => {
    const response = await axios.get(`${API_URL}/comments`, { params: { postId: 1 } });
    expect(response.status).toBe(200);
    expect(response.data.length).toBeGreaterThan(0);
    expect(response.data[0]).toHaveProperty('postId', 1);
  });
});
