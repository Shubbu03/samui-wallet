import { useAccountLive } from '@workspace/db-react/use-account-live'
import { useAccountSetActive } from '@workspace/db-react/use-account-set-active'
import { useMemo } from 'react'

export function useSignableAccounts() {
  const accounts = useAccountLive()
  const { mutateAsync } = useAccountSetActive()

  const signableAccounts = useMemo(() => accounts.filter((account) => account.type !== 'Watched'), [accounts])

  return {
    accounts: signableAccounts,
    hasSignableAccounts: signableAccounts.length > 0,
    setActive: (id: string) => mutateAsync({ id }),
  }
}
