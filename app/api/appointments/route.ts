import { NextRequest, NextResponse } from "next/server";
import type {
  WPAppointmentResponse,
  AppointmentFormData,
} from "@/lib/types/appointment";
import { mockDB } from "@/lib/mockDB";

/**
 * POST /api/appointments
 * Create a new appointment
 *
 * LOCAL MODE: Using mock data instead of WordPress
 */
export async function POST(request: NextRequest) {
  try {
    const body: AppointmentFormData = await request.json();

    // Validate required fields
    if (
      !body.firstName ||
      !body.email ||
      !body.phone ||
      !body.bookingType ||
      !body.location ||
      !body.selectedDate ||
      !body.selectedTimeSlot
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All required fields must be filled",
        },
        { status: 400 }
      );
    }

    // Check if slot is already booked
    if (mockDB.isSlotBooked(body.selectedDate, body.selectedTimeSlot)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This time slot is already booked. Please choose another slot.",
        },
        { status: 409 }
      );
    }

    // Create appointment in local mock database
    const appointment = mockDB.create({
      date: body.selectedDate,
      timeSlot: body.selectedTimeSlot,
      firstName: body.firstName,
      email: body.email,
      phone: body.phone,
      bookingType: body.bookingType,
      location: body.location,
      address: body.address,
      notes: body.notes || "",
      status: "pending",
    });

    const result: WPAppointmentResponse = {
      success: true,
      data: appointment,
      message: "Appointment created successfully! (Local Mode)",
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create appointment",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/appointments
 * Get appointments (optional: filter by date range)
 *
 * LOCAL MODE: Using mock data instead of WordPress
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    let appointments;
    if (startDate && endDate) {
      appointments = mockDB.getByDateRange(startDate, endDate);
    } else {
      appointments = mockDB.getAll();
    }

    return NextResponse.json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch appointments",
      },
      { status: 500 }
    );
  }
}
