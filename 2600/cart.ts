class Cart {
    public Data: number[];

    constructor(data: number[]) {
        this.Data = data;
    }

    public ReadByte(address: number): number {
        var index = address & 0xFFF;
        var d = this.Data;
        if (index < d.length) {
            return d[index];
        }
        return 0;
    }

    public WriteByte(address: number, value: number): void {
        // Mostly carts are read-only
        // except for bank switches
    }
}


class Cart2K {
    public Data: number[];

    constructor(data: number[]) {
        this.Data = data;
    }

    public ReadByte(address: number): number {
        var index: number = address & 0x7FF,
            d: number[] = this.Data;
        if (index < d.length) {
            return d[index];
        }
        return 0;
    }

    public WriteByte(address: number, value: number): void {
        // Mostly carts are read-only
        // except for bank switches
    }
}

class F8SuperChipCart {
    public Data: number[];
    public Offset: number;
    public Bank: number;

    constructor(data: number[]) {
        this.Data = data;
        this.Offset = 0;
        this.Bank = 0x0000;
    }

    public ReadByte(address: number): number {
        var b: number = 0,
            index: number = address & 0xFFF;

        //if(index === 0xFF6) {
        //    this.Bank = 0;
        //}
        //else if(index === 0xFF7) {
        //    this.Bank = 0x1000;
        //}
        if (index === 0xFF8) {
            this.Bank = 0x0000;
        }
        else if (index === 0xFF9) {
            this.Bank = 0x1000;
        }
        else if (index === 0xFFC || index === 0xFFD) {
            // start vector
            b = this.Data[this.Bank + index + this.Offset];
        }
        else if (index === 0xFFE || index === 0xFFF) {
            // break vector
            b = this.Data[this.Bank + index + this.Offset];
        }
        else {
            if (index < 0x100) {
                index = index & 0x7F;
                b = this.Data[index];
            }
            else if ((this.Bank + index + this.Offset) < this.Data.length) {
                b = this.Data[this.Bank + index + this.Offset];
            }
        }
        return b;
    }

    public WriteByte(address: number, value: number): void {
        var index: number = address & 0xFFF;

        //if(index === 0xFF6) {
        //    this.Bank = 0;
        //}
        //else if(index === 0xFF7) {
        //    this.Bank = 0x1000;
        //}
        if (index === 0xFF8) {
            this.Bank = 0x0000;
        }
        else if (index === 0xFF9) {
            this.Bank = 0x1000;
        }
        else if (index < 0x100) {
            index = index & 0x7F;
            this.Data[index] = value;
        }
    }
}

class F8Cart {
    public Data: number[];
    public Offset: number;
    public Bank: number;

    constructor(data: number[]) {
        this.Data = data;
        this.Offset = 0;
        this.Bank = 0x0000;
    }

    public ReadByte(address: number): number {
        var b: number = 0,
            index: number = address & 0xFFF;

        if (index === 0xFF8) {
            this.Bank = 0x0000;
        }
        else if (index === 0xFF9) {
            this.Bank = 0x1000;
        }
        else if (index === 0xFFC || index === 0xFFD) {
            // start vector
            b = this.Data[this.Bank + index + this.Offset];
        }
        else if (index === 0xFFE || index === 0xFFF) {
            // break vector
            b = this.Data[this.Bank + index + this.Offset];
        }
        else {
            if ((this.Bank + index + this.Offset) < this.Data.length) {
                b = this.Data[this.Bank + index + this.Offset];
            }
        }
        return b;
    }

    public WriteByte(address: number, value: number): void {
        var index: number = address & 0xFFF;

        if (index === 0xFF8) {
            this.Bank = 0x0000;
        }
        else if (index === 0xFF9) {
            this.Bank = 0x1000;
        }
    }
}

class AutoCart {
    public Data: number[];
    public n1k: number;
    public n4k: number;
    public Offset: number;
    public Bank: number;

    constructor(data: number[]) {
        this.Data = data;
        this.n1k = ((data.length + 0x300) / 0x400) & 0xFF;
        this.n4k = ((data.length + 0xC00) / 0x1000) & 0xFF;
        this.Offset = 0;
        this.Bank = 0;
    }

    public ReadByte(address: number): number {
        var b: number = 0,
            index: number = address & 0xFFF;

        //if(index === 0xFF6) {
        //    this.Bank = 0;
        //}
        //else if(index === 0xFF7) {
        //    this.Bank = 0x1000;
        //}
        if (index === 0xFF8) {
            this.Bank = 0x0000;
        }
        else if (index === 0xFF9) {
            this.Bank = 0x1000;
        }
        else if (index === 0xFFC || index === 0xFFD) {
            // start vector
            b = this.Data[this.Bank + index + this.Offset];
        }
        else if (index === 0xFFE || index === 0xFFF) {
            // break vector
            b = this.Data[this.Bank + index + this.Offset];
        }
        else {
            if (index < 0x100) {
                index = index & 0x7F;
                b = this.Data[index];
            }
            else if ((this.Bank + index + this.Offset) < this.Data.length) {
                b = this.Data[this.Bank + index + this.Offset];
            }
        }
        return b;
    }
}
