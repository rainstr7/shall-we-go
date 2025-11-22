const { Client } = require('pg')

// Email: test@example.com
// Пароль: password123

const client = new Client({
    host: '212.233.79.124',
    port: 5432,
    user: 'ihahn',
    password: '2E)yh51nXm5716rb9',
    database: 'swg',
    ssl: false
})

async function checkUsers() {
    try {
        await client.connect()
        console.log('✅ Подключение к БД успешно')

        // Проверяем структуру таблицы
        const tableInfo = await client.query(`
            SELECT column_name, data_type, is_nullable 
            FROM information_schema.columns 
            WHERE table_name = 'profiles' 
            ORDER BY ordinal_position
        `)
        console.log('\n📋 Структура таблицы profiles:')
        tableInfo.rows.forEach(row => {
            console.log(`  ${row.column_name}: ${row.data_type} (nullable: ${row.is_nullable})`)
        })

        // Проверяем количество пользователей
        const countResult = await client.query('SELECT COUNT(*) as count FROM profiles')
        console.log(`\n👥 Всего пользователей в БД: ${countResult.rows[0].count}`)

        // Показываем всех пользователей (без паролей)
        const usersResult = await client.query(`
            SELECT id, username, email, birth_date, telegram_id, created_at 
            FROM profiles 
            ORDER BY created_at DESC
        `)

        if (usersResult.rows.length > 0) {
            console.log('\n👤 Пользователи в БД:')
            usersResult.rows.forEach(user => {
                console.log(`  ID: ${user.id}`)
                console.log(`  Имя: ${user.username || 'не указано'}`)
                console.log(`  Email: ${user.email || 'не указано'}`)
                console.log(`  Дата рождения: ${user.birth_date || 'не указана'}`)
                console.log(`  Telegram ID: ${user.telegram_id || 'не указан'}`)
                console.log(`  Создан: ${user.created_at}`)
                console.log('  ---')
            })
        } else {
            console.log('\n❌ Пользователей в БД нет')
        }

        await client.end()
        console.log('\n🎉 Проверка завершена!')

    } catch (err) {
        console.error('❌ Ошибка:', err)
    }
}

checkUsers()
