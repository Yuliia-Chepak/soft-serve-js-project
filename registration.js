document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');
    const userDataDiv = document.getElementById('userData');
    const localStorageKey = 'userRecords';

    // Перевірка наявності доступу до мережі
    const isOnline = () => navigator.onLine;

    // Оновлення статусу мережі
    const updateNetworkStatus = () => {
        const status = document.getElementById('networkStatus');
        if (isOnline()) {
            status.textContent = 'Статус: Онлайн';
            status.style.color = 'green';
            handleOnlineStatus(); 
        } else {
            status.textContent = 'Статус: Офлайн';
            status.style.color = 'red';
        }
    };

    // Відображення даних з LocalStorage
    const displayLocalData = (data) => {
        userDataDiv.innerHTML = data.map(user => `
            <p>
                <strong>${user.lastName} ${user.firstName}</strong>, ${user.age} років, 
                Освіта: ${user.education}, Посада: ${user.position}
            </p>
        `).join('');
    };

    // Емуляція відправлення даних на сервер
    const sendToServer = (data) => {
        console.log('Дані відправлено на сервер:', data);
    };

    // Функція для збереження даних в LocalStorage
    const saveToLocalStorage = (data) => {
        const existingData = JSON.parse(localStorage.getItem(localStorageKey)) || [];
        existingData.push(data);
        localStorage.setItem(localStorageKey, JSON.stringify(existingData));
    };

    // Обробка форми
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = {
            lastName: document.getElementById('lastName').value,
            firstName: document.getElementById('firstName').value,
            age: document.getElementById('age').value,
            education: document.getElementById('education').value,
            position: document.getElementById('position').value,
        };

        if (isOnline()) {
            sendToServer(user);
        } else {
            saveToLocalStorage(user);
        }

        form.reset();
    });

    // Обробка онлайн статусу
    const handleOnlineStatus = () => {
        const localData = JSON.parse(localStorage.getItem(localStorageKey)) || [];
        if (localData.length > 0) {
            displayLocalData(localData);
            localStorage.removeItem(localStorageKey);
        }
    };

    // Обробка зміни мережевого статусу
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    // Початкове завантаження сторінки
    updateNetworkStatus();
});
