const { Client } = require('pg')

const client = new Client({
    host: '212.233.79.124',
    port: 5432,
    user: 'ihahn',
    password: '2E)yh51nXm5716rb9',
    database: 'swg',
    ssl: false
})

async function migrate() {
    try {
        await client.connect()
        console.log('✅ Подключение к БД успешно')

        // Добавляем новые колонки для аутентификации
        await client.query(`
            ALTER TABLE profiles 
            ADD COLUMN IF NOT EXISTS email VARCHAR(255) UNIQUE,
            ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255),
            ADD COLUMN IF NOT EXISTS birth_date DATE
        `)
        console.log('✅ Колонки для аутентификации добавлены')

        // Создаем индекс для быстрого поиска по email
        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email)
        `)
        console.log('✅ Индекс для email создан')

        await client.end()
        console.log('🎉 Миграция завершена!')

    } catch (err) {
        console.error('❌ Ошибка миграции:', err)
    }
}

migrate()
