import React from 'react';
import { Calendar, Clock, Users, BookOpen, Coffee } from 'lucide-react';

const InputForm = ({
  subjects,
  setSubjects,
  faculty,
  setFaculty,
  timeSlots,
  setTimeSlots,
  lecturesPerSubject,
  setLecturesPerSubject,
  lunchBreak,
  setLunchBreak,
  onGenerate,
}) => {
  const handleSubjectChange = (index, value) => {
    const newSubjects = [...subjects];
    newSubjects[index] = { name: value };
    setSubjects(newSubjects);
  };

  const handleFacultyChange = (index, field, value) => {
    const newFaculty = [...faculty];
    newFaculty[index] = { ...newFaculty[index], [field]: value };
    setFaculty(newFaculty);
  };

  const handleTimeSlotChange = (index, field, value) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index] = { ...newTimeSlots[index], [field]: value };
    setTimeSlots(newTimeSlots);
  };

  const handleLunchBreakChange = (field, value) => {
    setLunchBreak((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onGenerate(); }} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          <BookOpen className="mr-2" /> Subjects
        </h2>
        {subjects.map((subject, index) => (
          <input
            key={index}
            type="text"
            value={subject.name}
            onChange={(e) => handleSubjectChange(index, e.target.value)}
            className="w-full p-2 border rounded mb-2"
            placeholder={`Subject ${index + 1}`}
          />
        ))}
        <button
          type="button"
          onClick={() => setSubjects([...subjects, { name: '' }])}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Subject
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          <Users className="mr-2" /> Faculty
        </h2>
        {faculty.map((member, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              type="text"
              value={member.name}
              onChange={(e) => handleFacultyChange(index, 'name', e.target.value)}
              className="w-1/2 p-2 border rounded"
              placeholder="Faculty Name"
            />
            <input
              type="text"
              value={member.subject}
              onChange={(e) => handleFacultyChange(index, 'subject', e.target.value)}
              className="w-1/2 p-2 border rounded"
              placeholder="Assigned Subject"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setFaculty([...faculty, { name: '', subject: '' }])}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Faculty
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          <Clock className="mr-2" /> Time Slots
        </h2>
        {timeSlots.map((slot, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              type="time"
              value={slot.start}
              onChange={(e) => handleTimeSlotChange(index, 'start', e.target.value)}
              className="w-1/2 p-2 border rounded"
            />
            <input
              type="time"
              value={slot.end}
              onChange={(e) => handleTimeSlotChange(index, 'end', e.target.value)}
              className="w-1/2 p-2 border rounded"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setTimeSlots([...timeSlots, { start: '', end: '' }])}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Time Slot
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          <Calendar className="mr-2" /> Lectures Per Subject Per Week
        </h2>
        <input
          type="number"
          value={lecturesPerSubject || ''}
          onChange={(e) => {
            const value = e.target.value;
            setLecturesPerSubject(value === '' ? 0 : parseInt(value, 10));
          }}
          min="1"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          <Coffee className="mr-2" /> Lunch Break
        </h2>
        <div className="flex space-x-2">
          <input
            type="time"
            value={lunchBreak?.start || ''}
            onChange={(e) => handleLunchBreakChange('start', e.target.value)}
            className="w-1/2 p-2 border rounded"
          />
          <input
            type="time"
            value={lunchBreak?.end || ''}
            onChange={(e) => handleLunchBreakChange('end', e.target.value)}
            className="w-1/2 p-2 border rounded"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Generate Timetable
      </button>
    </form>
  );
};

export default InputForm;