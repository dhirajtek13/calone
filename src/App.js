import { Fragment, useCallback, useEffect, useState } from 'react';
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
// import { IconName } from "react-icons/bs";
import './App.css';

const DayMapper = { 0: 'SUN', 1: 'MON', 2: 'TUE', 3: 'WED', 4: 'THU', 5: 'FRI', 6: 'SAT' };
const DAY = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const MONTH = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const DAYS = [
  ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
  ['TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', 'MON'],
  ['WED', 'THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE'],
  ['THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED'],
  ['FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU'],
  ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI'],
  ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
];

const Year = ({ year, onYearChange }) => {
  const incrementYear = () => {
    onYearChange(year + 1);
  };

  const decrementYear = () => {
    onYearChange(year - 1);
  };

  return (
    <Fragment>
      <a onClick={decrementYear} className="cursorPointer"><BsFillCaretLeftFill /></a>
      <div className='year__val'>{year}</div>
      <a onClick={incrementYear} className="cursorPointer"><BsFillCaretRightFill /></a>
    </Fragment>
  );
};

function App() {
  const d = new Date();
  const todaysDate = d.getDate();
  const thisYear = d.getFullYear();

  const [year, setYear] = useState(thisYear);
  const [months, setMonths] = useState([]);
  const [noOfDays, setNoOfDays] = useState(31);

  const calculateMonthDimension = useCallback(() => {
    const newMonths = [new Array(7).fill(''), new Array(7).fill(''), new Array(7).fill('')];
    MONTH.forEach((m, indx) => {
      const date = new Date(year, indx, 1);
      const ssa = DayMapper[date.getDay()]
      const day = DAY.indexOf(DayMapper[date.getDay()]);
      if (!newMonths[0][day]) {
        newMonths[0][day] = m;
      } else if (!newMonths[1][day]) {
        newMonths[1][day] = m;
      } else {
        newMonths[2][day] = m;
      }
    });
    return newMonths;
  }, [year]);

  const onYearChange = (currentYear) => {
    setYear(currentYear);
  };

  const getNofDays = (m) => {
    const selectedMonth = MONTH.indexOf(m) + 1;
    const nOfDays = new Date(year, selectedMonth, 0).getDate();
    return nOfDays;
  }

  const colorOfMonth = { 28: 'Khaki', 29: 'ORANGE', 30: 'Teal', 31: 'MediumVioletRed'};

  const displayMonthDates = (m) => {
    setNoOfDays(getNofDays(m));
  }
  const getMonthColor = (m) => {
      return colorOfMonth[getNofDays(m)];
  }

  const getDateColor = (i) => {
    return colorOfMonth[i];
  }

  useEffect(() => {
    const newMonths = calculateMonthDimension();
    setMonths(newMonths)
  }, [calculateMonthDimension]);

  return (
    <div className='calendar'>
      <div className='year'>
        <Year year={year} onYearChange={onYearChange}></Year>
      </div>
      <div className='month'>
        {months.map((month) => {
          return month.map((m) => {
            return <span className="cursorPointer" 
            style={{color: getMonthColor(m)}}
            onClick={() =>displayMonthDates( m)}>{m}</span>;
          });
        })}
      </div>
      <div className='date'>
      {[...Array(35)].map((e, i) => <span key={i} 
      style={{color: getDateColor(i), backgroundColor: i+1 == todaysDate ? 'coral' : ''}} >
        { i+1 <= noOfDays && i+1 }
      </span>)}

      </div>
      <div className='day'>
      {DAYS.map((day) => {
          return day.map((d) => {
            return <span style={{color: d == "SUN" ? 'red' : ''}}>{d}</span>;
          });
        })}
      </div>
    </div>
  );
}

export default App;
