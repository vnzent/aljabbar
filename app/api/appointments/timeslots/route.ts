import { NextRequest, NextResponse } from "next/server";
import type { WPTimeSlotsResponse, TimeSlot } from "@/lib/types/appointment";

// WordPress REST API Configuration
const WP_BASE_URL = process.env.WP_API_URL || "https://your-wordpress-site.com";
const WP_API_ENDPOINT = "/wp-json/map/v1/appointment";

/**
 * GET /api/appointments/timeslots
 * Get available time slots for a specific date from WordPress
 * Query params: date (YYYY-MM-DD)
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

    const now = new Date();

    // Helper function to check if slot is within 24 hours
    const isSlotWithin24Hours = (slotStartTime: string): boolean => {
      const [hours, minutes] = slotStartTime.split(":").map(Number);
      const slotDateTime = new Date(date);
      slotDateTime.setHours(hours, minutes, 0, 0);

      const hoursDiff =
        (slotDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);
      return hoursDiff < 24;
    };

    // Default time slots structure
    const defaultTimeSlots: TimeSlot[] = [
      {
        id: "slot1",
        startTime: "09:00",
        endTime: "11:00",
        isAvailable: !isSlotWithin24Hours("09:00"),
        status: isSlotWithin24Hours("09:00") ? "booked" : "available",
      },
      {
        id: "slot2",
        startTime: "11:00",
        endTime: "13:00",
        isAvailable: !isSlotWithin24Hours("11:00"),
        status: isSlotWithin24Hours("11:00") ? "booked" : "available",
      },
      {
        id: "slot3",
        startTime: "13:00",
        endTime: "15:00",
        isAvailable: !isSlotWithin24Hours("13:00"),
        status: isSlotWithin24Hours("13:00") ? "booked" : "available",
      },
      {
        id: "slot4",
        startTime: "15:00",
        endTime: "17:00",
        isAvailable: !isSlotWithin24Hours("15:00"),
        status: isSlotWithin24Hours("15:00") ? "booked" : "available",
      },
      {
        id: "slot5",
        startTime: "17:00",
        endTime: "19:00",
        isAvailable: !isSlotWithin24Hours("17:00"),
        status: isSlotWithin24Hours("17:00") ? "booked" : "available",
      },
      {
        id: "slot6",
        startTime: "19:00",
        endTime: "21:00",
        isAvailable: !isSlotWithin24Hours("19:00"),
        status: isSlotWithin24Hours("19:00") ? "booked" : "available",
      },
    ];

    // Fetch booked appointments from WordPress to check availability
    let bookedSlots: string[] = [];

    try {
      // Get appointments for this date from WordPress
      const appointmentsResponse = await fetch(
        `${WP_BASE_URL}/wp-json/map/v1/appointments?date=${date}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (appointmentsResponse.ok) {
        const appointments = await appointmentsResponse.json();

        // Extract booked slot IDs
        if (Array.isArray(appointments)) {
          bookedSlots = appointments
            .filter((apt: any) => apt.date === date)
            .map((apt: any) => apt.time); // time field contains slot ID
        }
      }
    } catch (wpError) {
      console.log("Could not fetch appointments from WordPress");
    }

    // Process slots: mark as booked if in bookedSlots array or within 24 hours
    const timeSlots: TimeSlot[] = defaultTimeSlots.map((slot) => {
      const withinLimit = isSlotWithin24Hours(slot.startTime);
      const isBooked = bookedSlots.includes(slot.id);

      // 3 conditions:
      // 1. booked - all slots taken OR within 24 hours
      // 2. partially-booked - some slots taken (for multi-booking support)
      // 3. available - no slots taken and > 24 hours

      if (withinLimit || isBooked) {
        return {
          ...slot,
          isAvailable: false,
          status: "booked" as const,
        };
      }

      return {
        ...slot,
        isAvailable: true,
        status: "available" as const,
      };
    });

    return NextResponse.json({
      success: true,
      data: timeSlots,
    });
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
