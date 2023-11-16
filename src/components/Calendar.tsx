import "./Calendar.scss";

const Calendar: React.FC = () => {
  return (
    <div className="calendar">
      <input type="text" className="calendar__text" />
      <div className="calendar__content">
        <div className="calendar__content__toolbar">
          <div className="calendar__content__toolbar__icon"> &lt; </div>
          <div className="calendar__content__toolbar__current">2023-11-16</div>
          <div className="calendar__content__toolbar__icon"> &gt; </div>
        </div>
        <div className="calendar__content__weeks">
          <span className="calendar__content__weeks__text">一</span>
          <span className="calendar__content__weeks__text">二</span>
          <span className="calendar__content__weeks__text">三</span>
          <span className="calendar__content__weeks__text">四</span>
          <span className="calendar__content__weeks__text">五</span>
          <span className="calendar__content__weeks__text">六</span>
          <span className="calendar__content__weeks__text">日</span>
        </div>
        <div className="calendar__content__days">
          <span className="calendar__content__days__text">1</span>
          <span className="calendar__content__days__text">2</span>
          <span className="calendar__content__days__text">3</span>
          <span className="calendar__content__days__text">4</span>
          <span className="calendar__content__days__text">5</span>
          <span className="calendar__content__days__text">6</span>
          <span className="calendar__content__days__text">7</span>
          <span className="calendar__content__days__text">8</span>
          <span className="calendar__content__days__text">9</span>
          <span className="calendar__content__days__text">10</span>
          <span className="calendar__content__days__text">11</span>
          <span className="calendar__content__days__text">12</span>
          <span className="calendar__content__days__text">13</span>
          <span className="calendar__content__days__text">14</span>
          <span className="calendar__content__days__text">15</span>
          <span className="calendar__content__days__text">16</span>
          <span className="calendar__content__days__text">17</span>
          <span className="calendar__content__days__text">18</span>
          <span className="calendar__content__days__text">19</span>
          <span className="calendar__content__days__text">20</span>
          <span className="calendar__content__days__text">21</span>
          <span className="calendar__content__days__text">22</span>
          <span className="calendar__content__days__text">23</span>
          <span className="calendar__content__days__text">24</span>
          <span className="calendar__content__days__text">25</span>
          <span className="calendar__content__days__text">26</span>
          <span className="calendar__content__days__text">27</span>
          <span className="calendar__content__days__text">28</span>
          <span className="calendar__content__days__text">29</span>
          <span className="calendar__content__days__text">30</span>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
