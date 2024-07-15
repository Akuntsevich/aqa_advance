const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Функція для запиту об'єкту todo
async function fetchTodo() {
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

// Функція для запиту об'єкту user
async function fetchUser() {
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

// Використання Promise.all
async function getAllData() {
	try {
		const [todo, user] = await Promise.all([fetchTodo(), fetchUser()]);
		console.log('Promise.all results:');
		console.log('Todo:', todo);
		console.log('User:', user);
		// Присвоєння значень змінним
		const todoResult = todo;
		const userResult = user;
	} catch (error) {
		console.error('Promise.all error:', error);
	}
}

// Використання Promise.race
async function getFirstData() {
	try {
		const result = await Promise.race([fetchTodo(), fetchUser()]);
		console.log('Promise.race result:', result);
		// Присвоєння значення змінній
		const firstResult = result;
	} catch (error) {
		console.error('Promise.race error:', error);
	}
}

// Виклик функцій для демонстрації
getAllData();
getFirstData();
