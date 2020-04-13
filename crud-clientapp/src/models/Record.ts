
export class Record {
    public id?: number;
    public name?: string;
    public value: number;
    public date?: string;
    public time?: string;
    constructor(
        value: number,
        name: string,
        date: string,
        time: string,
        id?: number) {
        this.value = value;
        this.name = name;
        this.date = date;
        this.time = time;
        this.id = id;
    }
}


