export class Switch {

    private data: number;

    constructor() {
        this.data = 0x0B;
    }

    public OnKeyDown(event: KeyboardEvent): void {
        if (event) {
            var keyCode: number = event.keyCode;
            switch (keyCode) {
                case 49: // reset
                    this.data &= 0xFE; // ~0x01
                    break;
                case 50: // select
                    this.data &= 0xFD; // ~0x02
                    break;
                case 51: // black and white
                    if (this.data & 0x08) {
                        this.data &= 0xF7; // ~0x08
                    }
                    else {
                        this.data |= 0x08;
                    }
                    break;
                case 52: // P0 Difficulty
                    if (this.data & 0x40) {
                        this.data &= 0xBF; // ~0x40
                    }
                    else {
                        this.data |= 0x40;
                    }
                    break;
                case 53: // P1 Difficulty
                    if (this.data & 0x80) {
                        this.data &= 0x7F; // ~0x80
                    }
                    else {
                        this.data |= 0x80;
                    }
                    break;
                default:
                    break;
            }
        }
    }

    public OnKeyUp(event: KeyboardEvent): void {
        if (event) {
            var keyCode: number = event.keyCode;
            switch (keyCode) {
                case 49: // reset
                    this.data |= 0x01;
                    break;
                case 50: // difficulty
                    this.data |= 0x02;
                    break;
                default:
                    break;
            }
        }
    }

    public Init(): void {
        document.addEventListener("keydown", event => { this.OnKeyDown(event); }, false);
        document.addEventListener("keyup", event => { this.OnKeyUp(event); }, false);
    }

    //D7 P1 difficulty 0 = amateur (B), 1 = pro (A)
    //D6 P0 difficulty 0 = amateur (B), 1 = pro (A)
    //D5/D4 (not used)
    //D3 color - B/W 0 = B/W, 1 = color
    //D2 (not used)
    //D1 game select 0 = switch pressed
    //D0 game reset 0 = switch pressed
    public ReadByte(address: number): number {
        return this.data;
    }
}