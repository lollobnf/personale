document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.button');
    const logList = document.getElementById('log-list');
    const mealTypeSelect = document.getElementById('meal-type');

    // Funzione per aggiornare la visualizzazione dei log
    function updateLogList() {
        // Recupera i dati esistenti
        const data = JSON.parse(localStorage.getItem('buttonData')) || [];
        
        // Pulisce la lista esistente
        logList.innerHTML = '';

        // Aggiunge ogni elemento della lista
        data.forEach((entry, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                Pulsante: ${entry.button}, Tipo di Pasto: ${entry.mealType}, Data e Ora: ${entry.timestamp}
                <button class="delete-button" data-index="${index}">Elimina</button>
            `;
            logList.appendChild(listItem);
        });

        // Aggiungi evento di eliminazione ai pulsanti
        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                deleteLog(index);
            });
        });
    }

    // Funzione per eliminare un log
    function deleteLog(index) {
        let data = JSON.parse(localStorage.getItem('buttonData')) || [];
        data.splice(index, 1); // Rimuove l'elemento all'indice specificato
        localStorage.setItem('buttonData', JSON.stringify(data));
        updateLogList(); // Ricarica la lista aggiornata
    }

    // Inizializza la visualizzazione dei log
    updateLogList();

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonValue = button.getAttribute('data-button');
            const timestamp = new Date().toLocaleString();
            const mealType = mealTypeSelect.value;
            
            // Recupera i dati esistenti
            let data = JSON.parse(localStorage.getItem('buttonData')) || [];
            
            // Aggiungi il nuovo dato
            data.push({ button: buttonValue, mealType: mealType, timestamp: timestamp });
            
            // Salva i dati aggiornati
            localStorage.setItem('buttonData', JSON.stringify(data));
            
            // Aggiorna la visualizzazione dei log
            updateLogList();
            
            // Log dei dati memorizzati
            console.log(`Pulsante: ${buttonValue}, Tipo di Pasto: ${mealType}, Data e Ora: ${timestamp}`);
        });
    });
});