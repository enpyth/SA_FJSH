import EventDetail from './EventDetail';

export default async function EventPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return <EventDetail eventId={id} />;
}
