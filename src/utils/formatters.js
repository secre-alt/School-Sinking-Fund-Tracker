export const formatCurrency = (value) => {
    return Number(value).toLocaleString('en-PH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-PH', options);
};

export const getCategoryColor = (category) => {
    const colors = {
        'Building Maintenance': 'bg-blue-100 text-blue-800',
        'Equipment': 'bg-green-100 text-green-800',
        'School Events': 'bg-purple-100 text-purple-800',
        'Scholarships': 'bg-yellow-100 text-yellow-800'
    };
    return colors[category] || 'bg-yellow-100 text-indigo-800';
};