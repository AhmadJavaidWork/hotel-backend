import queries from './queries';
import { created } from '../../utils/response';

export const bookRoom = async ({ body }, res) => {
  const { roomId, customerId, from, to } = body;
  const booking = {
    roomId,
    customerId,
    from,
    to,
  };
  const savedBooking = await queries.create(booking);
  return created(res, savedBooking);
};
