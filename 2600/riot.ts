import { Port } from "Port";
import { Switch } from "Switch";

export class Riot {
    public Port1: Port;
    public Port2: Port;
    public mem: number[];
    public switchBank: Switch;
    public SWCHA: number;
    public SWACNT: number;
    public SWCHB: number;
    public SWBCNT: number;
    public DINT1NE: number;
    public DINT1PE: number;
    public EINT1NE: number;
    public EINT1PE: number;
    public INTIM: number;
    public TIMINT: number; //aka INSTAT, INTFLG (Bit 7 is the Timer flag) (Bit 6 is PA7 edge detect)
    public TIM1T: number;
    public TIM8T: number;
    public TIM64T: number;
    public T1024T: number;
    public shift: number;
    public counter: number;
    public bcounter: number;
    public ReadMap: Array<(address: number) => number>;
    public WriteMap: Array<(address: number, value: number) => void>;

    constructor(port1: Port, port2: Port) {
        this.Port1 = port1;
        this.Port2 = port2;
        this.mem = new Array(0x80);
        this.switchBank = new Switch();

        this.SWCHA = 0;
        this.SWACNT = 0;
        this.SWCHB = 0;
        this.SWBCNT = 0;
        this.DINT1NE;
        this.DINT1PE;
        this.EINT1NE;
        this.EINT1PE;
        this.INTIM = 0;
        this.TIMINT = 0;  //aka INSTAT, INTFLG
        this.TIM1T = 0;
        this.TIM8T = 0;
        this.TIM64T = 0;
        this.T1024T = 0;
        this.shift = 0;
        this.counter = 0;
        this.bcounter = 0;

        this.ReadMap = [
            this.ReadSWCHA,  //$0280 = (RIOT $00) - Read DRA
            this.ReadSWACNT, //$0281 = (RIOT $01) - Read DDRA
            this.ReadSWCHB,  //$0282 = (RIOT $02) - Read DRB
            this.ReadSWBCNT, //$0283 = (RIOT $03) - Read DDRB
            this.ReadINTIM,  //$0284 = (RIOT $04) - Read timer, disable interrupt (2)
            this.ReadTIMINT, //$0285 = (RIOT $05) - Read interrupt flag
            this.ReadINTIM,  //$0286 = (RIOT $06) - Read timer, disable interrupt (2)
            this.ReadTIMINT, //$0287 = (RIOT $07) - Read interrupt flag
            this.ReadSWCHA,  //$0288 = (RIOT $08) - Read DRA
            this.ReadSWACNT, //$0289 = (RIOT $09) - Read DDRA
            this.ReadSWCHB,  //$028A = (RIOT $0A) - Read DRB
            this.ReadSWBCNT, //$028B = (RIOT $0B) - Read DDRB
            this.ReadINTIM,  //$028C = (RIOT $0C) - Read timer, enable interrupt (2)
            this.ReadTIMINT, //$028D = (RIOT $0D) - Read interrupt flag
            this.ReadINTIM,  //$028E = (RIOT $0E) - Read timer, enable interrupt (2)
            this.ReadTIMINT, //$028F = (RIOT $0F) - Read interrupt flag
            this.ReadSWCHA,  //$0290 = (RIOT $10) - Read DRA
            this.ReadSWACNT, //$0291 = (RIOT $11) - Read DDRA
            this.ReadSWCHB,  //$0292 = (RIOT $12) - Read DRB
            this.ReadSWBCNT, //$0293 = (RIOT $13) - Read DDRB
            this.ReadINTIM,  //$0294 = (RIOT $14) - Read timer, disable interrupt (2)
            this.ReadTIMINT, //$0295 = (RIOT $15) - Read interrupt flag
            this.ReadINTIM,  //$0296 = (RIOT $16) - Read timer, disable interrupt (2)
            this.ReadTIMINT, //$0297 = (RIOT $17) - Read interrupt flag
            this.ReadSWCHA,  //$0298 = (RIOT $18) - Read DRA
            this.ReadSWACNT, //$0299 = (RIOT $19) - Read DDRA
            this.ReadSWCHB,  //$029A = (RIOT $1A) - Read DRB
            this.ReadSWBCNT, //$029B = (RIOT $1B) - Read DDRB
            this.ReadINTIM,  //$029C = (RIOT $1C) - Read timer, enable interrupt (2)
            this.ReadTIMINT, //$029D = (RIOT $1D) - Read interrupt flag
            this.ReadINTIM,  //$029E = (RIOT $1E) - Read timer, enable interrupt (2)
            this.ReadTIMINT  //$029F = (RIOT $1F) - Read interrupt flag
        ];

        this.WriteMap = [
            this.WriteSWCHA,    //$0280 = (RIOT $00) - Write DRA
            this.WriteSWACNT,   //$0281 = (RIOT $01) - Write DDRA
            this.WriteSWCHB,    //$0282 = (RIOT $02) - Write DRB
            this.WriteSWBCNT,   //$0283 = (RIOT $03) - Write DDRB
            this.WriteDINT1NE,  //$0284 = (RIOT $04) - Write edge detect control - negative edge, disable int (1)
            this.WriteDINT1PE,  //$0285 = (RIOT $05) - Write edge detect control - positive edge, disable int (1)
            this.WriteEINT1NE,  //$0286 = (RIOT $06) - Write edge detect control - negative edge, enable int (1)
            this.WriteEINT1PE,  //$0287 = (RIOT $07) - Write edge detect control - positive edge, enable int (1)
            this.WriteSWCHA,    //$0288 = (RIOT $08) - Write DRA
            this.WriteSWACNT,   //$0289 = (RIOT $09) - Write DDRA
            this.WriteSWCHB,    //$028A = (RIOT $0A) - Write DRB
            this.WriteSWBCNT,   //$028B = (RIOT $0B) - Write DDRB
            this.WriteDINT1NE,  //$028C = (RIOT $0C) - Write edge detect control - negative edge, disable int (1)
            this.WriteDINT1PE,  //$028D = (RIOT $0D) - Write edge detect control - positive edge, disable int (1)
            this.WriteEINT1NE,  //$028E = (RIOT $0E) - Write edge detect control - negative edge, enable int (1)
            this.WriteEINT1PE,  //$028F = (RIOT $0F) - Write edge detect control - positive edge, enable int (1)
            this.WriteSWCHA,    //$0290 = (RIOT $10) - Write DRA
            this.WriteSWACNT,   //$0291 = (RIOT $11) - Write DDRA
            this.WriteSWCHB,    //$0292 = (RIOT $12) - Write DRB
            this.WriteSWBCNT,   //$0293 = (RIOT $13) - Write DDRB
            this.WriteTIM1T,    //$0294 = (RIOT $14) - Write timer (div by 1)    - disable int (2)
            this.WriteTIM8T,    //$0295 = (RIOT $15) - Write timer (div by 8)    - disable int (2)
            this.WriteTIM64T,   //$0296 = (RIOT $16) - Write timer (div by 64)   - disable int (2)
            this.WriteTIM1024T, //$0297 = (RIOT $17) - Write timer (div by 1024) - disable int (2)
            this.WriteSWCHA,    //$0298 = (RIOT $18) - Write DRA
            this.WriteSWACNT,   //$0299 = (RIOT $19) - Write DDRA
            this.WriteSWCHB,    //$029A = (RIOT $1A) - Write DRB
            this.WriteSWBCNT,   //$029B = (RIOT $1B) - Write DDRB
            this.WriteTIM1T,    //$029C = (RIOT $1C) - Write timer (div by 1)    - enable int (2)
            this.WriteTIM8T,    //$029D = (RIOT $1D) - Write timer (div by 8)    - enable int (2)
            this.WriteTIM64T,   //$029E = (RIOT $1E) - Write timer (div by 64)   - enable int (2)
            this.WriteTIM1024T  //$029F = (RIOT $1F) - Write timer (div by 1024) - enable int (2)
        ];

        // Init the timer in 1024 mode
        //this.WriteTIM1024T(0x0297, (Math.random() * 0xFF) & 0xFF);
    }

