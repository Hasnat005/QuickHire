import { useEffect } from 'react'

export const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} | QuickHire` : 'QuickHire'
  }, [title])
}
