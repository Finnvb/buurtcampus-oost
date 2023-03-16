export const sendWorkshopForm = async (data) =>
  fetch("/api/workshopForm", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to submit form");
    return res.json();
  });

export const sendRuilForm = async (data) =>
  fetch("/api/plantruilForm", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to submit form");
    return res.json();
  });

export const sendDoneerForm = async (data) =>
  fetch("/api/plantdoneerForm", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to submit form");
    return res.json();
  });
