"use client";

import { useEffect, useState } from "react";
import BookingCard from "../../components/BookingCard";
import ServiceCard from "../../components/ServiceCard";

type Service = {
  id: string;
  title: string;
  description: string;
  price: string;
};

type Booking = {
  id: string;
  serviceId: string;
  serviceTitle: string;
  customerName: string;
  customerEmail: string;
  status: "Pending" | "Confirmed" | "Cancelled";
};

export default function CustomerDashboard() {
  const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const customerEmail = "customer@example.com"; // Replace with actual logged-in email

  // Fetch services
  useEffect(() => {
    fetch("/api/services/list")
      .then((res) => res.json())
      .then((data) => setServices(data.services));
  }, []);

  // Fetch customer bookings
  useEffect(() => {
    fetch(`/api/services/booking/list?email=${customerEmail}`)
      .then((res) => res.json())
      .then((data) => setBookings(data.bookings));
  }, [customerEmail]);

  return (
    <div className="space-y-12">
      {/* Available Services */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Available Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </section>

      {/* My Bookings */}
      <section>
        <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
        <div className="space-y-4">
          {bookings.length ? (
            bookings.map((booking) => (
              <BookingCard key={booking.id} {...booking} />
            ))
          ) : (
            <p className="text-gray-500">You have no bookings yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
