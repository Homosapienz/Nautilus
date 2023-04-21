export function typesEqual(obj1: any, obj2: any) {
    if( Object.keys(obj1).length != Object.keys(obj2).length)
        return false;

    for(let entry of Object.keys(obj1))
        if(!Object.keys(obj2).includes(entry))
            return false;

    return true;
}

export class TaxonFilter {
    public definition!: TaxonDefinition;
    public areas: Area[] = [];
    public diagnostics: DiagnosticCharacter[] = [];
    public icons: Icon[] = [];
    public bibliographicSource!: BibliographicSource;
    public stratigraphy!: StratigraphicData;

    constructor() {
        this.reset();
    }

    reset(group?: string){
        this.definition = {
            group: group ? group: undefined,
            subgroups: undefined,
            genuses: undefined,
            species: undefined,
            subspecies: undefined
        }

        this.areas = [];
        this.diagnostics = [];
        this.icons = [];
        this.bibliographicSource = <BibliographicSource>{}
        this.stratigraphy = <StratigraphicData>{}
    }
}

export type TaxonDefinition = {
    group?: string | null;
    subgroups?: string;
    genuses?: string;
    species?: string;
    subspecies?: string;
}

export type Area = {
    regionCode: string;
    regionName: string;
    countryCode: string;
    countryName: string;
}

export type DiagnosticCharacter = {
    groupId: string;
    subgroupId: string;
    code: string;
    description: string;
}

export type Icon = {
    character: DiagnosticCharacter,
    fileName: string,
    row: number,
    column: number
}

export type BibliographicSource = {
    code: string,
    author: string,
    year: string,
    sbj: string
}

export class BibliographicSearch {
    Code: string = '';
    Author: string = '';
    Year: string = '';
    Quote: string = '';
    Subject: string = '';

    get hasValue(): boolean {
        return this.Code?.length > 0
                || this.Author?.length > 0
                || this.Year?.length > 0
                || this.Quote?.length > 0
                || this.Subject?.length > 0;
    }
}

export class StratigraphicData {
    searchSubject: StratigraphicSubject = "AGES";
    searchLimit: StratigraphicLimit = "INTERVAL"
    restrictedValues: boolean = false;
    Top: StratigraphicAge | StratigraphicBiozone = <StratigraphicAge>{};
    Bottom: StratigraphicAge | StratigraphicBiozone = <StratigraphicAge>{};

    get isDefined(): boolean {
        return (this.searchLimit === 'INTERVAL' && this.Bottom.code != null && this.Top.code != null)
            ||  (this.searchLimit === 'TOPLIMIT' && this.Top.code != null)
            ||  (this.searchLimit === 'BOTTOMLIMIT' && this.Bottom.code != null)
    }
}

export interface TaxonClass {
    id: string;
    name: string;
}

export type StratigraphicAge = {
    erathema: string,
    systeme: string,
    series: string,
    stage: string,
    source: string,
    code: string,
    top: number,
    bottom: number
}

export type StratigraphicBiozone = {
    name: string,
    source: string,
    code: string,
    top: number,
    bottom: number
}

export type StratigraphicSubject = "AGES" | "BIOZONES";
export type StratigraphicLimit = "INTERVAL" | "TOPLIMIT" | "BOTTOMLIMIT"