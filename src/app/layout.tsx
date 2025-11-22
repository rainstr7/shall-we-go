import React from "react";
import "@/styles/globals.css";
import { ThemeProvider } from "./ThemeProvider";
import { I18nProvider } from "@/providers/I18nProvider";
import { QueryProvider } from "@/providers/QueryProvider";

export const metadata = {
    title: 'Shall We Go',
    description: 'Приложение для спонтанных встреч',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
            <QueryProvider>
                <I18nProvider>
                    <ThemeProvider>
                        {children}
                    </ThemeProvider>
                </I18nProvider>
            </QueryProvider>
        </body>
        </html>
    )
}
