import { useAccountActive } from '@workspace/db-react/use-account-active'
import { useTranslation } from '@workspace/i18n'
import { Button } from '@workspace/ui/components/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select'
import { UiIcon } from '@workspace/ui/components/ui-icon'
import { useMemo } from 'react'
import { Link } from 'react-router'
import { useSignableAccounts } from '../data-access/use-signable-accounts.tsx'
import { PortfolioUiAccountIcon } from './portfolio-ui-account-icon.tsx'

export function PortfolioUiSelectSigningAccount() {
  const { t } = useTranslation('portfolio')
  const account = useAccountActive()
  const { accounts, setActive, hasSignableAccounts } = useSignableAccounts()

  // finding if current account is in the signable accounts list
  const currentSignableAccountId = useMemo(() => {
    const found = accounts.find((a) => a.id === account.id)
    return found?.id
  }, [accounts, account.id])

  if (!hasSignableAccounts) {
    return (
      <div className="flex flex-col gap-4 p-4 text-center">
        <UiIcon className="mx-auto size-12 text-muted-foreground" icon="alert" />
        <div className="flex flex-col gap-2">
          <p className="font-semibold">{t(($) => $.sendNoSignableAccounts)}</p>
          <p className="text-muted-foreground text-sm">{t(($) => $.sendNoSignableAccountsDescription)}</p>
        </div>
        <Button asChild className="mx-auto" variant="outline">
          <Link to="/settings/wallets">Go to Settings</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <p className="font-semibold">{t(($) => $.sendSelectAccountTitle)}</p>
        <p className="text-muted-foreground text-sm">{t(($) => $.sendSelectAccountDescription)}</p>
      </div>
      <Select
        onValueChange={async (id) => {
          await setActive(id)
        }}
        {...(currentSignableAccountId ? { value: currentSignableAccountId } : {})}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={t(($) => $.sendSelectAccountPlaceholder)} />
        </SelectTrigger>
        <SelectContent>
          {accounts.map((account) => (
            <SelectItem key={account.id} value={account.id}>
              <div className="flex items-center gap-2">
                <PortfolioUiAccountIcon type={account.type} />
                <span className="font-mono">{account.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
