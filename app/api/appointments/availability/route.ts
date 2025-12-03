import { NextRequest, NextResponse } from "next/server";
import type {
  WPAvailabilityResponse,
  DateAvailability,
} from "@/lib/types/appointment";
import { mockDB } from "@/lib/mockDB";

/**
 * GET /api/appointments/availability
 * Get availability for a date range
 * Query params: startDate, endDate
 *
 * LOCAL MODE: Using mock data instead of WordPress
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

    // Generate availability for date range using local mock data
    const availability: DateAvailability[] = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    let current = new Date(start);
    while (current <= end) {
      const dateStr = current.toISOString().split("T")[0];
      const dateAvailability = mockDB.getDateAvailability(dateStr, 6);
      availability.push(dateAvailability);
      current.setDate(current.getDate() + 1);
    }

    const result: WPAvailabilityResponse = {
      success: true,
      data: availability,
    };

    return NextResponse.json(result);
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
