export class Cart {
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


export class Cart2K {
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

export class F8SuperChipCart {
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
            b = this.Data[this.Bank + index + this.Offset];
        }
        else if (index === 0xFF9) {
            this.Bank = 0x1000;
            b = this.Data[this.Bank + index + this.Offset];
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
                if (index & 0x80) {
                    index = index & 0x7F;
                    b = this.Data[index];
                }
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
            if (!(index & 0x80)) {
                index = index & 0x7F;
                this.Data[index] = value;
            }
        }
    }
}

export class F8Cart {
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

export class F6Cart {
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

        if(index === 0xFF6) {
            this.Bank = 0x0000;
        }
        else if(index === 0xFF7) {
            this.Bank = 0x1000;
        }
        else if (index === 0xFF8) {
            this.Bank = 0x2000;
        }
        else if (index === 0xFF9) {
            this.Bank = 0x3000;
        }
        else if (index === 0xFFC || index === 0xFFD) {
            // start vector
            b = this.Data[this.Bank + index + this.Offset];
        }
        else if (index === 0xFFE || index === 0xFFF) {
            // break vector
            b = this.Data[this.Bank + index + this.Offset];
        }
        else if ((this.Bank + index + this.Offset) < this.Data.length) {
            b = this.Data[this.Bank + index + this.Offset];
        }
        return b;
    }

    public WriteByte(address: number, value: number): void {
        var index: number = address & 0xFFF;

        if (index === 0xFF6) {
            this.Bank = 0x0000;
        }
        else if(index === 0xFF7) {
            this.Bank = 0x1000;
        }
        else if (index === 0xFF8) {
            this.Bank = 0x2000;
        }
        else if (index === 0xFF9) {
            this.Bank = 0x3000;
        }
    }
}

export class F6SuperChipCart {
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

        if(index === 0xFF6) {
            this.Bank = 0x0000;
        }
        else if(index === 0xFF7) {
            this.Bank = 0x1000;
        }
        else if (index === 0xFF8) {
            this.Bank = 0x2000;
        }
        else if (index === 0xFF9) {
            this.Bank = 0x3000;
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
                if (index & 0x80) {
                    index = index & 0x7F;
                    b = this.Data[index];
                }
            }
            else if ((this.Bank + index + this.Offset) < this.Data.length) {
                b = this.Data[this.Bank + index + this.Offset];
            }
        }
        return b;
    }

    public WriteByte(address: number, value: number): void {
        var index: number = address & 0xFFF;

        if (index === 0xFF6) {
            this.Bank = 0x0000;
        }
        else if(index === 0xFF7) {
            this.Bank = 0x1000;
        }
        else if (index === 0xFF8) {
            this.Bank = 0x2000;
        }
        else if (index === 0xFF9) {
            this.Bank = 0x3000;
        }
        else if (index < 0x100) {
            if (!(index & 0x80)) {
                index = index & 0x7F;
                this.Data[index] = value;
            }
        }
    }
}

export class E0Cart {
    public Data: number[];
    public BankMap: number[];

    constructor(data: number[]) {
        this.Data = data;
        this.BankMap = [0x0000, 0x0000, 0x0000, 0x1C00];
    }

    public ReadByte(address: number): number {
        var b: number = 0;
        var index: number = address & 0xFFF;
        var offset: number = address & 0x3FF;
        var slice = (address & 0xC00) >> 10;
        var bank = this.BankMap[slice];

        b = this.Data[bank + offset];

        if (index >= 0xFE0 && index <= 0xFE7) {
            this.BankMap[0] = (index & 0x007) << 10;
        }
        else if (index >= 0xFE8 && index <= 0xFEF) {
            this.BankMap[1] = (index & 0x007) << 10;
        }
        else if (index >= 0xFF0 && index <= 0xFF7) {
            this.BankMap[2] = (index & 0x007) << 10;
        }

        return b;
    }

    public WriteByte(address: number, value: number): void {
        var index: number = address & 0xFFF;

        if (index >= 0xFE0 && index <= 0xFE7) {
            this.BankMap[0] = (index & 0x007) << 10;
        }
        else if (index >= 0xFE8 && index <= 0xFEF) {
            this.BankMap[1] = (index & 0x007) << 10;
        }
        else if (index >= 0xFF0 && index <= 0xFF7) {
            this.BankMap[2] = (index & 0x007) << 10;
        }
    }
}

export class E7Cart {
    public Data: number[];
    public BankMap: number[];

    constructor(data: number[]) {
        this.Data = data;
        this.BankMap = [0x0000, 0x3800];
    }

    public ReadByte(address: number): number {
        var b: number = 0;
        var index: number = address & 0xFFF;
        var offset: number = address & 0x3FF;
        var slice = (address & 0xC00) >> 10;
        var bank = this.BankMap[slice];

        b = this.Data[bank + offset];
//1FE0 to 1FE6
        if (index >= 0xFE0 && index <= 0xFE6) {
            this.BankMap[0] = (index & 0x007) << 10;
        }
        else if (index === 0xFE6) {
            this.BankMap[1] = (index & 0x007) << 10;
        }
        else {
            this.BankMap[2] = (index & 0x007) << 10;
        }

        return b;
    }

