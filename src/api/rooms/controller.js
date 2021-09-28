import queries from './queries';
import { roomView } from '../admin/rooms/helpers';
import { success } from '../../utils/response';

export const getAvailableRooms = async (req, res) => {
  const availableRooms = await queries.getAvailableRooms();
  return success(
    res,
    availableRooms.map((room) => roomView(room))
  );
};
