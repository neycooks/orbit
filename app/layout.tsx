import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Orbit API',
    description: 'The Ultimate EA FC Data Engine. Real-time player stats via REST API.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="antialiased" style={{ background: '#0d0d0d', color: '#ffffff' }}>
                {children}
            </body>
        </html>
    );
}