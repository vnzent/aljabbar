import { NextRequest, NextResponse } from "next/server";
import type {
  WPAppointmentResponse,
  AppointmentFormData,
} from "@/lib/types/appointment";

// WordPress REST API Configuration
const WP_BASE_URL = process.env.WP_API_URL || "https://your-wordpress-site.com";
const WP_API_ENDPOINT = "/wp-json/map/v1/appointment";

/**
 * POST /api/appointments
 * Create a new appointment via WordPress REST API
 *
 * Documentation based on provided WordPress API examples
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

    // Prepare data for WordPress API
    const wpData = {
      name: body.firstName,
      email: body.email,
      phone: body.phone,
      date: body.selectedDate,
      time: body.selectedTimeSlot,
      message: body.notes || "",
      booking_type: body.bookingType,
      location: body.location,
      address: body.address,
      notes: body.notes || "",
    };

    // Send to WordPress REST API
    const wpResponse = await fetch(`${WP_BASE_URL}${WP_API_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wpData),
    });

    const wpResult = await wpResponse.json();

    if (!wpResponse.ok || wpResult.status !== "success") {
      return NextResponse.json(
        {
          success: false,
          message: wpResult.message || "Failed to create appointment",
        },
        { status: wpResponse.status || 500 }
      );
    }

    // Transform WordPress response to our format
    const result: WPAppointmentResponse = {
      success: true,
      data: {
        id: wpResult.insert_id,
        date: body.selectedDate,
        timeSlot: body.selectedTimeSlot,
        firstName: body.firstName,
        email: body.email,
        phone: body.phone,
        bookingType: body.bookingType,
        location: body.location,
        address: body.address,
        notes: body.notes,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      },
      message: "Appointment created successfully!",
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
 * Get appointments from WordPress API
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    let url = `${WP_BASE_URL}${WP_API_ENDPOINT}`;
    if (startDate && endDate) {
      url += `?startDate=${startDate}&endDate=${endDate}`;
    }

    const wpResponse = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const appointments = await wpResponse.json();

    return NextResponse.json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch appointments",
      },
      { status: 500 }
    );
  }
}
