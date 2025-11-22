import { create } from 'zustand';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  participants: number;
  maxParticipants: number;
}

interface EventState {
  events: Event[];
  viewMode: 'list' | 'map';
  setViewMode: (mode: 'list' | 'map') => void;
  filteredEvents: () => Event[];
  joinEvent: (eventId: number) => Promise<void>;
}

export const useEventStore = create<EventState>((set, get) => ({
  events: [],
  viewMode: 'list',
  
  setViewMode: (mode) => set({ viewMode: mode }),
  
  filteredEvents: () => {
    const { events } = get();
    return events;
  },
  
  joinEvent: async (eventId: number) => {
    const { events } = get();
    const updatedEvents = events.map(event => 
      event.id === eventId 
        ? { ...event, participants: Math.min(event.participants + 1, event.maxParticipants) }
        : event
    );
    set({ events: updatedEvents });
  },
}));
