export interface MenuResponse {
    MTitle: string;
    MUrl: string;
    MIcon: string;
    MChildren: MenuChildrenResponse[];
}

export interface MenuChildrenResponse {
    MCTitle: string;
    MCUrl: string;
    MCIcon: string;
    MCName: string;
}