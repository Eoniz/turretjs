import {Id} from "./Id";

export interface Identified<KEY extends Id<VALUE>, VALUE> {
  id: () => KEY | null;
}
