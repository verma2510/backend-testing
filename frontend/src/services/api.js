export const fetchFormData = async (details) => {
  return fetch("http://localhost:8080/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details),
  });
};