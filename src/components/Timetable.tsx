import React from 'react';

interface TimetableProps {
  year: string;
  schedule: { subject: string; faculty: string }[][];
}

const Timetable: React.FC<TimetableProps> = ({ year, schedule }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-2">{year}</h3>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Time / Day</th>
            {days.map((day) => (
              <th key={day} className="border border-gray-300 p-2">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {schedule.map((row, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">Period {index + 1}</td>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border border-gray-300 p-2">
                  <div>{cell.subject}</div>
                  <div className="text-sm text-gray-600">{cell.faculty}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;