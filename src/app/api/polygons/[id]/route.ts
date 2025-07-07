import { NextRequest, NextResponse } from "next/server";
import { withDbInit } from "@/lib/utils/dbInit";
import { withDelay } from "@/lib/utils/delay";
import { polygonService } from "@/lib/services/polygon.service";

// DELETE /api/polygons/[id] - Delete a polygon by ID
export const DELETE = withDbInit(
  withDelay(async function DELETE(
    request: NextRequest,
    context: { params: { id: string } }
  ) {
    try {
      const params = await context.params;
      const id = parseInt(params.id);

      if (isNaN(id)) {
        return NextResponse.json(
          { error: "Invalid polygon ID" },
          { status: 400 }
        );
      }

      const deleted = await polygonService.delete(id);
      if (!deleted) {
        return NextResponse.json(
          { error: "Polygon not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { message: "Polygon deleted successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error deleting polygon:", error);
      return NextResponse.json(
        { error: "Failed to delete polygon" },
        { status: 500 }
      );
    }
  })
);

// PUT /api/polygons/[id] - Update a polygon by ID
export const PUT = withDbInit(
  withDelay(async function PUT(
    request: NextRequest,
    context: { params: { id: string } }
  ) {
    try {
      const params = await context.params;
      const id = parseInt(params.id);
      if (isNaN(id)) {
        return NextResponse.json(
          { error: "Invalid polygon ID" },
          { status: 400 }
        );
      }
      const body = await request.json();
      const { name, points } = body;
      if (!name || !points || !Array.isArray(points)) {
        return NextResponse.json(
          { error: "Name and points array are required" },
          { status: 400 }
        );
      }
      const updated = await polygonService.update(id, name, points);
      if (!updated) {
        return NextResponse.json(
          { error: "Polygon not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(updated);
    } catch (error) {
      console.error("Error updating polygon:", error);
      return NextResponse.json(
        { error: "Failed to update polygon" },
        { status: 500 }
      );
    }
  })
);
