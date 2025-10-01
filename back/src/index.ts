import app from '@/config/expressConfig.js';
const port = process.env.BACK_PORT || 5000;
app.listen(5000, ()  => {
    console.info(`API rodando no endereço 'http://locahost:${port}'`)
});