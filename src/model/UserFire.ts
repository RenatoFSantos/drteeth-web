export default class UserFire {
    #id: string;
    #name: string;
    #age: number;

    constructor(name: string, age: number, id: string = null) {
        this.#name = name;
        this.#age = age;
        this.#id = id;
    }

    static vazio() {
        return new UserFire('', 0);
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get age() {
        return this.#age;
    }

    set name(name: string) {
        this.#name = name;
    }

    set age(age: number) {
        this.#age = age;
    }
}
