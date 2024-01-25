import { User } from "./Auth";

export type Category = {
    id: string
    title: string,
    description: null,
    key: string,
    displayOrder: null,
    createdAt: string;
    updatedAt: string;
}

export type Course = {
    id: string;
    name: string;
    categories: Category[]
    description: string;
    imageUrl: string;
    fileUrl?: string;
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
    topics?: Topic[];
    users?: User[];
};

export type EBook = {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    level: string;
    visible: boolean,
    fileUrl: string;
    createdAt: string;
    updatedAt: string;
    isPrivate: null,
    createdBy: null,
    categories: Category[];
}

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