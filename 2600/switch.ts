class Switch {

    private data: number;

    constructor() {
        this.data = 0x0F;
    }

    public OnKeyDown(event: KeyboardEvent): void {
        if (event) {
            var keyCode: number = event.keyCode;
            switch (keyCode) {
                case 49:
                    this.data &= 0xFE;
                    break;
                case 50:
                    this.data &= 0xFD;
                    break;
                case 51:
                    this.data &= 0xFB;
                    break;
                case 52:
                    if (this.data & 0x08) {
                        this.data &= 0xF7;
                    }
                    else {
                        this.data |= 0x08;
                    }
                    break;
                case 53:
                    if (this.data & 0x10) {
                        this.data &= 0xEF;
                    }
                    else {
                        this.data |= 0x10;
                    }
                    break;
                case 54:
                    if (this.data & 0x20) {
                        this.data &= 0xDF;
                    }
                    else {
                        this.data !== 0x20;
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
                case 49:
                    this.data |= 0x01;
                    break;
                case 50:
                    this.data |= 0x02;
                    break;
                case 51:
                    this.data |= 0x04;
                    break;
                case 52:
                    break;
                case 53:
                    break;
                case 54:
                    break;
                default:
                    break;
            }
        }
    }

    public Init(): void {
        document.addEventListener("keydown", (event: KeyboardEvent) => { this.OnKeyDown(event); }, false);
        document.addEventListener("keyup", (event: KeyboardEvent) => { this.OnKeyUp(event); }, false);
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