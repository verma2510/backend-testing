export const fetchFormData = async (details) => {
  return fetch("http://localhost:8080/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details),
  });
};

export const fetchCardData = async () => {
  const response = await fetch("http://localhost:8080/cards");
  if (!response.ok) {
    throw new Error("Failed to fetch card data");
  }
  return response.json();
};

