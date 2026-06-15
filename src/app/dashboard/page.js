import DashboardHeader from '@/components/DashboardHeader';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Panggil Header di paling atas */}
      <DashboardHeader />
      
      {/* Konten Dashboard Lainnya */}
      <main className="p-6">
        <h1 className="text-2xl text-white">Selamat datang di Dashboard</h1>
        {/* ... */}
      </main>
    </div>
  );
}