'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('GlobalError caught:', error)
  }, [error])

  return (
    <html>
      <body style={{ fontFamily: 'monospace', padding: '2rem' }}>
        <h2 style={{ color: 'red' }}>Application Error</h2>
        <p>
          <strong>Message:</strong> {error.message || '(no message)'}
        </p>
        {error.digest && (
          <p>
            <strong>Digest:</strong> {error.digest}
          </p>
        )}
        <pre
          style={{
            background: '#f5f5f5',
            padding: '1rem',
            overflowX: 'auto',
            fontSize: '0.8rem',
          }}
        >
          {error.stack}
        </pre>
        <button onClick={reset}>Try again</button>
      </body>
    </html>
  )
}
