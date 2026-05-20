/**
 * Duplicates marquee content so it loops seamlessly
 */
export function initMarquee() {
  const track = document.getElementById("marqueeTrack");
  if (!track) return;

  // Clone the content so the loop is seamless
  const clone = track.cloneNode(true);
  track.parentElement.appendChild(clone);
}
