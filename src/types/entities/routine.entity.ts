import { RoutineListType } from '../routine-list-type';

interface Routine {
  description: string;
  type: RoutineListType;
  productsIds: string[];
}

export default Routine;
