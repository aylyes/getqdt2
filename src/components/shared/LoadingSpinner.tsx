import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LoadingSpinnerProps {
  text?: string;
  className?: string;
}

export function LoadingSpinner({ text, className = '' }: LoadingSpinnerProps) {
  const { t } = useTranslation();

  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
      <p className="mt-2 text-sm text-gray-500">
        {text || t('common.loading')}
      </p>
    </div>
  );
}