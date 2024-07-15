function printTextAfterDelay(text, delay) {
	setTimeout(() => {
		console.log(text);
	}, delay);
}

printTextAfterDelay('Привіт, світ!', 2000);
