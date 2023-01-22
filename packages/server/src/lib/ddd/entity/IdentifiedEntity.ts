import {Id} from "./Id";
import {Identified} from "./Identified";

export interface IdentifiedEntity<KEY extends Id<VALUE>, VALUE = number> extends Identified<KEY, VALUE> {
}
