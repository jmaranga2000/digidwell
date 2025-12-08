import StatsCard from "./components/StatsCard";
import AdminCard from "./components/AdminCard";
import BookingCard from "./components/BookingCard";
import OrderItem from "./components/OrderItem";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage services, orders, bookings, and more from this panel.
        </p>
      </header>

      {/* Quick Stats */}
      <section className="grid gap-6 md:grid-cols-3">
        <StatsCard title="Total Services" value="25" />
        <StatsCard title="Orders Today" value="12" />
        <StatsCard title="Revenue" value="KSh 75,000" />
      </section>

      {/* Admin Overview */}
      <section className="grid gap-6 md:grid-cols-3">
        <AdminCard
          title="Active Services"
          description="Number of services currently available"
          count={25}
        />
        <AdminCard
          title="Pending Bookings"
          description="Bookings waiting for confirmation"
          count={5}
        />
        <AdminCard
          title="Completed Orders"
          description="Orders successfully completed"
          count={150}
        />
      </section>

      {/* Recent Bookings */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent Bookings</h2>
        <div className="space-y-4">
          <BookingCard
            id="1"
            serviceTitle="Software Installation"
            customerName="Jane Doe"
            customerEmail="jane@example.com"
            status="Pending"
          />
          <BookingCard
            id="2"
            serviceTitle="Computer Upgrade"
            customerName="John Smith"
            customerEmail="john@example.com"
            status="Confirmed"
          />
        </div>
      </section>

      {/* Recent Orders */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
        <div className="space-y-4">
          <OrderItem
            id="101"
            serviceTitle="Graphic Design Package"
            customerName="Alice Johnson"
            status="Completed"
            price="KSh 5,000"
          />
          <OrderItem
            id="102"
            serviceTitle="Tech Consulting"
            customerName="Bob Martin"
            status="Pending"
            price="KSh 10,000"
          />
        </div>
      </section>
    </div>
  );
}
