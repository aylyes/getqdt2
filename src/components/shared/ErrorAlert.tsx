import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ErrorAlertProps {
  message: string;
  showContactSupport?: boolean;
}

export function ErrorAlert({ message, showContactSupport = false }: ErrorAlertProps) {
  const { t } = useTranslation('errors');

  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{t('general.title')}</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{message}</p>
            {showContactSupport && (
              <p className="mt-1">{t('general.contactSupport')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}