const monthStrings: { [key: string]: string } = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
};

export const formatDate = (timestamp?: string) => {
    if (!timestamp) return "";

    const [date] = timestamp.split("T");
    const [year, month, day] = date.split("-");

    return `${monthStrings[month]} ${day}, ${year}`;
};
