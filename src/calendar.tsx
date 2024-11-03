import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './components/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/tab";
import AddToCalendarButton from './add-calendar';

const SymposiumCalendar = () => {
  const [expandedEventId, setExpandedEventId] = useState(null);
  
  const formatDate = (date, time) => {
    const [hours, minutes] = time.split(':');
    return new Date(2025, 4, date, hours, minutes);
  };

  const eventTypes = {
    ceremony: 'bg-amber-100',
    lecture: 'bg-rose-100',
    session: 'bg-sky-100',
    break: 'bg-white',
    poster: 'bg-rose-100',
    assembly: 'bg-amber-50'
  };

  interface Event {
    id: string;
    title: string;
    startTime: string | Date;
    endTime?: string | Date;
    location?: string;
    type: keyof typeof eventTypes;
    description?: string | string[];
    speakers?: {name: string; topic: string;}[] | string[];
    details?: string;
  }

  const events: {[key: string]: Event[]} = {
    "may-18": [
      {
        "id": "opening",
        "title": "Opening Ceremony",
        "startTime": new Date(Date.UTC(2025, 4, 18, 12, 0, 0)),
        "endTime": new Date(Date.UTC(2025, 4, 18, 12, 30, 0)),
        "type": "ceremony",
        location: "Room 1",
        description: "life is good"
      },
      {
        "id": "s1",
        "title": "Neuron-glia interactions in neurodegenerative diseases",
        "startTime": "15:30",
        "endTime": "17:30",
        "location": "Hall A",
        "type": "session",
        speakers: [
          { name: "n", topic: "b"},
          { name: "c", topic: "p"}
        ]
      },
      {
        "id": "s2",
        "title": "From gene to investigational drug: ADNP protein and davunetide",
        "startTime": "15:30",
        "endTime": "17:30",
        "location": "Hall B",
        "type": "session"
      },
      {
        "id": "s3",
        "title": "Significance of extracellular vesicles in brain function and disease",
        "startTime": "15:30",
        "endTime": "17:30",
        "location": "Hall C",
        "type": "session"
      },
      {
        "id": "plenary-1",
        "title": "Plenary Lecture",
        speakers: ["Tom Südhof"],
        "startTime": "18:00",
        "endTime": "19:30",
        "type": "lecture"
      },
      {
        "id": "welcome-reception",
        "title": "Welcome Reception",
        "startTime": "19:30",
        "endTime": "20:30",
        "type": "break"
      }
    ],
    "may-19": [
      {
        "id": "special-lecture",
        "title": "Special Lecture",
        speakers: ["Moussa Youdim"],
        "startTime": "8:15",
        "type": "lecture"
      },
      {
        "id": "ysla-1",
        "title": "Young Investigator Lectureship Award (YSLA) I",
        "startTime": "9:00",
        "endTime": "9:30",
        "type": "break"
      },
      {
        "id": "s4",
        "title": "Astrocyte regulation of neural circuits: impact on brain functions",
        "startTime": "10:30",
        "endTime": "12:30",
        "location": "Hall A",
        "type": "session"
      },
      {
        "id": "s5",
        "title": "Emerging concepts and approaches in targeting human neurodegenerative diseases",
        "startTime": "10:30",
        "endTime": "12:30",
        "location": "Hall B",
        "type": "session"
      },
      {
        "id": "s6",
        "title": "RNA dynamics and translation: key to brain function",
        "startTime": "10:30",
        "endTime": "12:30",
        "location": "Hall C",
        "type": "session"
      }
    ],
    "may-20": [
      {
        "id": "plenary-2",
        "title": "ISN Plenary Lecture",
        speakers: ["Giovanna Mallucci"],
        "startTime": "9:00",
        "endTime": "10:00",
        "type": "break"
      },
      {
        "id": "s13",
        "title": "Cellular mechanisms of white matter homeostasis",
        "startTime": "10:30",
        "endTime": "12:30",
        "location": "Hall A",
        "type": "session"
      },
      {
        "id": "s14",
        "title": "Metabolic alterations underlying brain resilience and pathogenesis in Alzheimer's disease",
        "startTime": "10:30",
        "endTime": "12:30",
        "location": "Hall B",
        "type": "session"
      }
    ],
    "may-21": [
      {
        "id": "bachelard-lecture",
        "title": "Bachelard Lecture",
        speakers: ["Tony Turner"],
        "startTime": "9:00",
        "endTime": "10:00",
        "type": "lecture"
      },
      {
        "id": "s20",
        "title": "Mitochondria-nucleus crosstalk in behaviour and neurological disease",
        "startTime": "10:30",
        "endTime": "12:30",
        "location": "Hall A",
        "type": "session"
      },
      {
        "id": "closing",
        "title": "Closing Ceremony",
        "startTime": "16:00",
        "endTime": "16:30",
        "type": "ceremony"
      },
      {
        "id": "farewell-dinner",
        "title": "Farewell Dinner",
        "startTime": "19:30",
        "endTime": "22:00",
        "type": "break"
      }
    ]
  };

  const generateICSFile = (event) => {
    const startDate = formatDate(event.date, event.startTime);
    const endDate = formatDate(event.date, event.endTime);
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
LOCATION:${event.location}
DESCRIPTION:${event.description}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `event-${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  
  const EventCard = ({ event }) => {
    const isExpanded = expandedEventId === event.id;
    
    return (
      <div className={`border rounded-lg overflow-hidden transition-all duration-200 ${eventTypes[event.type]}`}>
        <div 
          className="p-4 cursor-pointer hover:bg-opacity-90"
          onClick={() => setExpandedEventId(isExpanded ? null : event.id)}
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2 flex-grow">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{event.title}</h3>
                {isExpanded ? 
                  <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                }
              </div>
              <p className="text-sm text-gray-600 flex items-center">
                <Clock className="inline-block h-4 w-4 mr-1" />
                {typeof event.endTime !== 'string' && getTime(event.startTime)} - {typeof event.endTime !== 'string' && getTime(event.endTime)}
              </p>
              <p className="text-sm text-gray-600 flex items-center">
                <MapPin className="inline-block h-4 w-4 mr-1" />
                {event.location}
              </p>
            </div>
            {/* <button
              onClick={(e) => {
                e.stopPropagation();
                generateICSFile(event);
              }}
              className="ml-4 px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Add to Calendar
            </button> */}
            <AddToCalendarButton {...event} />
          </div>
        </div>
        
        {isExpanded && (
          <div className="px-4 pb-4 bg-white bg-opacity-50">
            <div className="pt-2 border-t">
              {event.description && Array.isArray(event.description) && event.description.map(d =>
                <div className="mb-2">
                  <p className="text-sm text-gray-700">{d}</p>
                </div>
              )}
              {event.speakers && Array.isArray(event.speakers) && event.speakers.filter(s => s.hasOwnProperty("name")).map(s => 
                <div className="mb-2">
                  <p className="text-sm font-medium">{s.topic}</p>
                  <p className="text-sm text-gray-600">{s.name}</p>
                </div>
              )}
              {event.details && (
                <div className="mb-2">
                  <p className="text-sm font-medium">Additional Information:</p>
                  <p className="text-sm text-gray-600">{event.details}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            ESN Symposium 2025 Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="may-18" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="may-18">May 18</TabsTrigger>
              <TabsTrigger value="may-19">May 19</TabsTrigger>
              <TabsTrigger value="may-20">May 20</TabsTrigger>
              <TabsTrigger value="may-21">May 21</TabsTrigger>
            </TabsList>

            {Object.entries(events).map(([date, dayEvents]) => (
              <TabsContent key={date} value={date} className="space-y-4">
                {dayEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SymposiumCalendar;