    /* 
    Pin Port 0   Port 1   Joystick  Paddle       Keypad
    --- -------  -------  --------  -----------  -------
    1   SWCHA.4  SWCHA.0  <Up        -           >Row 0
    2   SWCHA.5  SWCHA.1  <Down      -           >Row 1 
    3   SWCHA.6  SWCHA.2  <Left      <Button 0   >Row 3
    4   SWCHA.7  SWCHA.3  <Right     <Button 2   >Row 4
    5   INPT0.7  INPT2.7  -          <Pot 0      <Column 0
    6   INPT4.7  INPT5.7  <Button    -           <Column 2
    7   +5V      +5V      
    8   ground   ground   
    9   INPT1.7  INPT3.7  -          <Pot 1      <Column 1   
    */
    public ReadSWCHA(address: number) {
        const ddra = this.SWACNT; // all pins are writable
        const pins1 = this.Port1.ReadPins() & 0x00F;
        const pins2 = this.Port2.ReadPins() & 0x00F;
        const portin = (pins1 << 4) | pins2;
        const input = portin & ~ddra;
        const output = this.SWCHA & ddra;
        const value = output | input;
        return value;
    }

    public ReadSWACNT(address: number): number {
        return this.SWACNT;
    }

    public ReadSWCHB(address: number): number {
        const ddrb = this.SWBCNT & 0x34; // D2,D4,D5 are writable
        const input = this.switchBank.ReadByte(address) & ~ddrb; // 0 is on
        const output = this.SWCHB & ddrb; 
        const value = input | output;
        return value;
    }

