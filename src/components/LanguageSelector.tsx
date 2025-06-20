
import { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useI18n } from '../hooks/useI18n';
import { Language, languageNames, getLanguageFlag } from '../utils/i18n';

const LanguageSelector = () => {
  const { language, setLanguage, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  const languages: Language[] = ['en', 'ja', 'es', 'fr', 'ko', 'zh'];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="cozy-card hover:scale-105 transition-all"
          aria-label={t.language}
        >
          <Globe className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-background border border-border shadow-lg z-50"
        sideOffset={5}
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{getLanguageFlag(lang)}</span>
              <span className="text-sm">{languageNames[lang]}</span>
            </div>
            {language === lang && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
