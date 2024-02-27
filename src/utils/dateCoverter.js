export const convertToCustomFormat = (inputDateTime) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
      'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const dateObj = new Date(inputDateTime);
    const monthIndex = dateObj.getMonth();
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();
  
    const suffix = (hours >= 12) ? 'pm' : 'am';
    const hour = (hours % 12 === 0) ? 12 : hours % 12;
  
    const formattedDateTime = `${months[monthIndex]} ${day}th ${year}, ${hour}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${suffix}`;
  
    return formattedDateTime;
  };