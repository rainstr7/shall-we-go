import React from 'react';
import styles from './EventCard.module.css';
import { Button } from '@/components/ui/Button';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  participants: number;
  maxParticipants: number;
}

interface EventCardProps {
  event: Event;
  onJoin: () => void;
  onViewDetails: () => void;
}

export function EventCard({ event, onJoin, onViewDetails }: EventCardProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{event.title}</h3>
      <p className={styles.description}>{event.description}</p>
      <div className={styles.meta}>
        <span className={styles.date}>{event.date}</span>
        <span className={styles.location}>{event.location}</span>
      </div>
      <div className={styles.actions}>
        <Button variant="primary" onClick={onJoin}>
          Присоединиться
        </Button>
        <Button variant="outline" onClick={onViewDetails}>
          Подробнее
        </Button>
      </div>
    </div>
  );
}
