import React from 'react';
import { Button } from './components/button';
import { Calendar } from 'lucide-react';

const AddToCalendarButton = ({ 
  title = "My Event",
  description = "Event description",
  startTime = new Date(),
  endTime = new Date(Date.now() + 3600000), // 1 hour from now
  location = "Event location"
}) => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  const formatGoogleCalendarUrl = () => {
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      details: description,
      location: location,
      dates: `${startTime.toISOString().replace(/[-:]/g, '')}/${endTime.toISOString().replace(/[-:]/g, '')}`
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
      `DTSTART:${formatDate(startTime.toISOString())}`,
      `DTEND:${formatDate(endTime.toISOString())}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      `BEGIN:VALARM`,
      `TRIGGER:-PT24H`,
      `REPEAT:1`,
      `DURATION:PT15M`,
      `ACTION:DISPLAY`,
      `DESCRIPTION:Reminder`,
      `END:VALARM`,
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
      className="ml-4 px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
    >
      <Calendar className="w-4 h-4" />
      Add to Calendar
    </Button>
  );
};

export default AddToCalendarButton;