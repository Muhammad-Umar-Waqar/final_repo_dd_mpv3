import { useTheme } from 'next-themes';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tootip";
import { useTranslations } from '../utils/i18n';

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
        const { t } = useTranslations();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button
                className="p-2 bg-transparent rounded-full hover:bg-secondary text-foreground"
                disabled
            >
                <div className="w-5 h-5 animate-pulse bg-transparent rounded-full" />
            </button>
        );
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        className="p-2 rounded-full hover:bg-secondary text-foreground"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <IconSun className="w-5 h-5" />
                        ) : (
                            <IconMoon className="w-5 h-5" />
                        )}
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    {theme === 'dark' ? t('theme.light') : t('theme.dark')}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
} 