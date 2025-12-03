import { useAccountActive } from '@workspace/db-react/use-account-active'
import type { ReactNode } from 'react'
import { PortfolioUiSelectSigningAccount } from './portfolio-ui-select-signing-account.tsx'

export function PortfolioUiSendGuard({ children }: { children: ReactNode }) {
  const account = useAccountActive()

  if (account.type === 'Watched') {
    return <PortfolioUiSelectSigningAccount />
  }

  return children
}
