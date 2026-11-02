import { useCallback, useEffect, useState } from 'react'

// Hook base das consultas à API. Recebe uma função request(signal), que deve vir de
// useCallback para só mudar quando os parâmetros da consulta mudarem. null = não consultar.
//
// O resultado guarda qual requisição e qual tentativa o produziram. Assim o status é
// derivado: se o resultado guardado não é o da requisição atual, ela ainda está carregando.
export function useApiRequest(request) {
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState(null)

  useEffect(() => {
    if (!request) return undefined

    // Ao trocar de par ou período, o cleanup cancela a requisição anterior.
    const controller = new AbortController()

    async function run() {
      try {
        const data = await request(controller.signal)
        setResult({ request, attempt, data, error: null })
      } catch (error) {
        if (error.name === 'AbortError') return
        setResult({ request, attempt, data: null, error })
      }
    }

    run()
    return () => controller.abort()
  }, [request, attempt])

  const retry = useCallback(() => setAttempt((current) => current + 1), [])

  if (!request) return { status: 'idle', data: null, error: null, retry }

  const isCurrent = result?.request === request && result.attempt === attempt
  if (!isCurrent) return { status: 'loading', data: null, error: null, retry }
  if (result.error) return { status: 'error', data: null, error: result.error, retry }
  return { status: 'ready', data: result.data, error: null, retry }
}
