import { AppArea } from '@/config/areas/areaConfig';
import { MenuItem } from '@/interface/common';

export type SidebarMenuConfig = MenuItem & { scope?: string[]; children?: SidebarMenuConfig[] };

export interface LayoutConfig {
  type: AppArea;
  title: string;
  logoPath?: string;
  showFooter?: boolean;
  showCompactToggle?: boolean;
  showLanguageSwitcher?: boolean;
  logoutRedirect?: string;
  settingsPath?: string;
  dashboardPath?: string;
  profilePath?: string[];
  footerText?: string;
  menus: SidebarMenuConfig[];
}

export interface User {
  username?: string;
  name?: string;
  scope?: string[];
  areaScope?: string[];
  avatar?: string;
  image?: string;
  email?: string;
}
