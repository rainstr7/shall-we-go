import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/jwt';

export async function GET(request: NextRequest) {
    try {
        // Проверяем JWT токен
        const payload = requireAuth(request);
        
        if (!payload) {
            return NextResponse.json(
                { error: 'Не авторизован' },
                { status: 401 }
            );
        }

        // Получаем данные пользователя из БД
        const userResult = await query(
            'SELECT id, username, email, birth_date FROM profiles WHERE id = $1',
            [payload.userId]
        );

        if (userResult.rows.length === 0) {
            return NextResponse.json(
                { error: 'Пользователь не найден' },
                { status: 404 }
            );
        }

        const user = userResult.rows[0];

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                name: user.username,
                email: user.email,
                birthDate: user.birth_date
            }
        });

    } catch (error) {
        console.error('Ошибка получения пользователя:', error);
        return NextResponse.json(
            { error: 'Внутренняя ошибка сервера' },
            { status: 500 }
        );
    }
}
