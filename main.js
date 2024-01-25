function sendData() {
    const courseNumber = document.getElementById("course-number").value;
    const email = document.getElementById("email").value;
    const discussions = document.getElementById("discussions").checked;
    const assignments = document.getElementById("assignments").checked;
    const announcements = document.getElementById("announcements").checked;
    const files = document.getElementById("files").checked;
    const modules = document.getElementById("modules").checked;
    const recordings = document.getElementById("recordings").checked;
  
    // if (courseNumber === "") {
    //   const error = document.createElement("p");
    //   error.innerHTML = "Please enter a course number.";
    //   error.classList.add("error");
    //   const form = document.querySelector("form");
    //   form.appendChild(error);
    //   return;
    // }
    if (!/^\d+$/.test(courseNumber)) {
        alert("Course number must contain only digits.");
        return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        alert("Please enter a valid email.");
        return;
      }
  
    const data = {
      courseNumber,
      email,
      discussions,
      assignments,
      announcements,
      files,
      modules,
      recordings
    };
  
    fetch("http://localhost:3000/submit-data", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
})
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
})
.then(result => {
    console.log("Submission result:", result);
    // ... (reset form and alert)
    // do something with the response
    document.getElementById("course-number").value = "";
    document.getElementById("email").value = "";
    document.getElementById("discussions").checked = false;
    document.getElementById("assignments").checked = false;
    document.getElementById("announcements").checked = false;
    document.getElementById("files").checked = false;
    document.getElementById("modules").checked = false;
    document.getElementById("recordings").checked = false;
    alert("Data submitted successfully. We will contact you via provided email if any problems persist.");
})
.catch(error => {
    console.error("Fetch error:", error);
});

}