import {Identified} from "../entity/Identified";
import {Id} from "../entity/Id";
import {Either} from "../valueobject/Either";

export interface IdentifiedRepository<ENTITY extends Identified<KEY, KEY_VALUE>, KEY extends Id<KEY_VALUE>, KEY_VALUE> {

  findAll: () => Promise<Array<ENTITY>>;
  findById: (id: KEY) => Promise<Either<null, ENTITY>>;

}
