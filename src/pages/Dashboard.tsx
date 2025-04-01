
import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/MySidebar';
import CategoryCards from '@/components/CategoryCards';
import RecentModels from '@/components/RecentModels';
import TrendChart from '@/components/TrendChart';
import { toast } from 'sonner';

const Dashboard: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  
  React.useEffect(() => {
    // Show welcome toast when dashboard loads
    toast.success('Welcome to GYAAN AI', {
      description: 'AI ka adda - Discover and track the latest AI models and tools',
    });
  }, []);
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar collapsed={sidebarCollapsed} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Categories</h2>
              <CategoryCards />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">AI Model Discovery Trends</h2>
              <div className="rounded-3xl overflow-hidden">
                <TrendChart />
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Recent Models</h2>
              <RecentModels />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
