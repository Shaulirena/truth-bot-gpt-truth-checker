async function verify() {
    const inputText = document.getElementById('inputText').value;
    const resultBox = document.getElementById('resultBox');
    resultBox.innerHTML = 'בודק...';

    try {
        const response = await fetch('/api/verify', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ claim: inputText })
        });

        const data = await response.json();
        resultBox.innerHTML = '<b>תוצאה:</b><br>' + data.result;
    } catch (error) {
        resultBox.innerHTML = 'שגיאה בבדיקה.';
    }
}
