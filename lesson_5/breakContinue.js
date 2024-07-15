for (let i = 0; i < 10; i++) {
	if (i === 5) {
		break;
	}
	console.log(i);
}

for (let i = 0; i < 10; i++) {
	if (i % 2 === 0) {
		continue;
	}
	console.log(i);
}
