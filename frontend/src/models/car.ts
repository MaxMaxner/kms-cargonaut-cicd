enum CarType {
    PKW = 'PKW',
    Transporter = 'Transporter',
    LKW = 'LKW',
}

enum CarFeature {
    Klimaanlage = 'Klimaanlage',
    Heizung = 'Heizung',
    ElektrischeFensterheber = 'Elektrische Fensterheber',
    Sportausstattung = 'Sportausstattung',
    Ladeflaeche = 'Ladeflaeche',
}

export class Car {
    private nrplate: string;
    private usermail: string;
    private brand: string;
    private model: string;
    private maximalloadheight: number;
    private maximalloadwidth: number;
    private weight: number;
    private maximalloadweight: number;
    private type: CarType;
    private features: CarFeature[];

    constructor(
        nrplate: string,
        usermail: string,
        brand: string,
        model: string,
        maximalloadheight: number,
        maximalloadwidth: number,
        weight: number,
        maximalloadweight: number,
        type: CarType,
        features: CarFeature[]
    ) {
        this.nrplate = nrplate;
        this.usermail = usermail;
        this.brand = brand;
        this.model = model;
        this.maximalloadheight = maximalloadheight;
        this.maximalloadwidth = maximalloadwidth;
        this.weight = weight;
        this.maximalloadweight = maximalloadweight;
        this.type = type;
        this.features = features;
    }

    getNrPlate(): string {
        return this.nrplate;
    }

    getUserMail(): string {
        return this.usermail;
    }

    setUserMail(value: string) {
        // Validierung der E-Mail-Adresse
        if (this.validateEmail(value)) {
            this.usermail = value;
        } else {
            throw new Error('Ungültige E-Mail-Adresse.');
        }
    }
    getBrand(): string {
        return this.brand;
    }

    getModel(): string {
        return this.model;
    }

    getMaximalLoadHeight(): number {
        return this.maximalloadheight;
    }

    getMaximalLoadWidth(): number {
        return this.maximalloadwidth;
    }

    getWeight(): number {
        return this.weight;
    }

    getMaximalLoadWeight(): number {
        return this.maximalloadweight;
    }

    getType(): CarType {
        return this.type;
    }

    getFeatures(): CarFeature[] {
        return this.features;
    }

    private validateEmail(email: string): boolean {
        // E-Mail-Validierung implementieren (z. B. mit regulären Ausdrücken)
        // Beispiel: Überprüfung auf das Vorhandensein eines @-Symbols
        const emailRegex = /@/;
        return emailRegex.test(email);
    }
}
