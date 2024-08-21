export class Thread{
    public id: Number;
    public list_messages: Message[];
    public last_author: string;
    public last_description: string;
    public last_timestamp: Date;
}
export class Message{
    public id: Number;
    public author: string;
    public description: string;
    public timestamp: Date; 
}
export class Test{
    public id: Number;
    public submitter: string;
    public description: string;
    public date_due: Date;
    public name: string;
    public file: File;
    public max_points: number;
    public student_points: number;
}
export class Lecture{
    id: number;
    description: string; 
    name: string;
    file: File;
}
export class Assignment{
    constructor(){}
    public id: Number;
    public submitter: string;
    public description: string;
    public date_due: Date;
    public name: string;
    public file: File;
    public max_points: number;
    public student_points: number;
}

export class Course{
    constructor(){}
    public name: string;
    public lectures: Lecture[];
    public profiles: Profile[];
    public assignments: Assignment[];
    public tests: Test[];
    public threads: Thread[];
    public pk: Number;
}
export class Canvas{
    constructor(){}
    public list_courses: Course[];
    public current_course: Course;
    public pk: Number; 
}
export class Profile{
    constructor(){}
    public pk: Number;
    public email: string;
    public first_name: string;
    public last_name: string;
    public date_of_birth: Date;
}
export class CustomUser{
    constructor(){}
    public username: string;
    public email: string;
    public is_staff: boolean;
    public pk: Number;
    public profile: Profile;
    public canvas: Canvas; 
}

