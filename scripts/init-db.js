const { Client } = require('pg')

const client = new Client({
    host: '212.233.79.124',
    port: 5432,
    user: 'ihahn',
    password: '2E)yh51nXm5716rb9',
    database: 'swg',
    ssl: false
})

async function init() {
    try {
        await client.connect()
        console.log('✅ Подключение к БД успешно')

        // Создаем таблицы
        await client.query(`
      CREATE TABLE IF NOT EXISTS profiles (
        id BIGSERIAL PRIMARY KEY,
        telegram_id BIGINT UNIQUE,
        username TEXT,
        first_name TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)
        console.log('✅ Таблица profiles создана')

        await client.query(`
      CREATE TABLE IF NOT EXISTS events (
        id BIGSERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        event_date TIMESTAMPTZ NOT NULL,
        location TEXT NOT NULL,
        max_participants INTEGER DEFAULT 10,
        creator_id BIGINT REFERENCES profiles(id),
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)
        console.log('✅ Таблица events создана')

        await client.end()
        console.log('🎉 База данных готова!')

    } catch (err) {
        console.error('❌ Ошибка:', err)
    }
}

init()
