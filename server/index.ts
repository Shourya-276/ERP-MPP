import dotenv from 'dotenv';
dotenv.config();

import app from './src/app';

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`🚀 Professional ERP Backend running at http://localhost:${PORT}`);
});
