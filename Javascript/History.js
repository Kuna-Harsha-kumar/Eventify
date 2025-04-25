var username=localStorage.getItem('username');
document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getHistoryAll/' + username)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
});
function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');
    console.log(data);

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>Login to see booked tickets</td></tr>";
        return;
    }

    let tableHtml = "";

    for (let i = 0; i < data.length; i++) {
        const person = data[i];
        console.log(person);
        tableHtml += `<td>${person.id}</td>`;
        tableHtml += `<td>${person.name}</td>`;
        tableHtml += `<td>${person.showtime}</td>`;
        tableHtml += `<td>${new Date(person.showdate).toLocaleDateString()}</td>`;
        tableHtml += `<td>${person.nooftickets}</td>`;
        tableHtml += "</tr>";
    }

    table.innerHTML = tableHtml;
}