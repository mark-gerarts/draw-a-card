export class Exercise {
    id: string;
    title: string;
    subtitle: string;
    detailsLink: string;
    image: string;

    constructor(
        id: string,
        title: string,
        subtitle: string,
        detailsLink: string,
        image: string
    ) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.detailsLink = detailsLink;
        this.image = image;
    }
}
