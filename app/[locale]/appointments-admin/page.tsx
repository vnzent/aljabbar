"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import type { Appointment } from "@/lib/types/appointment";

export default function AppointmentsAdminPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/appointments");
      const result = await response.json();

      if (result.success) {
        setAppointments(result.data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading appointments...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-6 md:py-8 lg:py-10">
      <div className="main-wrapper mx-auto">
        <div className="space-y-6 md:space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-black">
                Appointments Management
              </h1>
              <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">
                Local Mode - Total: {appointments.length} appointments
              </p>
            </div>
            <Button onClick={fetchAppointments} className="w-full sm:w-auto">Refresh</Button>
          </div>

          {/* Table */}
          {appointments.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 md:p-10 text-center">
              <p className="text-gray-500 text-sm md:text-base">No appointments yet</p>
            </div>
          ) : (
            <>
              {/* Mobile Cards View */}
              <div className="lg:hidden space-y-4">
                {appointments.map((apt) => (
                  <div key={apt.id} className="bg-white rounded-lg shadow p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">#{apt.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(apt.status)}`}>
                        {apt.status}
                      </span>
                    </div>
                    <div className="border-t pt-3 space-y-2">
                      <div>
                        <p className="text-xs text-gray-500">Date & Time</p>
                        <p className="text-sm font-medium">
                          {new Date(apt.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                        <p className="text-xs text-gray-500">{apt.timeSlot}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Customer</p>
                        <p className="text-sm font-medium">{apt.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Contact</p>
                        <p className="text-sm">{apt.email}</p>
                        <p className="text-sm">{apt.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Type</p>
                        <p className="text-sm capitalize">{apt.visitType}</p>
                      </div>
                      {apt.address && (
                        <div>
                          <p className="text-xs text-gray-500">Location</p>
                          <p className="text-sm">{apt.address}</p>
                        </div>
                      )}
                      {apt.notes && (
                        <div>
                          <p className="text-xs text-gray-500">Notes</p>
                          <p className="text-sm text-gray-600">{apt.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden lg:block bg-white rounded-lg shadow overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {appointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{apt.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <p className="font-medium">
                            {new Date(apt.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {apt.timeSlot}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {apt.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div>
                          <p className="text-xs">{apt.email}</p>
                          <p className="text-xs text-gray-500">{apt.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                        {apt.visitType}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                        {apt.address || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            apt.status
                          )}`}
                        >
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </>
          )}

          {/* Instructions */}
          <div className=\"bg-blue-50 border border-blue-200 rounded-lg p-4 md:p-6\">
            <h3 className=\"font-poppins font-medium text-base md:text-lg text-black mb-2 md:mb-3\">
              📝 Local Mode Active
            </h3>
            <ul className=\"space-y-2 text-xs md:text-sm text-gray-700\">
              <li>
                • Data disimpan di memory (akan hilang saat refresh server)
              </li>
              <li>• Semua API routes menggunakan mock data</li>
              <li>• Tidak ada koneksi ke WordPress</li>
              <li>• Conflict detection tetap berjalan</li>
              <li>
                • Test booking di{" "}
                <a href=\"/contact\" className=\"text-primary underline\">
                  /contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
