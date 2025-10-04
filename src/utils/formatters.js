// utils.js

export const formatCurrency = (value) => {
  return Number(value).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-PH", options);
};

// Cache for assigned category colors so same category is always consistent
const categoryColorMap = {};

export const getCategoryColor = (category) => {
  // Tailwind color palette classes
  const colorClasses = [
    "bg-blue-100 text-blue-800",
    "bg-green-100 text-green-800",
    "bg-purple-100 text-purple-800",
    "bg-pink-100 text-pink-800",
    "bg-red-100 text-red-800",
    "bg-yellow-100 text-yellow-800",
    "bg-indigo-100 text-indigo-800",
    "bg-teal-100 text-teal-800",
    "bg-orange-100 text-orange-800",
  ];

  // If already assigned, return the same color
  if (categoryColorMap[category]) {
    return categoryColorMap[category];
  }

  // Pick random color
  const randomColor =
    colorClasses[Math.floor(Math.random() * colorClasses.length)];

  // Assign to category so it stays consistent
  categoryColorMap[category] = randomColor;
  return randomColor;
};
