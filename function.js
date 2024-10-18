document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var modal = document.getElementById("infoModal");
    var selectedDate = null;

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'pt-br',
        dateClick: function(info) {
            selectedDate = info.date; // Armazena a data selecionada
            openModal();
        }
    });

    calendar.render();

    function openModal() {
        modal.style.display = "block"; // Abre o modal
        document.getElementById('date').value = selectedDate.toISOString().split('T')[0]; // Preenche a data no formulário
    }

    window.closeModal = function() {
        modal.style.display = "none"; // Fecha o modal
        document.getElementById('infoForm').reset(); // Reseta o formulário
    };

    document.getElementById('infoForm').onsubmit = function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        
        // Captura os dados do formulário
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const date = document.getElementById('date').value;
        const client = document.getElementById('client').value;
        const location = document.getElementById('location').value;
        const functionType = document.getElementById('function').value;
        const assistant = document.getElementById('assistant').value;
        const observation = document.getElementById('observation').value;

        // Cria um arquivo CSV
        const csvContent = `data:text/csv;charset=utf-8,Nome,Descrição,Data,Cliente,Local,Função,Auxiliar,Observação\n` +
            `${name},${description},${date},${client},${location},${functionType},${assistant},${observation}`;

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "informacoes_gravacao.csv");
        document.body.appendChild(link); // Requerido para Firefox

        link.click(); // Inicia o download
        closeModal(); // Fecha o modal após o envio
    };
});
