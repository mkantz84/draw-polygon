import { NextRequest, NextResponse } from "next/server";
import { withDbInit } from "@/lib/utils/dbInit";
import { withDelay } from "@/lib/utils/delay";
import { polygonService } from "@/lib/services/polygon.service";

// DELETE /api/polygons/[id] - Delete a polygon by ID
export const DELETE = withDbInit(
  withDelay(async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    try {
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
