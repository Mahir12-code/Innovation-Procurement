import {
  LayoutDashboard,
  Target,
  Search,
  CheckSquare,
  Rocket,
  CreditCard,
  Scale,
  FileText,
  UserCheck,
  Building2,
  Users,
  ShieldCheck,
  Award,
  MessageSquare,
  Settings,
  HelpCircle,
  User,
  Bell,
  FileCheck,
  Coins
} from 'lucide-react';

export const PORTAL_NAV_CONFIG = {
  government: {
    portalTitle: 'Government Portal',
    badge: 'Officer View',
    items: [
      {
        name: 'Dashboard',
        path: '/government/dashboard',
        icon: LayoutDashboard
      },
      {
        name: 'Problem Statements',
        path: '/government/problem-statements',
        icon: Target
      },
      {
        name: 'Applications',
        path: '/government/applications',
        icon: FileText
      },
      {
        name: 'Pilot Projects',
        path: '/government/pilots',
        icon: Rocket
      },
      {
        name: 'Procurement',
        path: '/government/procurement',
        icon: Scale
      },
      {
        name: 'Messages',
        path: '/government/messages',
        icon: MessageSquare
      },
      {
        name: 'Settings',
        path: '/government/settings',
        icon: Settings
      }
    ],
    bottomItems: [
      {
        name: 'Help & Support',
        path: '/government/help',
        icon: HelpCircle
      },
      {
        name: 'Officer Profile',
        path: '/government/profile',
        icon: User
      }
    ]
  },
  startup: {
    portalTitle: 'Startup Innovation Desk',
    badge: 'Startup View',
    items: [
      { name: 'Dashboard', path: '/startup/dashboard', icon: LayoutDashboard },
      { name: 'Opportunities', path: '/startup/opportunities', icon: Target },
      { name: 'Applications', path: '/startup/applications', icon: FileText },
      { name: 'Pilot Execution Tracker', path: '/startup/pilots', icon: Rocket },
      { name: 'Clarifications', path: '/startup/clarifications', icon: MessageSquare },
      { name: 'Document Vault', path: '/startup/documents', icon: FileCheck },
      { name: 'Schemes & Grants', path: '/startup/schemes', icon: Coins },
      { name: 'Company Profile', path: '/startup/profile', icon: Building2 }
    ]
  },
  expert: {
    portalTitle: 'Technical Jury Portal',
    badge: 'Jury View',
    items: [
      { name: 'Dashboard', path: '/expert/dashboard', icon: LayoutDashboard },
      { name: 'Score Proposals', path: '/expert/evaluations', icon: CheckSquare },
      { name: 'Field Validations', path: '/expert/validations', icon: Award }
    ]
  },
  admin: {
    portalTitle: 'Platform Administration',
    badge: 'Admin View',
    items: [
      { name: 'Admin Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
      { name: 'User Management', path: '/admin/users', icon: Users },
      { name: 'Audit & Compliance Logs', path: '/admin/audit', icon: ShieldCheck }
    ]
  }
};