    public WriteByte(address: number, value: number): void {
        var index: number = address & 0xFFF;

        if (index >= 0xFE0 && index <= 0xFE7) {
            this.BankMap[0] = (index & 0x007) << 10;
        }
        else if (index >= 0xFE8 && index <= 0xFEF) {
            this.BankMap[1] = (index & 0x007) << 10;
        }
        else if (index >= 0xFF0 && index <= 0xFF7) {
            this.BankMap[2] = (index & 0x007) << 10;
        }
    }
}

export class AutoCart {
    public Data: number[];
    public n1k: number;
    public n4k: number;
    public Offset: number;
    public Bank: number;
    public SuperChip: boolean;
    public ReadByte: (address: number) => number;
    public WriteByte: (address: number, value: number) => void;
 
    constructor(data: number[]) {
        this.Data = data;
        this.n1k = ((data.length + 0x300) / 0x400) & 0xFF;
        this.n4k = ((data.length + 0xC00) / 0x1000) & 0xFF;
        this.Offset = 0;
        this.Bank = 0;
        this.SuperChip = false;

        if (this.n1k <= 2) {
            this.ReadByte = this._readByte2K;
            this.WriteByte = this._writeNOP;
        } else if (this.n4k <= 1) {
            this.ReadByte = this._readByte4K;
            this.WriteByte = this._writeNOP;
        } else if (this.n4k <= 2) {
            this.ReadByte = this._readByteF8;
            this.WriteByte = this._writeByteF8;
        } else if (this.n4k <= 4) {
            this.ReadByte = this._readByteF6;
            this.WriteByte = this._writeByteF6;
        } else if (this.n4k <= 8) {
            this.ReadByte = this._readByteF4;
            this.WriteByte = this._writeByteF4;
        } else if (this.n4k <= 8) {
            this.ReadByte = this._readByteF2;
            this.WriteByte = this._writeByteF2;
        }
    }

    private _writeNOP(address: number): void {
        // Nothing to write
    };

    private _writeSuperChip(address: number, value: number): void {
        let index = address & 0xFFF;
        if (index < 0x100) {
            if (!(index && 0x80)) {
                this.SuperChip = true;
                index = index & 0x7F;
                this.Data[index] = value & 0xFF;
            }
        }
    }

    private _readSuperChip(address: number): number {
        let b = 0;
        let index = address & 0xFFF;
        if (index < 0x100) {
            if (index && 0x80) {
                index = index & 0x7F;
                b = this.Data[index];
            }
        }
        return b;
    }

    private _readByte2K(address: number): number {
        let b = 0;
        const index: number = address & 0x7FF;
        if (index < this.Data.length) {
            return this.Data[index];
        }
        return b;
    }

    private _readByte4K(address: number): number {
        let b = 0;
        const index = address & 0xFFF;
        if ((this.Bank + index + this.Offset) < this.Data.length) {
            b = this.Data[this.Bank + index + this.Offset];
        }
        return b;
    }

    private _readByteF8(address: number): number {
        let b = 0;
        let index = address & 0xFFF;

        if (index === 0xFF8) {
            this.Bank = 0x0000;
            b = this.Data[this.Bank + index + this.Offset];
        }
        else if (index === 0xFF9) {
            this.Bank = 0x1000;
            b = this.Data[this.Bank + index + this.Offset];
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
            if (this.SuperChip && index < 0x100) {
                b = this._readSuperChip(address);
            }
            else if ((this.Bank + index + this.Offset) < this.Data.length) {
                b = this.Data[this.Bank + index + this.Offset];
            }
        }
        return b;
    }

    private _writeByteF8(address: number, value: number): void {
        let index = address & 0xFFF;

        if(index === 0xFF8) {
            this.Bank = 0;
        }
        else if(index === 0xFF9) {
            this.Bank = 0x1000;
        }
        else {
            if (index < 0x100) {
                this._writeSuperChip(address, value);
            }
        }
    }

    private _readByteF6(address: number): number {
        let b = 0;
        let index = address & 0xFFF;

        if (index === 0xFF6) {
            this.Bank = 0;
            b = this.Data[this.Bank + index + this.Offset];
        }
        else if (index === 0xFF7) {
            this.Bank = 0x1000;
            b = this.Data[this.Bank + index + this.Offset];
        }
        else if (index === 0xFF8) {
            this.Bank = 0x2000;
            b = this.Data[this.Bank + index + this.Offset];
        }
        else if (index === 0xFF9) {
            this.Bank = 0x3000;
            b = this.Data[this.Bank + index + this.Offset];
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
            if (this.SuperChip && index < 0x100) {
                b = this._readSuperChip(address);
            }
            else if ((this.Bank + index + this.Offset) < this.Data.length) {
                b = this.Data[this.Bank + index + this.Offset];
            }
        }
        return b;
    }

