// const svgElement = document.getElementById('svg')
// const [,,originalWidth, originalHeight] = svgElement.getAttribute("viewBox").split(" ").map(Number)

// svgElement.addEventListener("mousemove", (event) => {
//   const {top, left, width, height} = svgElement.getBoundingClientRect();

//   const eventTop = event.clientY - top;
//   const eventLeft = event.clientX - left;

//   svgElement.setAttribute("viewBox", `${eventLeft / width * originalWidth - originalWidth / 4} ${eventTop / height * originalHeight - originalHeight / 4} ${originalWidth / 2} ${originalHeight / 2}`)
// });
// svgElement.addEventListener("mouseout", () => {
//   svgElement.setAttribute("viewBox", `0 0 ${originalWidth} ${originalHeight}`);
// });
