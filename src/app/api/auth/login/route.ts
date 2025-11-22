import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/jwt';
import { setAuthCookies } from '@/lib/cookies';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        // Проверяем, что поля заполнены
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email и пароль обязательны' },
                { status: 400 }
            );
        }

        // Ищем пользователя по email
        const userResult = await query(
            'SELECT id, username, email, birth_date, password_hash FROM profiles WHERE email = $1',
            [email]
        );

        if (userResult.rows.length === 0) {
            return NextResponse.json(
                { error: 'Неверный email или пароль' },
                { status: 401 }
            );
        }

        const user = userResult.rows[0];

        // Проверяем пароль
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Неверный email или пароль' },
                { status: 401 }
            );
        }

        // Генерируем JWT токен
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
        console.error('Ошибка логина:', error);
        return NextResponse.json(
            { error: 'Внутренняя ошибка сервера' },
            { status: 500 }
        );
    }
}
