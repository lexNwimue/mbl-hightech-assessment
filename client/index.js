const socket = io('http://localhost:3000');
const tableBody = document.getElementById('priceTableBody');
const latestPrices = {};

console.log('About to connect socket');

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('price_update', (data) => {
  console.log('Price updating');
  data.forEach(({ symbol, price, timestamp }) => {
    const oldPrice = latestPrices[symbol];
    latestPrices[symbol] = price;

    let row = document.getElementById(symbol);
    if (!row) {
      row = document.createElement('tr');
      row.id = symbol;
      row.innerHTML = `<td>${symbol}</td><td></td><td></td>`;
      tableBody.appendChild(row);
    }

    const priceCell = row.children[1];
    const timestampCell = row.children[2];

    priceCell.textContent = price.toFixed(2);
    timestampCell.textContent = new Date(timestamp).toLocaleTimeString();

    if (oldPrice != null) {
      priceCell.className =
        price > oldPrice ? 'up' : price < oldPrice ? 'down' : '';
    }
  });
});

socket.on('disconnect', () => {
  console.warn('Disconnected. Attempting to reconnect...');
});
