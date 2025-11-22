import { Client } from 'pg';

const client = new Client({
    host: '212.233.79.124',
    port: 5432,
    user: 'ihahn',
    password: '2E)yh51nXm5716rb9',
    database: 'swg',
    ssl: false
});

// Подключаемся к БД при инициализации
let isConnected = false;

async function connect() {
    if (!isConnected) {
        await client.connect();
        isConnected = true;
        console.log('✅ Подключение к БД успешно');
    }
}

export async function query(text: string, params?: any[]) {
    await connect();
    return client.query(text, params);
}

export default client;
