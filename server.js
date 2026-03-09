const http = require('http');
const os = require('os');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Set response header for HTML content
    res.setHeader('Content-Type', 'text/html;charset=utf-8');

    // Requirement: Parse the URL using the built-in URL object
    // This extracts the pathname and any search parameters from the request
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;
    
    // Requirement: Extract the 'name' parameter for a personalized greeting
    // Defaults to 'Guest' if the name parameter is missing in the URL
    const userName = url.searchParams.get('name') || 'Guest';

    // Professional UI Styling (Your original design)
    const style = `
        <style>
            body { font-family: 'Segoe UI', sans-serif; text-align: center; background-color: #f4f4f9; padding: 50px; }
            .card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); display: inline-block; min-width: 350px; border-top: 6px solid #007bff; }
            h1 { color: #333; margin-bottom: 20px; }
            p { color: #555; font-size: 1.2rem; }
            .btn { display: inline-block; padding: 12px 24px; margin: 10px; background: #007bff; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; }
            .btn:hover { background: #0056b3; }
            .highlight { color: #007bff; font-weight: bold; }
        </style>
    `;

    // Routing logic based on the pathname
    if (pathname === '/' || pathname === '/home') {
        res.end(style + `
            <div class="card">
                <h1>Welcome, ${userName}</h1>
                <a href="/about?name=${userName}" class="btn">About Server</a>
                <a href="/time?name=${userName}" class="btn">Check Time</a>
            </div>
        `);
    } 
    else if (pathname === '/about') {
        res.end(style + `
            <div class="card">
                <h1>ℹ️ Server Specifications</h1>
                <p><b>Platform:</b> ${os.platform()}</p>
                <p><b>Architecture:</b> ${os.arch()}</p>
                <p><b>User:</b> ${userName}</p>
                <a href="/?name=${userName}" class="btn" style="background: #6c757d;">Back Home</a>
            </div>
        `);
    } 
    else if (pathname === '/time') {
        res.end(style + `
            <div class="card">
                <h1>⏰ Current System Time</h1>
                <p>Hello ${userName}, the current time is:</p>
                <h2 style="color: #28a745;">${new Date().toLocaleTimeString()}</h2>
                <a href="/?name=${userName}" class="btn" style="background: #6c757d;">Back Home</a>
            </div>
        `);
    } 
    else {
        // Standard 404 Not Found handling
        res.statusCode = 404;
        res.end(style + `
            <div class="card" style="border-top-color: red;">
                <h1 style="color: red;">🛑 404 - Not Found</h1>
                <p>The path <b>${pathname}</b> does not exist.</p>
                <a href="/?name=${userName}" class="btn">Go Home</a>
            </div>
        `);
    }
});

// Start the server on the defined port
server.listen(PORT, () => {
    console.log(`Server initialized and running at http://localhost:${PORT}`);
});
