export default function randomColor() {
  const colours = ["#66ff66", "#99ff66", "#ffff00"];
  return colours[Math.floor(Math.random() * colours.length)];
}
