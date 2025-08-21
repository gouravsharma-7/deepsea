import React, { useState } from 'react';
import Navigation from './components/Navigation';
import LiveMap from './components/LiveMap';
import AlertsPanel from './components/AlertsPanel';
import CatchLog from './components/CatchLog';
import Analytics from './components/Analytics';
import { useSeaGuardian } from './hooks/useSeaGuardian';

function App() {
  const [activeTab, setActiveTab] = useState('map');
  const { 
    vessels, 
    alerts, 
    catches, 
    isOnline,
    triggerSOS, 
    acknowledgeAlert, 
    addCatch 
  } = useSeaGuardian();

  const activeAlertCount = alerts.filter(alert => !alert.acknowledged).length;

  const renderContent = () => {
    switch (activeTab) {
      case 'map':
        return (
          <LiveMap 
            vessels={vessels}
            alerts={alerts}
            onSOS={triggerSOS}
          />
        );
      case 'alerts':
        return (
          <AlertsPanel 
            alerts={alerts}
            onAcknowledge={acknowledgeAlert}
          />
        );
      case 'catches':
        return (
          <CatchLog 
            catches={catches}
            onAddCatch={addCatch}
          />
        );
      case 'analytics':
        return (
          <Analytics catches={catches} />
        );
      case 'comms':
        return (
          <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Communication Hub</h2>
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <div className="text-6xl mb-4">📡</div>
                <h3 className="text-xl font-semibold mb-2">Multi-Channel Communications</h3>
                <p className="text-slate-600 mb-6">
                  4G/Wi-Fi • LoRa Mesh • Satellite Backup
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <div className="h-3 w-3 bg-green-400 rounded-full mr-2"></div>
                      <span className="font-semibold">4G Active</span>
                    </div>
                    <p className="text-sm text-slate-600">Primary connection</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <div className="h-3 w-3 bg-blue-400 rounded-full mr-2"></div>
                      <span className="font-semibold">LoRa Ready</span>
                    </div>
                    <p className="text-sm text-slate-600">Mesh network</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <div className="h-3 w-3 bg-orange-400 rounded-full mr-2"></div>
                      <span className="font-semibold">Sat Standby</span>
                    </div>
                    <p className="text-sm text-slate-600">Emergency backup</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Settings</h2>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">System Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Update Frequency
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded">
                      <option>5 seconds (Real-time)</option>
                      <option>30 seconds (Normal)</option>
                      <option>60 seconds (Power Save)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Geofence Alert Distance
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded">
                      <option>1 km (Default)</option>
                      <option>2 km (Extended)</option>
                      <option>5 km (Early Warning)</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="weather-alerts" className="mr-2" defaultChecked />
                    <label htmlFor="weather-alerts" className="text-sm text-slate-700">
                      Enable automatic weather alerts
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="sos-test" className="mr-2" />
                    <label htmlFor="sos-test" className="text-sm text-slate-700">
                      Enable SOS test mode (demo only)
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        alertCount={activeAlertCount}
      />
      <main className="flex-1">
        {/* Connection Status Bar */}
        <div className={`h-1 ${isOnline ? 'bg-green-400' : 'bg-red-400'} transition-colors`}>
        </div>
        
        {!isOnline && (
          <div className="bg-orange-100 border border-orange-400 text-orange-700 px-4 py-2 text-sm">
            ⚠️ Offline Mode - Data will sync when connection is restored
          </div>
        )}
        
        {renderContent()}
      </main>
    </div>
  );
}

export default App;