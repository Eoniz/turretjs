import {Identified} from "../entity/Identified";
import {Id} from "../entity/Id";
import {IdentifiedRepository} from "./IdentifiedRepository";

export interface InMemoryRepository<
    ENTITY extends Identified<KEY, KEY_VALUE>,
    KEY extends Id<KEY_VALUE>,
    KEY_VALUE
> extends IdentifiedRepository<ENTITY, KEY, KEY_VALUE> {
  clear(): void;
}
