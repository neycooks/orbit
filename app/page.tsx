'use client';

import { useState } from 'react';

function syntaxHighlight(json: string) {
    return json.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        (match: string) => {
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    return `<span style="color:#8878d0">${match.slice(0, -1)}</span>:`;
                }
                return `<span style="color:#5aab7a">${match}</span>`;
            }
            return `<span style="color:#b87080">${match}</span>`;
        }
    );
}

export default function Home() {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [results, setResults] = useState('');
    const [showResults, setShowResults] = useState(false);

    async function fetchData() {
        setLoading(true);
        setError(false);
        setShowResults(false);
        const query = input || 'mbappe';
        try {
            const res = await fetch(`https://orbit.is-a.dev/players?${query}`, {
                headers: { Accept: 'application/json' },
            });
            if (!res.ok) throw new Error();
            const data = await res.json();
            setResults(syntaxHighlight(JSON.stringify(data, null, 2)));
            setShowResults(true);
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen" style={{ background: '#0d0d0d' }}>

            {/* nav */}
            <nav
                className="fixed top-0 w-full z-50"
                style={{
                    background: 'rgba(13,13,13,0.85)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: '1px solid #1e1e1e',
                }}
            >
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div
                        style={{
                            fontSize: '1.125rem',
                            fontWeight: 700,
                            letterSpacing: '-0.02em',
                            color: '#e8e8e8',
                        }}
                    >
                        orbit api
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" style={{ color: '#707070', fontSize: '0.875rem', fontWeight: 500 }}>features</a>
                        <a href="#docs" style={{ color: '#707070', fontSize: '0.875rem', fontWeight: 500 }}>docs</a>
                        <a href="#explorer" style={{ color: '#707070', fontSize: '0.875rem', fontWeight: 500 }}>explorer</a>
                        <a
                            href="#get-started"
                            style={{
                                background: '#1a1a1a',
                                border: '1px solid #252525',
                                padding: '8px 16px',
                                borderRadius: 8,
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                color: '#a0a0a0',
                            }}
                        >
                            get api
                        </a>
                    </div>
                    <button
                        className="md:hidden"
                        style={{ color: '#666' }}
                        onClick={() => {
                            const m = document.getElementById('mmenu');
                            if (m) m.classList.toggle('hidden');
                        }}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
                <div id="mmenu" className="hidden md:hidden px-6 pb-4 space-y-3 text-sm" style={{ color: '#606060' }}>
                    <a href="#features" className="block hover:text-gray-300">features</a>
                    <a href="#docs" className="block hover:text-gray-300">docs</a>
                    <a href="#explorer" className="block hover:text-gray-300">explorer</a>
                    <a href="#get-started" className="block hover:text-gray-300">get api</a>
                </div>
            </nav>

            {/* hero */}
            <section
                className="flex items-center justify-center px-6"
                style={{ minHeight: '100vh', paddingTop: '80px' }}
            >
                <div className="max-w-3xl mx-auto text-center">
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: '6px 14px',
                            background: '#141414',
                            border: '1px solid #232323',
                            borderRadius: 100,
                            fontSize: '0.8125rem',
                            color: '#787878',
                            marginBottom: 32,
                        }}
                    >
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4a9c5d', flexShrink: 0 }} />
                        api is live
                    </div>
                    <h1
                        style={{
                            fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
                            fontWeight: 800,
                            marginBottom: 20,
                            lineHeight: 1.08,
                            letterSpacing: '-0.035em',
                            color: '#f0f0f0',
                        }}
                    >
                        the ultimate ea fc data engine.
                    </h1>
                    <p
                        style={{
                            fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
                            color: '#606060',
                            maxWidth: 540,
                            lineHeight: 1.65,
                            margin: '0 auto 40px',
                        }}
                    >
                        real-time player stats, club data and league info via a fast rest api. built for devs who wanna
                        build fifa apps without the headache.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                            href="#get-started"
                            style={{
                                background: '#f5f5f5',
                                color: '#0d0d0d',
                                fontWeight: 600,
                                fontSize: '0.9375rem',
                                padding: '12px 28px',
                                borderRadius: 10,
                            }}
                        >
                            get api key →
                        </a>
                        <a
                            href="#docs"
                            style={{
                                background: 'transparent',
                                color: '#707070',
                                fontWeight: 500,
                                fontSize: '0.9375rem',
                                padding: '12px 24px',
                                borderRadius: 10,
                                border: '1px solid #202020',
                            }}
                        >
                            read docs
                        </a>
                    </div>
                    <p style={{ marginTop: 56, fontSize: '0.8125rem', color: '#484848' }}>
                        trusted by devs building the next gen of fifa apps
                    </p>
                </div>
            </section>

            {/* code demo */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <div
                        style={{
                            background: '#141414',
                            border: '1px solid #1e1e1e',
                            borderRadius: 14,
                            overflow: 'hidden',
                        }}
                    >
                        <div
                            style={{
                                background: '#181818',
                                borderBottom: '1px solid #1e1e1e',
                                padding: '12px 16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                            }}
                        >
                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#b86060' }} />
                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#c09040' }} />
                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#5aab7a' }} />
                            <span style={{ color: '#404040', fontSize: '0.75rem', marginLeft: 8 }}>bash</span>
                        </div>
                        <div style={{ padding: 24, fontSize: '0.875rem', lineHeight: 1.9, overflowX: 'auto' }}>
                            <p style={{ color: '#505050', marginBottom: 8 }}># fetch players with ovr above 90</p>
                            <pre>
                                <span style={{ color: '#9080d8' }}>curl</span>{' '}
                                <span style={{ color: '#5aab7a' }}>-X GET</span>{' '}
                                <span style={{ color: '#c09040' }}>&quot;https://orbit.is-a.dev/players?ovr&gt;90&quot;</span>
                            </pre>
                            <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #1e1e1e' }}>
                                <p style={{ color: '#505050', marginBottom: 8 }}># response</p>
                                <pre className="code-font" style={{ lineHeight: 1.8 }}>
                                    <span style={{ color: '#505050' }}>{'{'}</span>{'\n'}
                                    {'  '}<span style={{ color: '#8878d0' }}>&quot;success&quot;</span>: <span style={{ color: '#b87080' }}>true</span>,{'\n'}
                                    {'  '}<span style={{ color: '#8878d0' }}>&quot;count&quot;</span>: <span style={{ color: '#b87080' }}>3</span>,{'\n'}
                                    {'  '}<span style={{ color: '#8878d0' }}>&quot;payload&quot;</span>: <span style={{ color: '#505050' }}>[</span>{'\n'}
                                    {'    '}<span style={{ color: '#505050' }}>{'{'}</span>{'\n'}
                                    {'      '}<span style={{ color: '#8878d0' }}>&quot;name&quot;</span>: <span style={{ color: '#5aab7a' }}>&quot;K. Mbappé&quot;</span>,{'\n'}
                                    {'      '}<span style={{ color: '#8878d0' }}>&quot;ovr&quot;</span>: <span style={{ color: '#b87080' }}>91</span>,{'\n'}
                                    {'      '}<span style={{ color: '#8878d0' }}>&quot;pos&quot;</span>: <span style={{ color: '#5aab7a' }}>&quot;ST&quot;</span>,{'\n'}
                                    {'      '}<span style={{ color: '#8878d0' }}>&quot;club&quot;</span>: <span style={{ color: '#5aab7a' }}>&quot;Real Madrid CF&quot;</span>,{'\n'}
                                    {'      '}<span style={{ color: '#8878d0' }}>&quot;league&quot;</span>: <span style={{ color: '#5aab7a' }}>&quot;LaLiga&quot;</span>{'\n'}
                                    {'    '}<span style={{ color: '#505050' }}>{'}'}</span>{'\n'}
                                    {'  '}<span style={{ color: '#505050' }}>]</span>{'\n'}
                                    <span style={{ color: '#505050' }}>{'}'}</span>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* features */}
            <section id="features" className="py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <h2
                            style={{
                                fontSize: 'clamp(1.875rem, 4vw, 2.375rem)',
                                fontWeight: 700,
                                letterSpacing: '-0.03em',
                                color: '#e8e8e8',
                                marginBottom: 12,
                            }}
                        >
                            built for performance
                        </h2>
                        <p style={{ fontSize: '1.0625rem', color: '#555' }}>everything you need to build the next fifa app</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                        {[
                            {
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                ),
                                title: 'ultra-low latency',
                                desc: 'powered by cloudflare workers with edge computing. avg response under 50ms worldwide.',
                            },
                            {
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                    </svg>
                                ),
                                title: 'comprehensive filtering',
                                desc: 'filter by ovr, position, nation, club, league and more with simple query params.',
                            },
                            {
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                ),
                                title: 'developer first',
                                desc: 'clean rest api, detailed errors, and responses ready to use in any stack.',
                            },
                        ].map((card, i) => (
                            <div
                                key={i}
                                style={{
                                    background: '#151515',
                                    border: '1px solid #1c1c1c',
                                    borderRadius: 14,
                                    padding: 28,
                                    transition: 'all 0.25s ease',
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLDivElement).style.background = '#181818';
                                    (e.currentTarget as HTMLDivElement).style.borderColor = '#242424';
                                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLDivElement).style.background = '#151515';
                                    (e.currentTarget as HTMLDivElement).style.borderColor = '#1c1c1c';
                                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                                }}
                            >
                                <div
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: 10,
                                        background: '#181818',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: 20,
                                        color: '#666',
                                    }}
                                >
                                    {card.icon}
                                </div>
                                <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, color: '#d8d8d8', marginBottom: 10 }}>
                                    {card.title}
                                </h3>
                                <p style={{ fontSize: '0.9rem', color: '#505050', lineHeight: 1.7 }}>{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* explorer */}
            <section id="explorer" className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2
                            style={{
                                fontSize: 'clamp(1.875rem, 4vw, 2.375rem)',
                                fontWeight: 700,
                                letterSpacing: '-0.03em',
                                color: '#e8e8e8',
                                marginBottom: 12,
                            }}
                        >
                            live api explorer
                        </h2>
                        <p style={{ fontSize: '1.0625rem', color: '#555' }}>test it right here. enter a name or filter below.</p>
                    </div>
                    <div
                        style={{
                            background: '#141414',
                            border: '1px solid #1e1e1e',
                            borderRadius: 14,
                            overflow: 'hidden',
                        }}
                    >
                        <div
                            style={{
                                background: '#181818',
                                borderBottom: '1px solid #1e1e1e',
                                padding: '12px 16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                            }}
                        >
                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#b86060' }} />
                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#c09040' }} />
                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#5aab7a' }} />
                            <span style={{ color: '#404040', fontSize: '0.75rem', marginLeft: 8 }}>explorer</span>
                        </div>
                        <div style={{ padding: 24 }}>
                            <div className="flex flex-col sm:flex-row gap-3 mb-5">
                                <input
                                    type="text"
                                    placeholder="eg: mbappe, ovr>90, pos=st"
                                    className="code-font"
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && fetchData()}
                                    style={{
                                        background: '#111',
                                        border: '1px solid #222',
                                        color: '#e0e0e0',
                                        padding: '12px 16px',
                                        borderRadius: 10,
                                        fontSize: '0.875rem',
                                        outline: 'none',
                                        width: '100%',
                                        flex: 1,
                                    }}
                                />
                                <button
                                    onClick={fetchData}
                                    disabled={loading}
                                    style={{
                                        background: loading ? '#555' : '#f5f5f5',
                                        color: '#0d0d0d',
                                        fontWeight: 600,
                                        fontSize: '0.875rem',
                                        padding: '12px 22px',
                                        borderRadius: 10,
                                        border: 'none',
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        whiteSpace: 'nowrap',
                                        flexShrink: 0,
                                    }}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    fetch data
                                </button>
                            </div>

                            {loading && (
                                <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 0' }}>
                                    <div
                                        style={{
                                            width: 22,
                                            height: 22,
                                            border: '2px solid #252525',
                                            borderTopColor: '#888',
                                            borderRadius: '50%',
                                            animation: 'spin 0.8s linear infinite',
                                        }}
                                    />
                                </div>
                            )}

                            {error && (
                                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                                    <p style={{ color: '#b86060', fontWeight: 500 }}>
                                        something went wrong. check your input and try again
                                </p>
                                    </p>
                                </div>
                            )}

                            {showResults && (
                                <div style={{ marginTop: 16 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#5aab7a' }} />
                                        <span style={{ fontSize: '0.75rem', color: '#505050' }}>response received</span>
                                    </div>
                                    <pre
                                        className="code-font"
                                        style={{
                                            background: '#0a0a0a',
                                            border: '1px solid #1a1a1a',
                                            borderRadius: 10,
                                            padding: 20,
                                            fontSize: '0.8125rem',
                                            lineHeight: 1.8,
                                            overflowX: 'auto',
                                        }}
                                        dangerouslySetInnerHTML={{ __html: results }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* docs */}
            <section id="docs" className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2
                            style={{
                                fontSize: 'clamp(1.875rem, 4vw, 2.375rem)',
                                fontWeight: 700,
                                letterSpacing: '-0.03em',
                                color: '#e8e8e8',
                                marginBottom: 12,
                            }}
                        >
                            api docs
                        </h2>
                        <p style={{ fontSize: '1.0625rem', color: '#555' }}>here's what you can hit</p>
                    </div>
                    <div style={{ background: '#141414', border: '1px solid #1e1e1e', borderRadius: 14, overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ background: '#181818', borderBottom: '1px solid #1e1e1e' }}>
                                <tr>
                                    <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: '#555', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                        endpoint
                                    </th>
                                    <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: '#555', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                        what it does
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { ep: '/players', desc: 'fetch all player data. filter by name, ovr, pos, club, nation, league' },
                                    { ep: '/random', desc: 'get a random player, or filtered random based on criteria' },
                                    { ep: '/clubs', desc: 'club info — stadium, league, roster' },
                                    { ep: '/leagues', desc: 'league data — name, country, clubs in it' },
                                    { ep: '/nations', desc: 'nation/team data with flag info and player counts' },
                                ].map((row, i) => (
                                    <tr
                                        key={i}
                                        style={{
                                            borderBottom: i === 4 ? 'none' : '1px solid #161616',
                                            transition: 'background 0.15s ease',
                                        }}
                                        onMouseEnter={e => ((e.currentTarget as HTMLTableRowElement).style.background = '#141414')}
                                        onMouseLeave={e => ((e.currentTarget as HTMLTableRowElement).style.background = 'transparent')}
                                    >
                                        <td style={{ padding: '16px 20px' }}>
                                            <code
                                                className="code-font"
                                                style={{
                                                    background: '#111',
                                                    padding: '3px 10px',
                                                    borderRadius: 6,
                                                    fontSize: '0.8125rem',
                                                    color: '#8080c8',
                                                    border: '1px solid #1e1e1e',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                {row.ep}
                                            </code>
                                        </td>
                                        <td style={{ padding: '16px 20px', fontSize: '0.9rem', color: '#505050' }}>{row.desc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* cta */}
            <section id="get-started" className="py-20 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <div
                        style={{
                            background: '#141414',
                            border: '1px solid #1e1e1e',
                            borderRadius: 16,
                            padding: 48,
                        }}
                    >
                        <h2
                            style={{
                                fontSize: 'clamp(1.875rem, 4vw, 2.375rem)',
                                fontWeight: 700,
                                letterSpacing: '-0.03em',
                                color: '#e8e8e8',
                                marginBottom: 12,
                            }}
                        >
                            ready to build?
                        </h2>
                        <p style={{ fontSize: '1.0625rem', color: '#555', marginBottom: 32 }}>
                            grab your key and start integrating fifa data into your project today.
                        </p>
                        <span
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 8,
                                background: '#f5f5f5',
                                color: '#0d0d0d',
                                fontWeight: 600,
                                fontSize: '0.9375rem',
                                padding: '14px 32px',
                                borderRadius: 10,
                                cursor: 'default',
                            }}
                        >
                            api key — coming soon
                        </span>
                    </div>
                </div>
            </section>

            <style jsx>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </main>
    );
}