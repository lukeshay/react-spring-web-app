export interface Route {
  id: string;
  wallId: string;
  gymId: string;
  name: string;
  setter: string;
  holdColor: string;
  types: Array<"BOULDER" | "TOP_ROPE" | "LEAD" | "AUTO_BELAY">;
  averageGrade: string;
  averageRating: number;
}
