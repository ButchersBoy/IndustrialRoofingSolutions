const express = require('express');
const path = require('path');
const app = express();

// Middleware to redirect HTTP to HTTPS only in production
if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect('https://' + req.headers.host + req.url);
        }
        next();
    });
}

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve extensionless URLs
app.get('/:page', (req, res, next) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, 'public', `${page}.html`);
    
    res.sendFile(filePath, (err) => {
        if (err) {
            next(); // If the file isn't found, proceed to 404
        }
    });
});

// Handle root request (default page)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle 404 errors for unknown URLs
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
