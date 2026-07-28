// Edit these values when event details change
const invitationLinks = {
  map: "https://www.google.com/maps/search/?api=1&query=Spice%20of%20Bombay%209940%20College%20Blvd%20Overland%20Park%20KS%2066210",
  rsvp: "tel:+19132254503",
  calendarTitle: "Baby Shower for Taranjeet Shah Arora",
  calendarDetails: "Please join us for a Baby Shower honoring Taranjeet Shah Arora and Dhruw Shah. Hosted by Meenu Arora. Ladies only. No boxed gifts please.",
  calendarLocation: "Spice of Bombay, 9940 College Blvd, Overland Park, KS 66210",
  // August 22, 2026 at 5:00 PM Central. Ends at 8:00 PM.
  calendarDates: "20260822T170000/20260822T200000",
  calendarTimezone: "America/Chicago"
};

const phoneWrap = document.getElementById("phoneWrap");
const openEnvelope = document.getElementById("openEnvelope");
const envelopeScreen = document.getElementById("envelopeScreen");
const mapLink = document.getElementById("mapLink");
const calendarLink = document.getElementById("calendarLink");
const rsvpLink = document.getElementById("rsvpLink");
const shareBtn = document.getElementById("shareBtn");
const inviteCard = document.getElementById("inviteCard");
const progress = document.querySelector(".video-bar span");
const revealEls = document.querySelectorAll(".reveal");

mapLink.href = invitationLinks.map;
rsvpLink.href = invitationLinks.rsvp;
calendarLink.href = buildGoogleCalendarUrl(invitationLinks);

openEnvelope.addEventListener("click", () => {
  phoneWrap.classList.add("opened");
  restartMainAnimation();
});

shareBtn.addEventListener("click", async () => {
  const shareText =
    "Please join us for a Baby Shower honoring Taranjeet Shah Arora and Dhruw Shah on Saturday, August 22nd at 5:00 PM at Spice of Bombay, Overland Park, KS.";

  if (navigator.share) {
    try {
      await navigator.share({
        title: invitationLinks.calendarTitle,
        text: shareText,
        url: window.location.href
      });
      return;
    } catch (error) {
      // User cancelled share.
    }
  }

  window.open("https://wa.me/?text=" + encodeURIComponent(`${shareText}\n${window.location.href}`), "_blank", "noopener");
});

inviteCard.addEventListener("click", () => {
  if (phoneWrap.classList.contains("opened")) {
    restartMainAnimation();
  }
});

function buildGoogleCalendarUrl(data) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: data.calendarTitle,
    dates: data.calendarDates,
    ctz: data.calendarTimezone,
    details: data.calendarDetails,
    location: data.calendarLocation
  });

  return "https://calendar.google.com/calendar/render?" + params.toString();
}

function restartMainAnimation() {
  revealEls.forEach((el) => {
    el.style.animation = "none";
    el.offsetHeight;
    el.style.animation = "";
  });

  progress.style.animation = "none";
  progress.offsetHeight;
  progress.style.animation = "";
}
