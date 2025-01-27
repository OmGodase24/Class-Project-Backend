const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// Load environment variables from config.env
dotenv.config({ path: './config.env' });

// MongoDB connection URL
const URL = process.env.DATABASE_LOCAL || "mongodb://127.0.0.1:27017/Programmers";

// Connect to MongoDB
async function connectToDatabase() {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process if the connection fails
    }
}

connectToDatabase();

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

