import Dashboard from "@/components/Dashboard/Dashboard";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div className="flex max-w-7xl mx-auto p-5 items-center">
        <Dashboard />
        {children}
      </div>
    </section>
  );
}