    private _writeByteF6(address: number, value: number): void {
        let index = address & 0xFFF;

        if (index === 0xFF6) {
            this.Bank = 0;
        }
        else if (index === 0xFF7) {
            this.Bank = 0x1000;
        }
        if (index === 0xFF8) {
            this.Bank = 0x2000;
        }
        else if (index === 0xFF9) {
            this.Bank = 0x3000;
        }
        else {
            if (index < 0x100) {
                this._writeSuperChip(address, value);
            }
        }
    }

    private _readByteF4(address: number): number {
        let b = 0x00;
        let index = address & 0xFFF;

        if (index === 0xFF4) {
            this.Bank = 0x0000;
            b = this.Data[this.Bank + index + this.Offset];
        }
        else if (index === 0xFF5) {
            this.Bank = 0x1000;
            b = this.Data[this.Bank + index + this.Offset];
        }
        else if (index === 0xFF6) {
            this.Bank = 0x2000;
            b = this.Data[this.Bank + index + this.Offset];
        }
        else if (index === 0xFF7) {
            this.Bank = 0x3000;
            b = this.Data[this.Bank + index + this.Offset];
        }
        else if (index === 0xFF8) {
            this.Bank = 0x4000;
            b = this.Data[this.Bank + index + this.Offset];
        }
        else if (index === 0xFF9) {
            this.Bank = 0x5000;
            b = this.Data[this.Bank + index + this.Offset];
        }
        else if (index === 0xFFA) {
            this.Bank = 0x6000;
            b = this.Data[this.Bank + index + this.Offset];
        }
        else if (index === 0xFFB) {
            this.Bank = 0x7000;
            b = this.Data[this.Bank + index + this.Offset];
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
            if (this.SuperChip && index < 0x100) {
                b = this._readSuperChip(address);
            }
            else if ((this.Bank + index + this.Offset) < this.Data.length) {
                b = this.Data[this.Bank + index + this.Offset];
            }
        }
        return b;
    }

    private _writeByteF4(address: number, value: number): void {
        let index = address & 0xFFF;

        if (index === 0xFF4) {
            this.Bank = 0x0000;
        }
        else if(index === 0xFF5) {
            this.Bank = 0x1000;
        }
        else if (index === 0xFF6) {
            this.Bank = 0x2000;
        }
        else if(index === 0xFF7) {
            this.Bank = 0x3000;
        }
        else if (index === 0xFF8) {
            this.Bank = 0x4000;
        }
        else if (index === 0xFF9) {
            this.Bank = 0x5000;
        }
        else if (index === 0xFFA) {
            this.Bank = 0x6000;
        }
        else if (index === 0xFFB) {
            this.Bank = 0x7000;
        }
        else {
            if (index < 0x100) {
                this._writeSuperChip(address, value);
            }
        }
    }

    private _readByteF2(address: number): number {
        let b = 0;
        let index = address & 0xFFF;

        if (index === 0xFF2) {
            this.Bank = 0;
            b = this.Data[this.Bank + index + this.Offset];
        }
        else if (index === 0xFF3) {
            this.Bank = 0x1000;
            b = this.Data[this.Bank + index + this.Offset];
        }
        else if (index === 0xFF4) {
            this.Bank = 0x2000;;
            b = this.Data[this.Bank + index + this.Offset];
        }
        else if (index === 0xFF5) {
            this.Bank = 0x4000;;
            b = this.Data[this.Bank + index + this.Offset];
        }
        else if (index === 0xFF6) {
            this.Bank = 0x5000;;
            b = this.Data[this.Bank + index + this.Offset];
        }
        else if (index === 0xFF7) {
            this.Bank = 0x6000;;
            b = this.Data[this.Bank + index + this.Offset];
        }
        else if (index === 0xFF8) {
            this.Bank = 0x7000;;
            b = this.Data[this.Bank + index + this.Offset];
        }
        else if (index === 0xFF9) {
            this.Bank = 0x5000;
            b = this.Data[this.Bank + index + this.Offset];
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
            if (this.SuperChip && index < 0x100) {
                b = this._readSuperChip(address);
            }
            else if ((this.Bank + index + this.Offset) < this.Data.length) {
                b = this.Data[this.Bank + index + this.Offset];
            }
        }
        return b;
    }

    private _writeByteF2(address: number, value: number): void {
        let index = address & 0xFFF;

        if (index === 0xFF2) {
            this.Bank = 0;
        }
        else if (index === 0xFF3) {
            this.Bank = 0x1000;
        }
        else if (index === 0xFF4) {
            this.Bank = 0x2000;
        }
        else if (index === 0xFF5) {
            this.Bank = 0x3000;
        }
        else if (index === 0xFF6) {
            this.Bank = 0x4000;
        }
        else if (index === 0xFF7) {
            this.Bank = 0x5000;
        }
        else if (index === 0xFF8) {
            this.Bank = 0x6000;
        }
        else if (index === 0xFF9) {
            this.Bank = 0x7000;
        }
        else {
            if (index < 0x100) {
                this._writeSuperChip(address, value);
            }
        }
    }
}
