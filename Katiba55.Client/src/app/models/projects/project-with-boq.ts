import { BoqDetailed } from "../boqs/boq-detailed";

export interface ProjectWithBoq {
    id: number,
    name: string,
    boQs: BoqDetailed[]
}
