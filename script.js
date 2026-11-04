
const form = document.getElementById("placementForm");
const result = document.getElementById("result");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const cgpa = Number(document.getElementById("cgpa").value);
    const aptitude = Number(document.getElementById("aptitude").value);
    const skills = Number(document.getElementById("skills").value);
    const internships = Number(document.getElementById("internships").value);
    const projects = Number(document.getElementById("projects").value);

    // Check that all values are within the allowed ranges.
    if (
        !name ||
        cgpa < 0 || cgpa > 10 ||
        aptitude < 0 || aptitude > 100 ||
        skills < 0 || skills > 10 ||
        internships < 0 || internships > 5 ||
        projects < 0 || projects > 10 ||
        !Number.isInteger(internships) ||
        !Number.isInteger(projects)
    ) {
        alert("Please enter valid student details.");
        return;
    }

    // Demo scoring formula. This is NOT a trained ML model.
    const score =
        (cgpa / 10) * 30 +
        (aptitude / 100) * 25 +
        (skills / 10) * 20 +
        (Math.min(internships, 2) / 2) * 10 +
        (Math.min(projects, 3) / 3) * 15;

    const percentage = Math.round(score);

    document.getElementById("greeting").textContent =
        "Placement Readiness for " + name;

    document.getElementById("score").textContent =
        percentage + "%";

    let status = "";
    let explanation = "";

    if (percentage >= 75) {
        status = "High Readiness";
        explanation =
            "Your demo score indicates good preparation. Keep practising and applying.";
    } else if (percentage >= 50) {
        status = "Moderate Readiness";
        explanation =
            "You have a foundation to build on. Focus on the areas below.";
    } else {
        status = "Needs Improvement";
        explanation =
            "Build your skills step by step and practise consistently.";
    }

    document.getElementById("status").textContent = status;
    document.getElementById("explanation").textContent = explanation;

    const suggestions = [];

    if (cgpa < 7) {
        suggestions.push("Strengthen your academic fundamentals.");
    }

    if (aptitude < 70) {
        suggestions.push("Practise quantitative aptitude and logical reasoning.");
    }

    if (skills < 7) {
        suggestions.push("Improve programming and technical interview skills.");
    }

    if (internships < 1) {
        suggestions.push("Explore internships and practical work experience.");
    }

    if (projects < 2) {
        suggestions.push("Build projects that demonstrate your skills.");
    }

    if (suggestions.length === 0) {
        suggestions.push(
            "Continue mock interviews, resume improvement and job-specific preparation."
        );
    }

    const list = document.getElementById("suggestions");
    list.replaceChildren();

    suggestions.forEach(function (suggestion) {
        const item = document.createElement("li");
        item.textContent = suggestion;
        list.appendChild(item);
    });

    result.classList.remove("hidden");
    result.scrollIntoView({ behavior: "smooth", block: "start" });
});
