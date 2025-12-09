import { NextRequest, NextResponse } from "next/server";
import type {
  WPAvailabilityResponse,
  DateAvailability,
} from "@/lib/types/appointment";

// WordPress REST API Configuration
const WP_BASE_URL = process.env.WP_API_URL || "https://your-wordpress-site.com";
const WP_API_ENDPOINT = "/wp-json/map/v1/appointments";

/**
 * GET /api/appointments/availability
 * Get availability for a date range from WordPress
 * Query params: startDate, endDate
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!startDate || !endDate) {
      return NextResponse.json(
        {
          success: false,
          message: "startDate and endDate are required",
        },
        { status: 400 }
      );
    }

    // Fetch all appointments from WordPress
    let appointments: any[] = [];

    try {
      const wpResponse = await fetch(`${WP_BASE_URL}${WP_API_ENDPOINT}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (wpResponse.ok) {
        appointments = await wpResponse.json();
      }
    } catch (error) {
      console.log("Could not fetch appointments from WordPress");
    }

    // Build availability map for date range
    const availability: DateAvailability[] = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalSlots = 6; // 6 time slots per day

    let current = new Date(start);
    while (current <= end) {
      const dateStr = current.toISOString().split("T")[0];

      // Count booked slots for this date
      const bookedSlots = appointments.filter(
        (apt: any) => apt.date === dateStr
      ).length;
      const availableSlots = totalSlots - bookedSlots;

      // Determine status based on booked slots
      let status: DateAvailability["status"];
      if (bookedSlots === 0) {
        status = "available";
      } else if (bookedSlots >= totalSlots) {
        status = "booked";
      } else {
        status = "partially-booked";
      }

      availability.push({
        date: dateStr,
        status,
        availableSlots,
        totalSlots,
      });

      current.setDate(current.getDate() + 1);
    }

    return NextResponse.json({
      success: true,
      data: availability,
    });
  } catch (error) {
    console.error("Error fetching availability:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch availability",
      },
      { status: 500 }
    );
  }
}
