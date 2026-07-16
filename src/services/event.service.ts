import Event from "../models/Event";

export const createEvent = async (
  data: any
) => {
  return Event.create(data);
};

export const getEvents = async (
  search?: string
) => {
  const query: any = {};
  
  if (search && search.trim()) {
    query.title = {
      $regex: search.trim(),
      $options: "i"
    };
  }
  
  return Event.find(query);
};

export const getEventById = async (
  id: string
) => {
  return Event.findById(id);
};

export const updateEvent = async (
  id: string,
  data: any
) => {
  return Event.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
    }
  );
};

export const deleteEvent = async (
  id: string
) => {
  return Event.findByIdAndDelete(id);
};