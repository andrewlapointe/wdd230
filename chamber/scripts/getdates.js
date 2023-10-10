function copyDate() {
    document.getElementById("copy-date").innerHTML = new Date().getFullYear();
}

function dateModified() {
    document.getElementById("last-modified-date").innerHTML = document.lastModified;
}

copyDate()
dateModified()