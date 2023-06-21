import { RoutineListType } from '../routine-list-type';

interface CreateRoutine {
  description: string;
  type: RoutineListType;
  productsIds: string[];
}

export default CreateRoutine;
