function toggleDarkMode() {
    const root = document.documentElement;

    const mainBlue = getComputedStyle(root).getPropertyValue('--main-blue').trim();
    const richBlack = getComputedStyle(root).getPropertyValue('--rich-black').trim();

    // Check if the current mode is dark mode by examining one of the colors (e.g., --main-blue)
    if (mainBlue === "#335961") {
        // Switch to dark mode
        root.style.setProperty('--main-blue', '#468189');  // Original teal color
        root.style.setProperty('--rich-black', '#000');     // Black
        root.style.setProperty('--blue-gray', '#000');      // Black
        root.style.setProperty('--cream', '#031926');          // Black
        root.style.setProperty('--white', '#000000');       // White
        root.style.setProperty('--black', '#FFFFFF');          // Black
    } else {
        // Switch to light mode
        root.style.setProperty('--main-blue', '#335961');  // Teal
        root.style.setProperty('--rich-black', '#031926'); // Rich black
        root.style.setProperty('--blue-gray', '#9DBEBB');  // Ash gray
        root.style.setProperty('--cream', '#F4E9CD');      // Parchment
        root.style.setProperty('--white', '#FFFFFF');      // White
        root.style.setProperty('--black', '#000');         // Black
    }
}

// Add event listener to the button with id "call-to-action"
document.getElementById("dark-mode").addEventListener("click", toggleDarkMode);

