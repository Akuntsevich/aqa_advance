const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
class FetchHandler {
    fetchTodo() {
      return fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .catch(error => {
          console.error('Fetch todo error:', error);
          throw error;
        });
    }
  
    fetchUser() {
      return fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .catch(error => {
          console.error('Fetch user error:', error);
          throw error;
        });
    }
  
    handlePromises() {
      Promise.all([this.fetchTodo(), this.fetchUser()])
        .then(([todo, user]) => {
          console.log('Promise.all results:');
          console.log('Todo:', todo);
          console.log('User:', user);
        })
        .catch(error => {
          console.error('Promise.all error:', error);
        });
  
      Promise.race([this.fetchTodo(), this.fetchUser()])
        .then(result => {
          console.log('Promise.race result:', result);
        })
        .catch(error => {
          console.error('Promise.race error:', error);
        });
    }
  }
  
  // Виклик класу для перевірки
  const fetchHandler = new FetchHandler();
  fetchHandler.handlePromises();

  class AsyncFetchHandler {
    async fetchTodoAsync() {
      const fetch = (await import('node-fetch')).default;
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const todo = await response.json();
        return todo;
      } catch (error) {
        console.error('Fetch todo error:', error);
        throw error;
      }
    }
  
    async fetchUserAsync() {
      const fetch = (await import('node-fetch')).default;
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const user = await response.json();
        return user;
      } catch (error) {
        console.error('Fetch user error:', error);
        throw error;
      }
    }
  
    async handleAsync() {
      try {
        const [todo, user] = await Promise.all([this.fetchTodoAsync(), this.fetchUserAsync()]);
        console.log('Promise.all results:');
        console.log('Todo:', todo);
        console.log('User:', user);
  
        const result = await Promise.race([this.fetchTodoAsync(), this.fetchUserAsync()]);
        console.log('Promise.race result:', result);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
  
  // Виклик класу для перевірки
  const asyncFetchHandler = new AsyncFetchHandler();
  asyncFetchHandler.handleAsync();