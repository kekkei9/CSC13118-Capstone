export type HistoryItem = {
    createdAtTimeStamp: number;
    updatedAtTimeStamp: number;
    id: string;
    userId: string;
    scheduleDetailId: string;
    tutorMeetingLink: string;
    studentMeetingLink: string;
    googleMeetLink: string | null;
    studentRequest: string | null;
    tutorReview: string | null;
    scoreByTutor: string | null;
    createdAt: string;
    updatedAt: string;
    recordUrl: string | null;
    cancelReasonId: string | null;
    lessonPlanId: string | null;
    cancelNote: string | null;
    calendarId: string | null;
    isDeleted: boolean;
    isTrial: boolean;
    convertedLesson: number;
    scheduleDetailInfo: {
        startPeriodTimestamp: number;
        endPeriodTimestamp: number;
        id: string;
        scheduleId: string;
        startPeriod: string;
        endPeriod: string;
        createdAt: string;
        updatedAt: string;
        scheduleInfo: {
            date: string;
            startTimestamp: number;
            endTimestamp: number;
            id: string;
            tutorId: string;
            startTime: string;
            endTime: string;
            isDeleted: boolean;
            createdAt: string;
            updatedAt: string;
            tutorInfo: {
                id: string;
                level: string;
                email: string;
                google: string | null;
                facebook: string | null;
                apple: string | null;
                avatar: string;
                name: string;
                country: string;
                phone: string;
                language: string;
                birthday: string;
                requestPassword: boolean;
                isActivated: boolean;
                isPhoneActivated: boolean | null;
                requireNote: boolean | null;
                timezone: number;
                phoneAuth: string | null;
                isPhoneAuthActivated: boolean;
                studySchedule: string;
                canSendMessage: boolean;
                isPublicRecord: boolean;
                caredByStaffId: string | null;
                zaloUserId: string | null;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                studentGroupId: string | null;
            };
        };
    };
    classReview: string | null;
    trialBookingReview: string | null;
    showRecordUrl: boolean;
    studentMaterials: any[];
    feedbacks: {
        id: string;
        bookingId: string;
        firstId: string;
        secondId: string;
        rating: number;
        content: string;
        createdAt: string;
        updatedAt: string;
    }[];
};

export type TutorSchedule = {
    id: string;
    tutorId: string;
    startTime: string;
    endTime: string;
    startTimestamp: number;
    endTimestamp: number;
    createdAt: string;
    isBooked: boolean;
    scheduleDetails: {
        startPeriodTimestamp: number;
        endPeriodTimestamp: number;
        id: string;
        scheduleId: string;
        startPeriod: string;
        endPeriod: string;
        createdAt: string;
        updatedAt: string;
        bookingInfo: {
            createdAtTimeStamp: number;
            updatedAtTimeStamp: number;
            id: string;
            userId: string;
            // Add more properties if needed
        }[];
        // Add more properties if needed
    }[];
};