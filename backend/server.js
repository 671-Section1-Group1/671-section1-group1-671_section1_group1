const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const db = require("./db");

// Import API routes
const authRoutes = require("./routes/auth");
const searchRoutes = require("./routes/search");
const adminRoutes = require("./routes/admin");
const productRoutes = require("./routes/products");
const homeRoutes = require("./routes/home");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (go up one level from backend to root)
app.use("/css", express.static(path.join(__dirname, "..", "css")));
app.use("/js", express.static(path.join(__dirname, "..", "js")));
app.use("/assets", express.static(path.join(__dirname, "..", "assets")));

// Serve component files for navbar, footer, etc.
app.get("/components/navbar", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "components", "navbar.html"));
});

app.get("/components/navAdmin", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "components", "navAdmin.html"));
});

app.get("/components/footer", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "components", "footer.html"));
});

app.get("/components/search", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "components", "search.html"));
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/home", homeRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

app.get("/contacts", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "contacts.html"));
});

app.get("/products", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "products.html"));
});

app.get("/products_detail", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "products_detail.html"));
});

app.get("/cart", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "cart.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "login.html"));
});

app.get("/logout", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "logout.html"));
});

app.get("/info", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "info.html"));
});


app.get("/user_account", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "user_account.html"));
});


app.get("/product_management", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "product_management.html"));
});


app.get("/error", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "error.html"));
});

app.get("/product_management_add", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "product_management_add.html"));
});

app.get("/indexAdmin", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "contacts.html"));
});

app.get("/lookbook", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "lookbook.html"));
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "..", "frontend", "error.html"));
});


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
