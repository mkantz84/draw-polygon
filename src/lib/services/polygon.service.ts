import {
  getAllPolygons,
  createPolygon,
  deletePolygon,
  updatePolygon,
  getPolygonsPaginated,
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

  public async getPaginated(offset: number, limit: number): Promise<Polygon[]> {
    const polygons = await getPolygonsPaginated(offset, limit);
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
    return deletePolygon(id);
  }

  public async update(
    id: number,
    name: string,
    points: number[][]
  ): Promise<Polygon | null> {
    const polygon = await updatePolygon(id, name, points);
    if (!polygon) return null;
    return {
      id: polygon.id,
      name: polygon.name,
      points: JSON.parse(polygon.points),
    };
  }
}

export const polygonService = new PolygonService();
