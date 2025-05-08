# 💹 Real-Time Price Provider and Distributor with SignalR (Socket.IO) in NestJS

This project is a real-time price simulation and broadcasting system built with **NestJS** and **Socket.IO**. It includes:

- A backend service that simulates price changes for multiple assets every 5 seconds.
- A Socket.IO server to push price updates to all connected clients in real time.
- A simple frontend client built with HTML, CSS, and JavaScript that displays live price updates.

---

## 🛠️ Getting Started

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
npm run start:dev
```

## 📌 Assumptions

- The price feed is **simulated**, not fetched from any external API.

- We’re using **Socket.IO**, not Microsoft’s native SignalR (NestJS uses `@nestjs/platform-socket.io` under the hood so we're not using that directly).

- Clients do **not need authentication** to receive price updates.

- All prices are **ephemeral** and exist only in memory (no persistence).

- The client UI is built using **plain HTML/CSS/JS** per project scope — not React, Vue, or any frontend framework.

- There were no submission requirements so this is hosted on Digital Ocean app platform
