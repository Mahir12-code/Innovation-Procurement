import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { GovernmentPortalProvider } from '../context/GovernmentPortalContext';
import { StartupPortalProvider } from '../context/StartupPortalContext';

// Public Pages
import { HomePage } from '../pages/public/HomePage';
import { LoginPage } from '../pages/public/LoginPage';
import { RegisterPage } from '../pages/public/RegisterPage';
import { PlaceholderPage } from '../pages/public/PlaceholderPage';

// Government Portal Pages
import { GovernmentDashboardPage } from '../pages/government/GovernmentDashboardPage';
import { ActiveProblemStatementsPage } from '../pages/government/ActiveProblemStatementsPage';
import { ApplicationsReceivedPage } from '../pages/government/ApplicationsReceivedPage';
import { ApplicationsVerificationPage } from '../pages/government/ApplicationsVerificationPage';
import { ApplicationsEvaluationPage } from '../pages/government/ApplicationsEvaluationPage';
import { ShortlistedStartupsPage } from '../pages/government/ShortlistedStartupsPage';
import { ActivePilotsPage } from '../pages/government/ActivePilotsPage';
import { PilotAlertsPage } from '../pages/government/PilotAlertsPage';
import { PendingActionsPage } from '../pages/government/PendingActionsPage';
import { GovernmentSettingsPage } from '../pages/government/GovernmentSettingsPage';

