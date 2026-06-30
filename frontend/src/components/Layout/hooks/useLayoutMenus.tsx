import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu } from 'lucide-react';
import { MenuItem } from '@/interface/common';

type MenuInput = MenuItem & { scope?: string[]; children?: MenuInput[] };

interface UseLayoutMenusProps {
  menus: MenuInput[];
  layoutType: 'admin' | 'default';
  user: { scope?: string[] } | null | undefined;
}

const hasValidScope = (itemScope: string[], userScope: string[]) => itemScope.length === 0 || userScope.some((scope) => itemScope.includes(scope));

const processChildren = (children: MenuInput[] | undefined, userScope: string[], t: (key: string) => string) => {
  if (!children) return undefined;

  const filteredChildren = children.filter((c) => hasValidScope(c.scope ?? [], userScope));
  if (filteredChildren.length === 0) return undefined;

  return filteredChildren.map((c) => ({ ...c, label: t(c.label) }));
};

export const useLayoutMenus = ({ menus, layoutType, user }: UseLayoutMenusProps) => {
  const { t } = useTranslation();
  const [processedMenus, setProcessedMenus] = useState<MenuItem[]>([]);

  useEffect(() => {
    if (layoutType === 'admin') {
      setProcessedMenus(
        menus.map((menu) => ({
          ...menu,
          label: t(menu.label),
          icon: menu.icon ?? Menu,
        })),
      );
    } else if (menus && user?.scope) {
      const userScope = user.scope;
      const filteredMenus = menus
        .filter((x) => hasValidScope(x.scope ?? [], userScope))
        .map((x) => ({
          ...x,
          icon: x.icon ?? Menu,
          label: t(x.label),
          children: processChildren(x.children, userScope, t),
        }));
      setProcessedMenus(filteredMenus);
    }
  }, [menus, layoutType, user, t]);

  return processedMenus;
};
