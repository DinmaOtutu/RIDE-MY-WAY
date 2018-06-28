import requestRide from '../model/requestRide';

export const getRideRequest = (req, res) => {
  const id = requestRide.find(ride => ride.id === parseInt
  (req.params.id));
  if (!id)
    {return  res.status(400).json({
    message: 'Cannot get ride request',
      request: requestRide,
    });}
};
