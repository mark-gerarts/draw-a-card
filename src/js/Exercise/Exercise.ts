export class Exercise {
    id: string;
    title: string;
    subtitle: string;
    detailsLink: string;
    image: string;
    isCustom: boolean;

    constructor(
        id: string,
        title: string,
        subtitle: string,
        detailsLink: string,
        image: string,
        isCustom: boolean = false
    ) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.detailsLink = detailsLink;
        this.image = image;
        this.isCustom = isCustom;
    }
}
