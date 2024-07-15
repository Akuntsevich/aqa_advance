const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Функція для запиту об'єкту todo
function fetchTodo() {
	return fetch('https://jsonplaceholder.typicode.com/todos/1')
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then((todo) => {
			return todo; // Повертаємо об'єкт todo
		})
		.catch((error) => {
			console.error('Fetch todo error:', error);
			throw error;
		});
}

// Функція для запиту об'єкту user
function fetchUser() {
	return fetch('https://jsonplaceholder.typicode.com/users/1')
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then((user) => {
			return user; // Повертаємо об'єкт user
		})
		.catch((error) => {
			console.error('Fetch user error:', error);
			throw error;
		});
}

// Використання Promise.all
function getAllData() {
	Promise.all([fetchTodo(), fetchUser()])
		.then(([todo, user]) => {
			console.log('Promise.all results:');
			console.log('Todo:', todo);
			console.log('User:', user);
			// Присвоєння значень змінним
			const todoResult = todo;
			const userResult = user;
		})
		.catch((error) => {
			console.error('Promise.all error:', error);
		});
}

// Використання Promise.race
function getFirstData() {
	Promise.race([fetchTodo(), fetchUser()])
		.then((result) => {
			console.log('Promise.race result:', result);
			// Присвоєння значення змінній
			const firstResult = result;
		})
		.catch((error) => {
			console.error('Promise.race error:', error);
		});
}

// Виклик функцій для демонстрації
getAllData();
getFirstData();
