const parseTime = (beginWork, endWork, startMeetind, durationMeeting) => {
  // разбираю строку на количество минут и часов
  const arrayBeginWork = startMeetind.split(':');
  let hours = Number(arrayBeginWork[0]);
  let minutes = Number(arrayBeginWork[1]);

  let countHours = Math.floor(durationMeeting / 60); // количество часов в минутах
  // console.log(countHours);
  let countMinutes = durationMeeting - countHours * 60;
  // console.log(countMinutes);

  if (startMeetind >= beginWork && startMeetind < endWork) {
    console.log('Встреча состоится');
    if (durationMeeting >= 60) {
      hours += countHours;
      minutes += countMinutes;
    } else minutes += durationMeeting;
    if ((minutes = 60)) {
      hours++;
      minutes = 0;
    }
    console.log('Встреча закончится в ' + hours + ':' + minutes);
  } else console.log('Время встречи выходит за рамки рабочего дня!');
};

parseTime('9:5', '17:00', '16:30', 31);
