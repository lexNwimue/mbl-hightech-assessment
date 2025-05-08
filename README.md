# 💹 Real-Time Price Provider and Distributor with Socket.IO in NestJS

This project is a real-time price simulation and broadcasting system built with **NestJS** and **Socket.IO**. It includes:

- A backend service that simulates price changes for multiple assets every 5 seconds.
- A Socket.IO server to push price updates to all connected clients in real time.
- A simple frontend client built with HTML, CSS, and JavaScript that displays live price updates.

---

## 🛠️ Getting Started

View live app at: https://mbl-hightech-assessment.onrender.com. (Note that since this is a free, serverless service, its susceptible to cold starts so it might take some time before the data renders on the browser)

### 📖 How It Works

#### 🧮 Price Simulation

The backend simulates price fluctuations for digital assets like BTC/USD, ETH/USD, and XRP/USD. This is handled by the `PriceService`, which maintains an internal `Record<string, number>` map of asset prices.

Every 5 seconds, the service performs the following steps:

- Iterates over all tracked symbols.
- Applies a random ±1% change to the current price using:

  ```ts
  const fluctuation = price * (Math.random() * 0.02 - 0.01);
  ```

- Updates the price and records a UTC timestamp.
- Returns an array of structured price updates (symbol, price, timestamp).

#### 🔌Real-Time Communication (via Socket.IO)

The project uses NestJS’s `@WebSocketGateway()` decorator, which internally leverages the @nestjs/platform-socket.io package — effectively giving you SignalR-style behavior using Socket.IO.

- The PriceGateway emits updated prices to all connected clients every 5 seconds using:

```ts
this.server.emit('price_update', [...updatedPrices]);
```

- Each client maintains a persistent WebSocket connection that allows bi-directional, real-time communication.

#### 📡 Data Transmission to the Client

The client is built using plain `HTML`, `CSS`, and `JavaScript`. It:

- Connects to the WebSocket server using Socket.IO:

```js
const socket = io('http://localhost:3000');
```

- Listens for incoming price updates:

```js
socket.on('price_update', (data) => { ... });
```

- On each update:
  - Updates or creates a row in the price table
  - Highlights price changes with: Green for price increase & Red for price decrease
  - Formats the timestamp as a human-readable time

The UI is reactive and will reflect every new price emitted by the backend, giving the user a live view of simulated market activity.

#### 🔁 Reconnection Handling

Socket.IO automatically handles reconnections in case of dropped connections. The client includes a listener for disconnect events and logs a warning, while Socket.IO tries to reconnect in the background without requiring additional logic.

### 🔧 Prerequisites

- Node.js v16+ and npm
- NestJS CLI (`npm i -g @nestjs/cli`)
- Modern web browser (Chrome, Firefox, etc.)

---

### 🚀 Run the App

```bash
# Install dependencies
npm install

# Start the development server
npm run start:

# View app at localhost:3000
```

## 📌 Assumptions

- The price feed is **simulated**, not fetched from any external API.

- We’re using **Socket.IO**, not Microsoft’s native SignalR (NestJS uses `@nestjs/platform-socket.io` under the hood with `@WebSocketGateway()` so we're not using that directly).

- Clients do **not need authentication** to receive price updates.

- All prices are **ephemeral** and exist only in memory (no persistence).

- The client UI is built using **plain HTML/CSS/JS** per project scope — not React, Vue, or any frontend framework.

- Socket.IO (client-side) handles reconnections out of the box, unless explicitly disabled so that logic was not directly implemented

- There were no submission requirements so this is hosted on Digital Ocean app platform
