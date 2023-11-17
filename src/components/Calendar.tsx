import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import "./Calendar.scss";

// 定义日期数据格式
type DateItem = { date: number; enable: boolean };

// 定义日历组件属性
type CalendarProps = {
  ref: React.Ref<any>;
  value: string;
  onChange: (date: string) => void;
};

const Calendar: React.FC<CalendarProps> = forwardRef((props, parentRef) => {
  /* eslint-disable */
  const [visible, setVisible] = useState<boolean>(false);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectDate, setSelectDate] = useState<string>("");
  const [dates, setDates] = useState<Array<DateItem>>();
  const [weeks] = useState<Array<string>>([
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "日",
  ]);
  const [dayCount] = useState<Map<number, number>>(
    new Map([
      [1, 31],
      [2, year % 4 === 0 ? 29 : 28],
      [3, 31],
      [4, 30],
      [5, 31],
      [6, 30],
      [7, 31],
      [8, 31],
      [9, 30],
      [10, 31],
      [11, 30],
      [12, 31],
    ])
  );

  /**
   * 点击日历以外的部分，隐藏日历
   */
  const handleDisappear = () => {
    window.addEventListener("click", (event: MouseEvent) => {
      const className = (event.target as HTMLElement)?.className;
      !className.includes("calendar") && setVisible(false);
    });
  };

  /**
   * 切换上个月
   */
  const handlePrevMonth = () => {
    let tempMonth = month - 1;
    if (tempMonth < 1) {
      tempMonth = 12;
      setYear(year - 1);
    }
    setMonth(tempMonth);
    renderDays();
  };

  /**
   * 切换下个月
   */
  const handleNextMonth = () => {
    let tempMonth = month + 1;
    if (tempMonth > 12) {
      tempMonth = 1;
      setYear(year + 1);
    }
    setMonth(tempMonth);
    renderDays();
  };

  /**
   * 切换上一年
   */
  const handlePrevYear = () => {
    setYear(year - 1);
    renderDays();
  };

  /**
   * 切换下一年
   */
  const handleNextYear = () => {
    setYear(year + 1);
    renderDays();
  };

  /**
   * 渲染日历
   */
  const renderDays = () => {
    const monthStr = month < 10 ? `0${month}` : month;
    const firstDate = new Date(`${year}-${monthStr}-01`);
    const firstDay = firstDate.getDay() === 0 ? 7 : firstDate.getDay();
    let prevDates: DateItem[] = [];
    let curDates: DateItem[] = [];
    let nextDates: DateItem[] = [];
    // 渲染上个月
    for (let i = 0; i < firstDay - 1; i++) {
      prevDates.unshift({
        date: dayCount.get(month - 1 === 0 ? 12 : month - 1)! - i,
        enable: false,
      });
    }
    // 渲染当月
    for (let i = 1; i <= dayCount.get(month)!; i++) {
      curDates.push({
        date: i,
        enable: true,
      });
    }
    // 渲染下个月
    for (let i = 1; i <= 42 - dayCount.get(month)! - firstDay + 1; i++) {
      nextDates.push({
        date: i,
        enable: false,
      });
    }
    setDates([...prevDates, ...curDates, ...nextDates]);
  };

  /**
   * 选中日期
   * @param date
   */
  const handleSelectDate = (date: number) => {
    const tempDateStr = `${year}-${month < 10 ? `0${month}` : month}-${
      date < 10 ? `0${date}` : date
    }`;
    setSelectDate(String(tempDateStr));
    // 向父组件传递选中日期
    props.onChange(String(tempDateStr));
  };

  /**
   * 向父组件暴露属性/方法
   */
  useImperativeHandle(parentRef, () => ({
    selectDate,
  }));

  useEffect(() => {
    handleDisappear();
    renderDays();
  }, [month, year]);

  return (
    <div className="calendar">
      <input
        type="text"
        className="calendar__text"
        value={selectDate}
        onChange={(e) => setSelectDate(e.target.value)}
        onFocus={() => setVisible(true)}
      />
      {visible && (
        <div className="calendar__content">
          <div className="calendar__content__toolbar">
            <div className="calendar__content__toolbar__iconBox">
              <div
                className="calendar__content__toolbar__iconBox__icon year"
                onClick={handlePrevYear}
              >
                &lt;&lt;
              </div>
              <div
                className="calendar__content__toolbar__iconBox__icon month"
                onClick={handlePrevMonth}
              >
                &lt;
              </div>
            </div>
            <div className="calendar__content__toolbar__current">
              {year} 年 {month} 月
            </div>
            <div className="calendar__content__toolbar__iconBox">
              <div
                className="calendar__content__toolbar__iconBox__icon month"
                onClick={handleNextMonth}
              >
                &gt;
              </div>
              <div
                className="calendar__content__toolbar__iconBox__icon year"
                onClick={handleNextYear}
              >
                &gt;&gt;
              </div>
            </div>
          </div>
          <div className="calendar__content__weeks">
            {weeks.map((week: string, index: number) => {
              return (
                <span className="calendar__content__weeks__text" key={index}>
                  {week}
                </span>
              );
            })}
          </div>
          <div className="calendar__content__days">
            {dates?.map((dateItem: DateItem, index: number) => {
              if (dateItem.enable) {
                return (
                  <span
                    className="calendar__content__days__text"
                    key={index}
                    onClick={() => {
                      handleSelectDate(dateItem.date);
                      setVisible(false);
                    }}
                  >
                    {dateItem.date}
                  </span>
                );
              } else {
                return (
                  <span
                    className="calendar__content__days__text disabled"
                    key={index}
                  >
                    {dateItem.date}
                  </span>
                );
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
});

export default Calendar;
