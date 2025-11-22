import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/jwt';
import { setAuthCookies } from '@/lib/cookies';

export async function POST(request: NextRequest) {
    try {
        const { name, email, birthDate, password } = await request.json();

        // Проверяем, что все поля заполнены
        if (!name || !email || !birthDate || !password) {
            return NextResponse.json(
                { error: 'Все поля обязательны для заполнения' },
                { status: 400 }
            );
        }

        // Проверяем, существует ли уже пользователь с таким email
        const existingUser = await query(
            'SELECT id FROM profiles WHERE email = $1',
            [email]
        );

        if (existingUser.rows.length > 0) {
            return NextResponse.json(
                { error: 'Пользователь с таким email уже существует' },
                { status: 409 }
            );
        }

        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, 12);

        // Создаем пользователя в БД
        const result = await query(
            `INSERT INTO profiles (username, email, birth_date, password_hash, created_at) 
             VALUES ($1, $2, $3, $4, NOW()) 
             RETURNING id, username, email, birth_date, created_at`,
            [name, email, birthDate, hashedPassword]
        );

        const user = result.rows[0];

        // Генерируем JWT токен для нового пользователя
        const token = generateToken({
            userId: user.id,
            email: user.email
        });

        const userData = {
            id: user.id,
            name: user.username,
            email: user.email,
            birthDate: user.birth_date
        };

        // Устанавливаем HTTP-only cookies
        setAuthCookies(token, JSON.stringify(userData));

        return NextResponse.json({
            success: true,
            user: userData
        });

    } catch (error) {
        console.error('Ошибка регистрации:', error);
        return NextResponse.json(
            { error: 'Внутренняя ошибка сервера' },
            { status: 500 }
        );
    }
}
