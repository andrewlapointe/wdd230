function getDaysBetweenDates(d1, d2) {
    const diff = d2 - d1;
    return Math.floor(diff / (24 * 60 * 60 * 1000));
  }
  
  // Function to display the message based on the last visit
function displayVisitMessage() {
    const message = document.getElementById('welcome-message');
    const now = new Date();
    const lastVisit = localStorage.getItem('lastVisit');
  
    // If it's the first visit
    if (!lastVisit) {
        message.innerText = "Welcome! Let us know if you have any questions.";
    } else {
      const previousVisitDate = new Date(parseInt(lastVisit));
      const dayDifference = getDaysBetweenDates(previousVisitDate, now);
  
      // If the last visit was less than a day ago
      if (dayDifference < 1) {
        message.innerText = "Back so soon! Awesome!";
      } else {
        // If it's been one day or more
        const dayWord = dayDifference === 1 ? 'day' : 'days';
        message.innerText = `You last visited ${dayDifference} ${dayWord} ago.`;
      }
    }
    localStorage.setItem('lastVisit', now.getTime().toString());
}
displayVisitMessage();