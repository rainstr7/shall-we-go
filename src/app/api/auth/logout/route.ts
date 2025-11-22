import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/jwt';
import { clearAuthCookies } from '@/lib/cookies';

export async function POST(request: NextRequest) {
    try {
        // Проверяем JWT токен
        const payload = requireAuth(request);
        
        if (!payload) {
            return NextResponse.json(
                { error: 'Не авторизован' },
                { status: 401 }
            );
        }

        // Очищаем HTTP-only cookies
        clearAuthCookies();

        // В реальном приложении здесь можно добавить токен в черный список
        // или сохранить время выхода в БД для отслеживания сессий
        
        return NextResponse.json({
            success: true,
            message: 'Выход выполнен успешно'
        });

    } catch (error) {
        console.error('Ошибка выхода:', error);
        return NextResponse.json(
            { error: 'Внутренняя ошибка сервера' },
            { status: 500 }
        );
    }
}
