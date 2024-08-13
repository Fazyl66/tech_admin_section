

document.addEventListener('DOMContentLoaded', function() {
    fetch('https://raw.githubusercontent.com/aspsnippets/test/master/Customers.json')
        .then(response => response.json())
        .then(data => {
            const customerList = document.getElementById('Events-Detail');

            data.forEach(customer => {
                const row = document.createElement('div');
                row.innerHTML = `
                    <div><input type = "text" placeholder = "${customer.Country}"></div>
                    <div><input type = "text" placeholder = "${customer.Country}"></div>
                    <div><input type = "text" placeholder = "${customer.Country}"></div>
                    <div><input type = "text" placeholder = "${customer.Country}"></div>
                    <div><input type = "text" placeholder = "${customer.Country}"></div>
                    <div><input type = "text" placeholder = "${customer.Country}"></div>
                    <div><input type = "text" placeholder = "${customer.Country}"></div>
                    <div><input type = "text" placeholder = "${customer.Country}"></div>
                    <div><input type = "text" placeholder = "${customer.Country}"></div>
                    <div><input type = "text" placeholder = "${customer.Country}"></div>
                    <div><button>Update</button></div>
                    <div><button>Delete</button></div>
                `;
                customerList.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching the customer data:', error);
        });
});