// Startup Portal Pages
import {
  StartupDashboardPage,
  DiscoverOpportunitiesPage,
  OpportunityDetailsPage,
  ApplicationWizardPage,
  MyApplicationsPage,
  ApplicationDetailsPage,
  ClarificationResponsePage,
  StartupDocumentsPage,
  StartupProfilePage,
  StartupSelfAssessmentPage,
  StartupSchemesPage,
  StartupNotificationsPage,
  StartupPilotsPage,
  StartupPilotDetailsPage
} from '../pages/startup';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        
        {/* Navigation Routes requested by user */}
        <Route
          path="/about"
          element={
            <PlaceholderPage
              title="About Sarkar Setu"
              role="Public Information"
              description="A startup-friendly public procurement bridge enabling Government of Maharashtra to discover, pilot, and scale innovation."
            />
          }
        />
        <Route
          path="/schemes"
          element={
            <PlaceholderPage
              title="Government Schemes & Innovation Tracks"
              role="Government Schemes"
              description="Explore government grants, sandbox subsidies, and procurement scale-up schemes for startups."
            />
          }
        />
        <Route
          path="/evaluator"
          element={
            <PlaceholderPage
              title="Evaluator & Technical Jury Portal"
              role="Evaluation Desk"
              description="Independent scoring matrix, IIT/STQC audit panels, and technical proposal assessments."
            />
          }
        />
        <Route
          path="/pilot"
          element={
            <PlaceholderPage
              title="Sandbox Pilot Testing Framework"
              role="Sandbox Operations"
              description="Live field deployments, IoT telemetry monitoring, and milestone-linked tranche verifications."
            />
          }
        />
        <Route
          path="/eligibility"
          element={
            <PlaceholderPage
              title="Startup Eligibility Criteria"
              role="Compliance & Guidelines"
              description="DPIIT recognition guidelines, turnover exemptions, and innovation credential requirements."
            />
          }
        />
        <Route
          path="/initiatives"
          element={
            <PlaceholderPage
              title="Government of Maharashtra Initiatives"
              role="State Initiatives"
              description="Flagship technological modernization programs and mission mode procurement drives across Maharashtra."
            />
          }
        />

        {/* Existing helpful routes */}
        <Route
          path="/how-it-works"
          element={
            <PlaceholderPage
              title="10-Stage Procurement SOP & Guidelines"
              role="Public Information"
              description="Detailed operating procedure for startup discovery, sandbox piloting, and GeM scaling."
            />
          }
        />
        <Route
          path="/challenges"
          element={
            <PlaceholderPage
              title="Open Public Challenges Directory"
              role="Public Innovation"
              description="Explore live department problem statements open for startup proposals."
            />
          }
        />

        {/* Interactive Working Authentication & Registration Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Dashboard Routes (Role-Aware Dashboard Layout) */}
      <Route element={<DashboardLayout />}>
        {/* Government Portal */}
        <Route
          path="/government"
          element={
            <GovernmentPortalProvider>
              <Outlet />
            </GovernmentPortalProvider>
          }
        >
          <Route index element={<Navigate to="/government/dashboard" replace />} />
          <Route path="dashboard" element={<GovernmentDashboardPage />} />
          <Route path="problem-statements" element={<ActiveProblemStatementsPage />} />
          <Route path="challenges" element={<ActiveProblemStatementsPage />} />
          <Route path="applications" element={<ApplicationsReceivedPage />} />
          <Route path="applications/verification" element={<ApplicationsVerificationPage />} />
          <Route path="applications/evaluation" element={<ApplicationsEvaluationPage />} />
          <Route path="evaluation" element={<ApplicationsEvaluationPage />} />
          <Route path="shortlisted-startups" element={<ShortlistedStartupsPage />} />
          <Route path="pilots" element={<ActivePilotsPage />} />
          <Route path="pilots/alerts" element={<PilotAlertsPage />} />
          <Route path="pending-actions" element={<PendingActionsPage />} />
          <Route
            path="discovery"
            element={
              <PlaceholderPage
                title="Startup Discovery & Repository Matchmaking"
                role="Government"
                description="Search and match DPIIT-registered startups by technology and TRL level."
              />
            }
          />
          <Route
            path="grants"
            element={
              <PlaceholderPage
                title="Grants & Milestone Funding Ledger"
                role="Government"
                description="Direct benefit transfers, escrow account tranche releases, and milestone validations."
              />
            }
          />
          <Route
            path="payments"
            element={<Navigate to="/government/grants" replace />}
          />
          <Route
            path="procurement"
            element={
              <PlaceholderPage
                title="Scale-Up & Procurement Sanction Committee"
                role="Government"
                description="Issue post-pilot purchase orders, GeM catalogue listings, and scaling approvals."
              />
            }
          />
          <Route
            path="reports"
            element={
              <PlaceholderPage
                title="Procurement & Pilot MIS Reports"
                role="Government"
                description="Generate consolidated executive analytics, audit reports, and departmental metrics."
              />
            }
          />
          <Route
            path="messages"
            element={
              <PlaceholderPage
                title="Department Communications Desk"
                role="Government"
                description="Secure messaging threads, milestone clarification requests, and applicant correspondences."
              />
            }
          />
          <Route
            path="settings"
            element={<GovernmentSettingsPage />}
          />
          <Route
            path="profile"
            element={
              <PlaceholderPage
                title="Nodal Officer Profile & Credentials"
                role="Government"
                description="View assigned designations, digital signature tokens, and verified credentials."
              />
            }
          />
          <Route
            path="help"
            element={
              <PlaceholderPage
                title="Help & Officer Support Desk"
                role="Government"
                description="SOP manuals, GeM onboarding guides, and helpdesk contact details for officers."
              />
            }
          />
        </Route>

        {/* Startup Portal */}
        <Route
          path="/startup"
          element={
            <StartupPortalProvider>
              <Outlet />
            </StartupPortalProvider>
          }
        >
          <Route index element={<Navigate to="/startup/dashboard" replace />} />
          <Route path="dashboard" element={<StartupDashboardPage />} />
          
          {/* Opportunities / RFP Discovery */}
          <Route path="opportunities" element={<DiscoverOpportunitiesPage />} />
          <Route path="opportunities/:id" element={<OpportunityDetailsPage />} />
          <Route path="challenges" element={<DiscoverOpportunitiesPage />} />
          <Route path="challenges/:id" element={<OpportunityDetailsPage />} />

          {/* Applications */}
          <Route path="applications" element={<MyApplicationsPage />} />
          <Route path="applications/new/:opportunityId" element={<ApplicationWizardPage />} />
          <Route path="applications/:id" element={<ApplicationDetailsPage />} />
          <Route path="applications/:id/edit" element={<ApplicationWizardPage />} />
          <Route path="applications/:id/clarifications" element={<ClarificationResponsePage />} />

          {/* Clarifications Desk */}
          <Route path="clarifications" element={<ClarificationResponsePage />} />

          {/* Active Sandbox Pilots & Telemetry */}
          <Route path="pilots" element={<StartupPilotsPage />} />
          <Route path="pilots/:id" element={<StartupPilotDetailsPage />} />
          <Route path="payments" element={<StartupPilotsPage />} />

          {/* Compliance Documents Vault */}
          <Route path="documents" element={<StartupDocumentsPage />} />

          {/* Company Profile */}
          <Route path="profile" element={<StartupProfilePage />} />

          {/* Evaluation Framework & Self-Assessment */}
          <Route path="self-assessment" element={<StartupSelfAssessmentPage />} />

          {/* Government Schemes & Grants */}
          <Route path="schemes" element={<StartupSchemesPage />} />

          {/* Notifications */}
          <Route path="notifications" element={<StartupNotificationsPage />} />
        </Route>

        {/* Expert Portal */}
        <Route path="/expert">
          <Route index element={<Navigate to="/expert/dashboard" replace />} />
          <Route
            path="dashboard"
            element={
              <PlaceholderPage
                title="Expert Jury Dashboard"
                role="Expert"
                description="Overview of assigned applications and pending evaluations."
              />
            }
          />
          <Route
            path="evaluations"
            element={
              <PlaceholderPage
                title="Technical Evaluations Queue"
                role="Expert"
                description="Score startup technical proposals against departmental criteria."
              />
            }
          />
          <Route
            path="validations"
            element={
              <PlaceholderPage
                title="Independent Field Validations"
                role="Expert"
                description="Audit testbed results, telemetry integrity, and clinical/field outcomes."
              />
            }
          />
        </Route>

        {/* Admin Portal */}
        <Route path="/admin">
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route
            path="dashboard"
            element={
              <PlaceholderPage
                title="System Command & Analytics Dashboard"
                role="Admin"
                description="Platform-wide metrics, uptime, and compliance overview."
              />
            }
          />
          <Route
            path="users"
            element={
              <PlaceholderPage
                title="User & Organization Management"
                role="Admin"
                description="Manage nodal officers, jury members, and startup entities."
              />
            }
          />
          <Route
            path="audit"
            element={
              <PlaceholderPage
                title="Compliance Audit Trail & Security Logs"
                role="Admin"
                description="Immutable audit trail of procurement decisions and financial releases."
              />
            }
          />
        </Route>
      </Route>

      {/* Fallback 404 Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
