require('dotenv').config()

exports.secret = process.env.SECRET;
exports.databaseUrl = process.env.DATABASE_URL || "mongodb://localhost:27017/mediaServer";
exports.port = process.env.PORT || 3000;