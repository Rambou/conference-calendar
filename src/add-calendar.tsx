import React from 'react';
import { Button } from './components/button';
import { Calendar } from 'lucide-react';

const AddToCalendarButton = ({ 
  title = "My Event",
  description = "Event description",
  startTime = new Date().toISOString(),
  endTime = new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
  location = "Event location"
}) => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  const formatGoogleCalendarUrl = () => {
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      details: description,
      location: location,
      dates: `${startTime.replace(/[-:]/g, '')}/${endTime.replace(/[-:]/g, '')}`
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const formatICalendarUrl = () => {
    // Format dates for iCal
    const formatDate = (date) => date.replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${formatDate(startTime)}`,
      `DTEND:${formatDate(endTime)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    return `data:text/calendar;charset=utf8,${encodeURIComponent(icsData)}`;
  };

  const handleClick = () => {
    if (isIOS) {
      window.open(formatICalendarUrl());
    } else {
      window.open(formatGoogleCalendarUrl(), '_blank');
    }
  };

  return (
    <Button 
      onClick={handleClick}
      className="flex items-center gap-2"
    >
      <Calendar className="w-4 h-4" />
      Add to Calendar
    </Button>
  );
};

export default AddToCalendarButton;