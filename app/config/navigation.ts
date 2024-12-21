// src/config/navigation.ts

import { 
    FileText, 
    Upload, 
    UserCheck, 
    History, 
    BarChart2, 
    Share2, 
    Settings,
    User 
  } from 'lucide-react';
  
  // Common navigation items for all roles
  export const commonNavigation = [
    {
      title: 'Profile',
      path: '/dashboard/profile',
      icon: User,
      description: 'Manage your profile settings'
    },
    {
      title: 'History',
      path: '/dashboard/history',
      icon: History,
      description: 'View your activity history'
    },
    {
      title: 'Settings',
      path: '/dashboard/settings',
      icon: Settings,
      description: 'Manage application settings'
    }
  ];
  
  // Role-specific features and routes
  export const roleNavigation = {
    Individual: [
      {
        title: 'My Documents',
        path: '/dashboard/individual',
        icon: FileText,
        description: 'View and manage your documents',
        features: [
          { title: 'Upload Documents', component: 'DocumentRequest' },
          { title: 'Share Documents', component: 'SharingModal' },
          { title: 'Document List', component: 'DocumentsList' }
        ]
      },
      {
        title: 'Document Sharing',
        path: '/dashboard/individual/share',
        icon: Share2,
        description: 'Share documents with organizations',
        features: [
          { title: 'Share History', component: 'ShareHistory' },
          { title: 'Access Control', component: 'AccessControl' }
        ]
      }
    ],
    Issuer: [
      {
        title: 'Issue Documents',
        path: '/dashboard/issuer',
        icon: Upload,
        description: 'Issue new documents',
        features: [
          { title: 'Upload Documents', component: 'UploadModal' },
          { title: 'Issued Documents', component: 'IssuedDocuments' },
          { title: 'Quick Actions', component: 'IssuerActions' }
        ]
      },
      {
        title: 'Templates',
        path: '/dashboard/issuer/templates',
        icon: FileText,
        description: 'Manage document templates',
        features: [
          { title: 'Create Template', component: 'CreateTemplate' },
          { title: 'Template List', component: 'TemplateList' }
        ]
      }
    ],
    Verifier: [
      {
        title: 'Verify Documents',
        path: '/dashboard/verifier',
        icon: UserCheck,
        description: 'Verify submitted documents',
        features: [
          { title: 'Document Table', component: 'DocumentTable' },
          { title: 'Verification Form', component: 'VerificationForm' },
          { title: 'Quick Search', component: 'SearchBar' }
        ]
      },
      {
        title: 'Statistics',
        path: '/dashboard/verifier/stats',
        icon: BarChart2,
        description: 'View verification statistics',
        features: [
          { title: 'Verification Stats', component: 'Stats' },
          { title: 'Analytics', component: 'Analytics' }
        ]
      }
    ]
  };