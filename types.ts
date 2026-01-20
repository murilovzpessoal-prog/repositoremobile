
import React from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  badge?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export interface ToolCardData {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
}