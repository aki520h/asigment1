const http = require('http');
const os = require('os');

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html;charset=utf-8');

    // Simple CSS for decoration
    const style = `
        <style>
            body { font-family: 'Segoe UI', sans-serif; text-align: center; background-color: #f4f4f9; padding: 50px; }
            .card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); display: inline-block; min-width: 300px; }
            h1 { color: #333; }
            p { color: #666; font-size: 1.2rem; }
            .btn { display: inline-block; padding: 10px 20px; margin: 10px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; }
            .btn:hover { background: #0056b3; }
            .error-text { color: red; font-weight: bold; }
        </style>
    `;

    if (req.url === '/' || req.url === '/home') {
        res.end(style + `
            <div class="card">
                <h1>🏠 Home Page</h1>
                <p>Welcome! Server is running smoothly.</p>
                <a href="/about" class="btn">About Server</a>
                <a href="/time" class="btn">Check Time</a>
            </div>
        `);
    } 
    else if (req.url === '/about') {
        res.end(style + `
            <div class="card">
                <h1>ℹ️ About Server</h1>
                <p><b>Platform:</b> ${os.platform()}</p>
                <p><b>Architecture:</b> ${os.arch()}</p>
                <a href="/" class="btn" style="background: #6c757d;">Back Home</a>
            </div>
        `);
    } 
    else if (req.url === '/time') {
        res.end(style + `
            <div class="card">
                <h1>⏰ Current Time</h1>
                <p>The time is: <b>${new Date().toLocaleTimeString()}</b></p>
                <a href="/" class="btn" style="background: #6c757d;">Back Home</a>
            </div>
        `);
    } 
    else {
        // Correct 404 Handling
        res.statusCode = 404;
        res.end(style + `
            <div class="card" style="border-top: 5px solid red;">
                <h1 class="error-text">🛑 404 - Not Found</h1>
                <p>Oops! This page doesn't exist.</p>
                <a href="/" class="btn">Go Home</a>
            </div>
        `);
    }
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});