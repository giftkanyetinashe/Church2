import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

// Admin/Dashboard Components
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage, { DashboardOverview } from './components/DashboardPage';
import MembersPage from './components/MembersPage';
import MemberDetailPage from './components/MemberDetailPage';
import AddMemberPage from './components/AddMemberPage';
// import EditMemberPage from './components/EditMemberPage'; // Assuming EditMemberPage is not needed yet
import AdminDashboardGroupsPage from './components/AdminDashboardGroupsPage';
import AddGroupPage from './components/AddGroupPage';
import AdminDashboardEventsPage from './components/AdminDashboardEventsPage';
import AddEventPage from './components/AddEventPage';
import AdminDashboardGivingPage from './components/AdminDashboardGivingPage';
import AddContributionPage from './components/AddContributionPage';
import ManageBatchesPage from './components/ManageBatchesPage';
import AdminDashboardReportsPage from './components/AdminDashboardReportsPage';
import ReportServiceAttendancePage from './components/ReportServiceAttendancePage';
import AdminDashboardSettingsPage from './components/AdminDashboardSettingsPage';
import BatchDetailPage from './components/BatchDetailPage';
import BatchReport from './components/BatchReport';


// Member Portal Components
import MemberPortalLayout from './components/member_portal/MemberPortalLayout';
import MemberPortalHome from './components/member_portal/pages/MemberPortalHome';
import MyProfilePage from './components/member_portal/pages/MyProfilePage';
import MyGivingPage from './components/member_portal/pages/MyGivingPage';
import DonateFormPage from './components/member_portal/pages/DonateFormPage';
import GivingHistoryPage from './components/member_portal/pages/GivingHistoryPage';
import EventsPage from './components/member_portal/pages/EventsPage';         // Member Portal Events List
import EventDetailsPage from './components/member_portal/pages/EventDetailsPage';
import EventRegisterPage from './components/member_portal/pages/EventRegisterPage';
import GroupsPage from './components/member_portal/pages/GroupsPage';         // Member Portal Groups List
import GroupDetailsPage from './components/member_portal/pages/GroupDetailsPage'; // ***** IMPORT GroupDetailsPage *****
import GroupJoinPage from './components/member_portal/pages/GroupJoinPage';       // ***** IMPORT GroupJoinPage *****
import ServePage from './components/member_portal/pages/ServePage';
import PrayerPage from './components/member_portal/pages/PrayerPage';
import ResourcesPage from './components/member_portal/pages/ResourcesPage'; 


// Assuming MemberContext is set up if needed for admin dashboard dataaaa
// import { MemberProvider } from './contexts/MemberContext'; // Uncomment if using MemberContext for admin

