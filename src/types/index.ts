import React from "react";

export interface Book {
    id: number;
    name: string;
    author: string;
    description: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
}

export interface FormType {
    type: "create" | "alter";
    setFormVisiblity: (value: Boolean) => void;
    FormVisiblity: Boolean;
    book: {
        id?: number;
        name?: string;
        author?: string;
        description?: string;
        rating?: number;
    }
}

export interface  previousFormValues{
    id: number;
    name: string;
    author: string;
    description: string;
    rating: number;
};