    public ReadSWBCNT(address: number): number {
        return this.SWBCNT;
    }

    public ReadINTIM(address: number): number {
        this.TIMINT &= 0x7F; // Clear Timer Flag (bit 7)
        return this.INTIM;
    }

    public ReadTIMINT(address: number): number {
        const flag = this.TIMINT;
        this.TIMINT &= 0xBF; // Clear PA7 Edge detect (bit 6)
        return flag;
    }

    public WriteSWCHA(address: number, value: number) {
        // The switch bits are writable when set to output
        this.SWCHA = value & this.SWACNT;
    }

    public WriteSWACNT(address: number, value: number) {
        this.SWACNT = value;
    }

    public WriteSWCHB(address: number, value: number) {
        // The switch bits are hard wired for read
        // The rest of the bits are writable
        this.SWCHB = value & this.SWBCNT & 0x34; // only D2,D4,D5 are writable
    }

    public WriteSWBCNT(address: number, value: number) {
        this.SWBCNT = value;
    }

    public WriteDINT1NE(address: number, value: number): void {
        this.DINT1NE = value;
    }

    public WriteDINT1PE(address: number, value: number): void {
        this.DINT1PE = value;
    }

    public WriteEINT1NE(address: number, value: number): void {
        this.EINT1NE = value;
    }

    public WriteEINT1PE(address: number, value: number): void {
        this.EINT1PE = value;
    }

    public WriteTIM1T(address: number, value: number): void {
        this.TIM1T = value;
        this.INTIM = value;
        this.TIMINT &= 0x7F; // Clear Timer Flag (bit 7)
        this.shift = 0;
        this.counter = (value << this.shift) | 0x0;
        this.bcounter = 0;
    }

    public WriteTIM8T(address: number, value: number): void {
        this.TIM8T = value;
        this.INTIM = value;
        this.TIMINT &= 0x7F; // Clear Timer Flag (bit 7)
        this.shift = 3;
        this.counter = value << 3 | 0x7;
        this.bcounter = 0;
    }

    public WriteTIM64T(address: number, value: number): void {
        this.TIM64T = value;
        this.INTIM = value;
        this.TIMINT &= 0x7F; // Clear Timer Flag (bit 7)
        this.shift = 6;
        this.counter = (value << this.shift) | 0x3F;
        this.bcounter = 0;
    }

    public WriteTIM1024T(address: number, value: number): void {
        this.T1024T = value;
        this.INTIM = value;
        this.TIMINT &= 0x7F; // Clear Timer Flag (bit 7)
        this.shift = 10;
        this.counter = (value << this.shift) | 0x3FF;
        this.bcounter = 0;
    }

    public Init(): void {
        var index: number = 0x7F;
        while (index--) {
            // Zero mem
            //this.mem[index] = 0;
            // or Randomize
            this.mem[index] = (Math.random() * 0xFF) & 0xFF;
        }
        this.switchBank.Init();
    }

    public Step(cycles: number): void {
        if (this.counter > 0) {
            if (this.counter > cycles) {
                this.counter -= cycles;
                cycles = 0;
                this.INTIM = (this.counter >>> this.shift) & 0xFF;
            }
            else {
                cycles -= this.counter;
                this.INTIM = 0;
                this.counter = 0;
                this.bcounter = 0x100;
            }
        }
        if (cycles > 0 && this.bcounter > 0) {
            if (this.bcounter === 0x100) {
                this.TIMINT |= 0x80; // Set timer flag (bit 7)
            }
            if (this.bcounter > cycles) {
                this.bcounter -= cycles;
                this.INTIM = this.bcounter;
            }
            else {
                //cycles -= this.bcounter;
                this.bcounter = 0;
                this.INTIM = 0;
            }
        }
    }

    public ReadByte(address: number): number {
        // determine if the address is mapped to RAM, IO/Timer
        if (address & 0x200) {
            return this.ReadMap[address & 0x1F].call(this, address);
        }
        else {
            return this.mem[address & 0x7F];
        }
    }

    public WriteByte(address: number, value: number): void {
        // determine if the address is mapped to RAM, IO/Timer
        if (address & 0x200) {
            this.WriteMap[address & 0x1F].call(this, address, value);
        }
        else {
            this.mem[address & 0x7F] = value;
        }
    }
}