function App() {
  const mockUserRole = "MEMBER"; // Change this to simulate different user roles like "ADMIN","MEMBER", "PASTOR", etc.
  const isAuthenticated = true;

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    if (allowedRoles && !allowedRoles.includes(mockUserRole)) {
      console.warn(`User with role "${mockUserRole}" tried to access a route restricted to roles: ${allowedRoles.join(', ')}`);
      if (mockUserRole === "MEMBER") return <Navigate to="/portal" replace />;
      if (["ADMIN", "PASTOR", "FINANCE_ADMIN", "MINISTRY_LEADER"].includes(mockUserRole)  && !allowedRoles.includes("MEMBER")) return <Navigate to="/dashboard" replace />;
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
            path="/"
            element={
                !isAuthenticated ? <Navigate replace to="/login" /> :
                mockUserRole === "MEMBER" ? <Navigate replace to="/portal" /> :
                (["ADMIN", "PASTOR", "FINANCE_ADMIN", "MINISTRY_LEADER"].includes(mockUserRole)) ? <Navigate to="/dashboard" /> :
                <Navigate replace to="/login" />
            }
        />

        {/* Admin Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "PASTOR", "FINANCE_ADMIN", "MINISTRY_LEADER"]}>
              {/* If using MemberContext for shared member data in admin dashboard: */}
              {/* <MemberProvider> */}
                <DashboardPage />
              {/* </MemberProvider> */}
            </ProtectedRoute>
          }
        > {/* PARENT /dashboard ROUTE STARTS HERE */}
          <Route index element={<DashboardOverview />} />

          {/* Member Management Routes */}
          <Route path="members" element={<MembersPage />} />
          <Route path="members/add" element={
            <ProtectedRoute allowedRoles={["ADMIN", "PASTOR"]}>
                <AddMemberPage />
            </ProtectedRoute>
          } />
          <Route path="members/view/:memberId" element={<MemberDetailPage />} />
          <Route path="members/edit/:memberId" element={
            <ProtectedRoute allowedRoles={["ADMIN", "PASTOR"]}>
                {/* Replace placeholder with actual EditMemberPage component when ready */}
                <div><h1>Edit Member</h1><p>Form to edit member ID: ...</p><Link to="/dashboard/members">Back to List</Link></div>
            </ProtectedRoute>
          } />
          
          {/* Group Management Routes (Admin) */}
          <Route path="groups" element={<AdminDashboardGroupsPage />} />
          <Route path="groups/add" element={
            <ProtectedRoute allowedRoles={["ADMIN", "PASTOR", "MINISTRY_LEADER"]}>
                <AddGroupPage />
            </ProtectedRoute>
          } />
          <Route path="groups/view/:groupId" element={<div><h1>View Group Details (Admin)</h1><p>Admin view of group ID: ...</p><Link to="/dashboard/groups">Back to List</Link></div>} />
          <Route path="groups/edit/:groupId" element={<div><h1>Edit Group (Admin)</h1><p>Admin form to edit group ID: ...</p><Link to="/dashboard/groups">Back to List</Link></div>} />
          
          {/* Event Management Routes (Admin) */}
          <Route path="events" element={<AdminDashboardEventsPage />} />
          <Route path="events/add" element={
            <ProtectedRoute allowedRoles={["ADMIN", "PASTOR", "MINISTRY_LEADER"]}>
              <AddEventPage />
            </ProtectedRoute>
          } />
          <Route path="events/view/:eventId" element={<div><h1>View Event Details & Registrations (Admin)</h1><p>Admin view of event ID: ...</p><Link to="/dashboard/events">Back to List</Link></div>} />
          <Route path="events/edit/:eventId" element={<div><h1>Edit Event (Admin)</h1><p>Admin form to edit event ID: ...</p><Link to="/dashboard/events">Back to List</Link></div>} />

          {/* Giving Management Routes (Admin) */}
          <Route path="giving" element={
            <ProtectedRoute allowedRoles={["ADMIN", "FINANCE_ADMIN"]}>
              <AdminDashboardGivingPage />
            </ProtectedRoute>
          }/>
          <Route path="giving/add-contribution" element={
            <ProtectedRoute allowedRoles={["ADMIN", "FINANCE_ADMIN"]}>
              <AddContributionPage />
            </ProtectedRoute>
          }/>
          <Route path="giving/manage-batches" element={
             <ProtectedRoute allowedRoles={["ADMIN", "FINANCE_ADMIN"]}>
                <ManageBatchesPage />
             </ProtectedRoute>
          }/>
          <Route path="giving/view/:contributionId" element={
            <ProtectedRoute allowedRoles={["ADMIN", "FINANCE_ADMIN"]}>
              <div><h1>View Contribution Details (Admin)</h1><p>Admin view of contribution ID: ...</p><Link to="/dashboard/giving">Back to List</Link></div>
            </ProtectedRoute>
          }/>
          <Route path="giving/edit/:contributionId" element={
            <ProtectedRoute allowedRoles={["ADMIN", "FINANCE_ADMIN"]}>
              <div><h1>Edit Contribution (Admin)</h1><p>Admin form to edit contribution ID: ...</p><Link to="/dashboard/giving">Back to List</Link></div>
            </ProtectedRoute>
          }/>
          <Route path="giving/batch/:batchId" element={
            <ProtectedRoute allowedRoles={["ADMIN", "FINANCE_ADMIN"]}>
              <BatchDetailPage />
            </ProtectedRoute>
          }/>
          
          {/* Reports Routes (Admin) */}
          <Route path="reports" element={<ProtectedRoute allowedRoles={["ADMIN", "PASTOR", "FINANCE_ADMIN"]}><AdminDashboardReportsPage /></ProtectedRoute>}/>
          <Route path="reports/membership/directory" element={<ProtectedRoute allowedRoles={["ADMIN", "PASTOR"]}><div className="portal-page-container"><h1>Member Directory Report</h1><p>Filters and report output will go here...</p></div></ProtectedRoute>} />
          <Route path="reports/giving/summary" element={<ProtectedRoute allowedRoles={["ADMIN", "FINANCE_ADMIN"]}><div className="portal-page-container"><h1>Contribution Summary Report</h1><p>Filters and report output will go here...</p></div></ProtectedRoute>} />
          <Route path="reports/attendance/service" element={<ProtectedRoute allowedRoles={["ADMIN", "PASTOR", "MINISTRY_LEADER"]}><ReportServiceAttendancePage /></ProtectedRoute>}/>

          {/* Settings Routes (Admin) */}
          <Route path="settings" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminDashboardSettingsPage /></ProtectedRoute>}/>
          <Route path="settings/general/church-info" element={<ProtectedRoute allowedRoles={["ADMIN"]}><div className="portal-page-container"><h1>Church Information Settings</h1><p>Form to edit church details...</p></div></ProtectedRoute>} />
          <Route path="settings/users/manage" element={<ProtectedRoute allowedRoles={["ADMIN"]}><div className="portal-page-container"><h1>Manage User Accounts</h1><p>Interface to manage users...</p></div></ProtectedRoute>} />
          <Route path="settings/financial/funds" element={<ProtectedRoute allowedRoles={["ADMIN", "FINANCE_ADMIN"]}><div className="portal-page-container"><h1>Manage Giving Funds</h1><p>Interface to manage funds...</p></div></ProtectedRoute>} />
         
        </Route> {/* PARENT /dashboard ROUTE ENDS HERE */}
        
        {/* ***** DEDICATED PRINT ROUTE (OUTSIDE MAIN LAYOUT) ***** */}
        <Route
          path="/dashboard/giving/batch/:batchId/print"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "FINANCE_ADMIN"]}>
              <BatchReport />
            </ProtectedRoute>
          }
        />
        
        {/* Member Portal Routes */}
        <Route
          path="/portal"
          element={
            <ProtectedRoute allowedRoles={["MEMBER", "ADMIN"]}>
              <MemberPortalLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<MemberPortalHome />} />
          <Route path="profile" element={<MyProfilePage />} />
          <Route path="giving" element={<MyGivingPage />} />
          <Route path="giving/donate" element={<DonateFormPage />} />
          <Route path="giving/history" element={<GivingHistoryPage />} />
          
          <Route path="events" element={<EventsPage />} />
          <Route path="events/details/:eventId" element={<EventDetailsPage />} />
          <Route path="events/register/:eventId" element={<EventRegisterPage />} />
          
          <Route path="groups" element={<GroupsPage />} />
          <Route path="groups/details/:groupId" element={<GroupDetailsPage />} />
          <Route path="groups/join/:groupId" element={<GroupJoinPage />} />
          <Route path="serve" element={<ServePage />} /> 
          <Route path="prayer" element={<PrayerPage />} />
          <Route path="resources" element={<ResourcesPage />} />
        </Route>
         
        <Route
          path="*"
          element={
            <div>
                <h1>404 - Page Not Found</h1>
                {isAuthenticated ?
                    (mockUserRole === "MEMBER" ? <Link to="/portal">Go to Portal</Link> : <Link to="/dashboard">Go to Dashboard</Link>)
                    : <Link to="/login">Go to Login</Link>
                }
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;