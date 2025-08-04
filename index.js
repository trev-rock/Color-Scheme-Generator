const colorSection = document.getElementById("color-section");
const colorForm = document.getElementById("color-form");
const colorPicker = document.getElementById("color-picker");
const modeSelector = document.getElementById("mode-selector")
const getCount = document.getElementById("get-count");

colorForm.addEventListener("submit", function(e){
    e.preventDefault();
    colorSection.innerHTML = ""
    let colorSeed = removeHash(colorPicker.value);
    colorURL = `
    https://www.thecolorapi.com/scheme?hex=${colorSeed}&format=json&mode=${modeSelector.value}&count=${getCount.value}
    `;
    colorSection.style.gridTemplateColumns = `repeat(${getCount.value}, 1fr)`;
    for(let i = 0; i < getCount.value; i++) {
        const html_string = `
            <div class="color_pair">
                <div class="color_bar" id="color_bar_${i}"></div>
                <div class="color_name" id="color_name_${i}"></div>
            </div>
        `
        colorSection.innerHTML += html_string
    }
    fetch(colorURL, {
        method: "GET"
    })
        .then(response => response.json())
        .then(data => {
            const colorList = data.colors
            let count = 0;
            colorList.forEach(color => {
                document.getElementById(`color_bar_${count}`).style.backgroundColor = color.hex.value;
                document.getElementById(`color_name_${count}`).textContent = color.hex.value
                count++;
            });
        });
});

document.addEventListener("click", function(e){
    if(e.target.id.includes("color_name")) {
        navigator.clipboard.writeText(e.target.textContent)
    }
})

function removeHash(value) {
    return value.slice(1);
}
