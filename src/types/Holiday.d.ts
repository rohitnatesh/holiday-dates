type StringBoolean = "Yes" | "No";

export interface Holiday {
    /**
     * String of format "mm/dd/yyyy, day"
     */
    startDate: string;
    startYear: number;
    startMonth: number;
    startDate: number;
    name: string;
    country: string;
    businessesClosed: StringBoolean;
    banksClosed: StringBoolean;
    religiousHoliday: StringBoolean;
    religion: string;
    /**
     * Disrespectful?
     */
    dis: StringBoolean;
    holidayNote?: string;
}
