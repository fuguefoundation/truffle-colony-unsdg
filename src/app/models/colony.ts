export class ColonyInstance {
    network: {
        addr: string;
    }
    account: {
        addr: string;
    }
    token: {
        addr: string;
        name: string;
    }
    colony: {
        addr: string;
        id: number;
    }
    domain: {
        name: string;
        id: number;
        desc: string;
        img: string;
        link: string;
    }
    task: {
        title: string;
        desc: string;
        domainId: number;
    }
}
