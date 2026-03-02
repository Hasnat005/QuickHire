import { createContext, useCallback, useMemo, useState } from 'react'
import { TOKEN_STORAGE_KEY } from '../constants/auth'

const AuthContext = createContext(null)

const decodeJwtPayload = (token) => {
  try {
    const payload = token.split('.')[1]
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const decoded = JSON.parse(window.atob(base64))
    return decoded
  } catch {
    return null
  }
}

const isTokenExpired = (payload) => {
  if (!payload?.exp) {
    return true
  }

  const nowInSeconds = Math.floor(Date.now() / 1000)
  return payload.exp <= nowInSeconds
}

const mapPayloadToUser = (payload) => {
  return {
    id: payload.id || payload.sub,
    name: payload.name,
    email: payload.email,
    role: payload.role,
  }
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => {
    const savedToken = localStorage.getItem(TOKEN_STORAGE_KEY)

    if (!savedToken) {
      return { token: null, user: null }
    }

    const payload = decodeJwtPayload(savedToken)

    if (!payload || isTokenExpired(payload)) {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
      return { token: null, user: null }
    }

    return {
      token: savedToken,
      user: mapPayloadToUser(payload),
    }
  })

  const login = useCallback(({ token: nextToken, user: nextUser }) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, nextToken)

    if (nextUser) {
      setAuthState({ token: nextToken, user: nextUser })
      return
    }

    const payload = decodeJwtPayload(nextToken)
    setAuthState({
      token: nextToken,
      user: payload ? mapPayloadToUser(payload) : null,
    })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    setAuthState({ token: null, user: null })
  }, [])

  const value = useMemo(
    () => ({
      user: authState.user,
      token: authState.token,
      login,
      logout,
      isAdmin: authState.user?.role === 'admin',
    }),
    [authState, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext }
