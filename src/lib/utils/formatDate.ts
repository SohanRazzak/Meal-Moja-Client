export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};