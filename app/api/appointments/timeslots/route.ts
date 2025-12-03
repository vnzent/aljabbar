import { NextRequest, NextResponse } from "next/server";
import type { WPTimeSlotsResponse, TimeSlot } from "@/lib/types/appointment";
import { mockDB } from "@/lib/mockDB";

/**
 * GET /api/appointments/timeslots
 * Get available time slots for a specific date
 * Query params: date (YYYY-MM-DD)
 *
 * LOCAL MODE: Using mock data instead of WordPress
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json(
        {
          success: false,
          message: "date parameter is required",
        },
        { status: 400 }
      );
    }

    // Define available time slots
    const allTimeSlots: TimeSlot[] = [
      {
        id: "slot1",
        startTime: "9:00 AM",
        endTime: "11:00 AM",
        isAvailable: true,
        status: "available",
      },
      {
        id: "slot2",
        startTime: "11:00 AM",
        endTime: "13:00 PM",
        isAvailable: true,
        status: "available",
      },
      {
        id: "slot3",
        startTime: "13:00 PM",
        endTime: "15:00 PM",
        isAvailable: true,
        status: "available",
      },
      {
        id: "slot4",
        startTime: "15:00 PM",
        endTime: "17:00 PM",
        isAvailable: true,
        status: "available",
      },
      {
        id: "slot5",
        startTime: "17:00 PM",
        endTime: "19:00 PM",
        isAvailable: true,
        status: "available",
      },
      {
        id: "slot6",
        startTime: "19:00 PM",
        endTime: "21:00 PM",
        isAvailable: true,
        status: "available",
      },
    ];

    // Check which slots are already booked for this date
    const timeSlots: TimeSlot[] = allTimeSlots.map((slot) => {
      const isBooked = mockDB.isSlotBooked(date, slot.id);
      return {
        ...slot,
        isAvailable: !isBooked,
        status: isBooked ? "booked" : "available",
      };
    });

    const result: WPTimeSlotsResponse = {
      success: true,
      data: timeSlots,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching timeslots:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch timeslots",
      },
      { status: 500 }
    );
  }
}
