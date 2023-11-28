
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateNoteInput {
    exampleField?: Nullable<number>;
}

export class UpdateNoteInput {
    id: number;
}

export class Note {
    id: string;
    title: string;
    content: string;
    author: User;
    created_at: DateTime;
    updated_at: DateTime;
    collaborators: User[];
    version: number;
}

export class User {
    id: string;
    username: string;
    email: string;
}

export abstract class IQuery {
    abstract notes(): Nullable<Note>[] | Promise<Nullable<Note>[]>;

    abstract note(id: number): Nullable<Note> | Promise<Nullable<Note>>;

    abstract findOne(id: number): Nullable<Note> | Promise<Nullable<Note>>;
}

export abstract class IMutation {
    abstract createNote(createNoteInput: CreateNoteInput): Note | Promise<Note>;

    abstract updateNote(updateNoteInput: UpdateNoteInput): Note | Promise<Note>;

    abstract removeNote(id: number): Nullable<Note> | Promise<Nullable<Note>>;
}

export type DateTime = any;
type Nullable<T> = T | null;
