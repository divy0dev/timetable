import React, { useState } from 'react';
import { Calendar, Clock, Users, BookOpen, Coffee } from 'lucide-react';
import InputForm from './components/InputForm';
import Timetable from './components/Timetable';

function App() {
  const [subjects, setSubjects] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [lecturesPerSubject, setLecturesPerSubject] = useState(0);
  const [lunchBreak, setLunchBreak] = useState(null);
  const [timetable, setTimetable] = useState(null);

  const generateTimetable = () => {
    const years = ['2nd Year', '3rd Year', '4th Year'];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const periods = timeSlots.length;

    const newTimetable = {};

    years.forEach(year => {
      newTimetable[year] = days.map(() => 
        Array(periods).fill(null).map(() => {
          const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
          const randomFaculty = faculty.find(f => f.subject === randomSubject.name) || faculty[Math.floor(Math.random() * faculty.length)];
          return {
            subject: randomSubject.name,
            faculty: randomFaculty.name
          };
        })
      );
    });

    // Apply constraints (this is a simplified version and doesn't cover all constraints)
    years.forEach(year => {
      days.forEach((day, dayIndex) => {
        const daySchedule = newTimetable[year][dayIndex];
        const subjectCount = {};

        for (let i = 0; i < daySchedule.length; i++) {
          const currentSubject = daySchedule[i].subject;
          subjectCount[currentSubject] = (subjectCount[currentSubject] || 0) + 1;

          // Ensure no more than two lectures per subject per day
          if (subjectCount[currentSubject] > 2) {
            const availableSubjects = subjects.filter(s => s.name !== currentSubject && (subjectCount[s.name] || 0) < 2);
            if (availableSubjects.length > 0) {
              const newSubject = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];
              const newFaculty = faculty.find(f => f.subject === newSubject.name) || faculty[Math.floor(Math.random() * faculty.length)];
              daySchedule[i] = { subject: newSubject.name, faculty: newFaculty.name };
              subjectCount[newSubject.name] = (subjectCount[newSubject.name] || 0) + 1;
            }
          }

          // Avoid consecutive lectures of the same subject
          if (i > 0 && daySchedule[i].subject === daySchedule[i-1].subject) {
            const availableSubjects = subjects.filter(s => s.name !== currentSubject);
            if (availableSubjects.length > 0) {
              const newSubject = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];
              const newFaculty = faculty.find(f => f.subject === newSubject.name) || faculty[Math.floor(Math.random() * faculty.length)];
              daySchedule[i] = { subject: newSubject.name, faculty: newFaculty.name };
            }
          }
        }
      });
    });

    setTimetable(newTimetable);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-indigo-600 mb-2">Time Table Management System</h1>
        <p className="text-gray-600">Efficiently manage your academic schedules</p>
      </header>
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InputForm
            subjects={subjects}
            setSubjects={setSubjects}
            faculty={faculty}
            setFaculty={setFaculty}
            timeSlots={timeSlots}
            setTimeSlots={setTimeSlots}
            lecturesPerSubject={lecturesPerSubject}
            setLecturesPerSubject={setLecturesPerSubject}
            lunchBreak={lunchBreak}
            setLunchBreak={setLunchBreak}
            onGenerate={generateTimetable}
          />
          {timetable && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Generated Timetables</h2>
              <div className="space-y-8">
                {Object.entries(timetable).map(([year, schedule]) => (
                  <Timetable key={year} year={year} schedule={schedule} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;