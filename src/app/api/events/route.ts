import { NextRequest, NextResponse } from 'next/server';
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

        // Пока заглушка - вернём тестовые события
        return NextResponse.json([
            {
                id: 1,
                title: "Кофе в Центре",
                time: "19:00",
                participants: 3,
                maxParticipants: 6,
                location: "Центральный район"
            }
        ]);
    } catch (error) {
        console.error('Ошибка получения событий:', error);
        return NextResponse.json(
            { error: 'Внутренняя ошибка сервера' },
            { status: 500 }
        );
    }
}
