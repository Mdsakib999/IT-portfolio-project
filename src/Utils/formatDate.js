export const formatDate = (dateString, locale = "en-US", options = {}) => {
    if (!dateString) return "N/A";

    const defaultOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };

    return new Date(dateString).toLocaleDateString(locale, {
        ...defaultOptions,
        ...options,
    });
};