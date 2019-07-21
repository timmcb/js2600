export class Ram {
    private readonly mem: number[];

    constructor() {
        this.mem = new Array(0x80);
    }

    public Init(): void {
        for (var i = 0; i < 0x80; i++) {
            // Zero
            //this.mem[i] = 0;
            // or Random
            this.mem[i] = (Math.random() * 0xFF) & 0xFF;
        }
    }

    public ReadByte(address: number): number {
        var index = address & 0x7F,
            value = this.mem[index];

        return value;
    }

    public WriteByte(address: number, value: number): void {
        var index = address & 0x7F;
        this.mem[index] = value;
    }

    public toString(): string {
        var str = "";
        for(var a = 0x80; a < 0x100; a++ ) {
            var index = a & 0x7F;
            var value = this.mem[index];
            str += a.toString(16) + ": " + value.toString(16) + "\n";
        }
        return str;
    }
} 
