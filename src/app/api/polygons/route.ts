import { NextRequest, NextResponse } from "next/server";
import { withDbInit } from "@/lib/utils/dbInit";
import { withDelay } from "@/lib/utils/delay";
import { polygonService } from "@/lib/services/polygon.service";
import { isValidPoints } from "./validate";

// GET /api/polygons - Fetch all or paginated polygons
export const GET = withDbInit(
  withDelay(async function GET(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const offset = searchParams.get("offset");
      const limit = searchParams.get("limit");
      let polygons;
      if (offset != null && limit != null) {
        polygons = await polygonService.getPaginated(
          Number(offset),
          Number(limit)
        );
      } else {
        polygons = await polygonService.getAll();
      }
      return NextResponse.json(polygons);
    } catch (error) {
      console.error("Error fetching polygons:", error);
      return NextResponse.json(
        { error: "Failed to fetch polygons" },
        { status: 500 }
      );
    }
  })
);

// POST /api/polygons - Create a new polygon
export const POST = withDbInit(
  withDelay(async function POST(request: NextRequest) {
    try {
      const body = await request.json();
      const { name, points } = body;

      // Input validation
      if (!name || !points || !Array.isArray(points)) {
        return NextResponse.json(
          { error: "Name and points array are required" },
          { status: 400 }
        );
      }
      const validationResult = isValidPoints(points);
      if (!validationResult.valid) {
        return NextResponse.json(
          { error: validationResult.message },
          { status: 400 }
        );
      }

      const polygon = await polygonService.create(name, points);
      return NextResponse.json(polygon, { status: 201 });
    } catch (error: unknown) {
      console.error("Error creating polygon:", error);
      const message = extractErrorMessage(error, "Failed to create polygon");
      return NextResponse.json({ error: message }, { status: 400 });
    }
  })
);

function extractErrorMessage(error: unknown, fallback: string): string {
  if (typeof error === "object" && error !== null && "message" in error) {
    const msg = (error as { message?: unknown }).message;
    if (typeof msg === "string") return msg;
  }
  return fallback;
}
