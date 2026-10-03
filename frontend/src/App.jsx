import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import TopBar from './components/Layout/TopBar';
import Dashboard from './components/Dashboard/Dashboard';
import AlertQueue from './components/Alerts/AlertQueue';
import AlertDetail from './components/Alerts/AlertDetail';
import CustodyTracking from './components/Custody/CustodyTracking';
import OnlineMonitoring from './components/Online/OnlineMonitoring';
import CollusionGraph from './components/Graph/CollusionGraph';
import Analytics from './components/Analytics/Analytics';
import AuditLog from './components/Audit/AuditLog';
import AdminPanel from './components/Admin/AdminPanel';
import './App.css';

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`app-layout ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className="app-main">
        <TopBar />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/alerts" element={<AlertQueue />} />
            <Route path="/alerts/:id" element={<AlertDetail />} />
            <Route path="/custody" element={<CustodyTracking />} />
            <Route path="/online" element={<OnlineMonitoring />} />
            <Route path="/graph" element={<CollusionGraph />} />
            <Route path="/collusion" element={<CollusionGraph />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/audit" element={<AuditLog />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
