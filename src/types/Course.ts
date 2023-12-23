import { User } from "./Auth";

export type Course = {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    level: string;
    reason: string;
    purpose: string;
    other_details: string;
    default_price: number;
    course_price: number;
    courseType: null;
    sectionType: null;
    visible: boolean;
    displayOrder: null;
    createdAt: string;
    updatedAt: string;
    topics: Topic[];
    users?: User[];
};

export type Topic = {
    id: string;
    courseId: string;
    orderCourse: number;
    name: string;
    beforeTheClassNotes: null;
    afterTheClassNotes: null;
    nameFile: string;
    numberOfPages: null;
    description: string;
    videoUrl: null;
    type: null;
    createdAt: string;
    updatedAt: string;
};