import { body } from 'express-validator';

export const roomValidations = [
  body('floor').isNumeric().isLength({ min: 1, max: 3 }),
  body('rent').isNumeric().isLength({ min: 1, max: 3 }),
];

export const roomView = (room) => {
  return {
    id: room.id,
    floor: room.floor,
    rent: room.rent,
    booked: room.booked,
    createdAt: room.created_at,
    updatedAt: room.updated_at,
  };
};
