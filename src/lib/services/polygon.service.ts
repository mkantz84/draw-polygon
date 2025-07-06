import {
  getAllPolygons,
  createPolygon,
  deletePolygon,
  PolygonRow,
  Polygon,
} from "../dal/polygon.dal";

class PolygonService {
  public async getAll(): Promise<Polygon[]> {
    const polygons = await getAllPolygons();
    return polygons.map((polygon: PolygonRow) => ({
      id: polygon.id,
      name: polygon.name,
      points: JSON.parse(polygon.points),
    }));
  }

  public async create(name: string, points: number[][]): Promise<Polygon> {
    const polygon = await createPolygon(name, points);
    return {
      id: polygon.id,
      name: polygon.name,
      points: JSON.parse(polygon.points),
    };
  }

  public async delete(id: number): Promise<boolean> {
    // Add business logic here if needed
    return deletePolygon(id);
  }
}

export const polygonService = new PolygonService();
