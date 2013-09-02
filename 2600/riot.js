function Riot(port1, port2) {
    this.Port1 = port1;
    this.Port2 = port2;
    this.mem = new Array(0x80);
    this.switchBank = new Switch();

    this.SWCHA;
    this.SWACNT;
    this.SWCHB;
    this.SWBCNT;
    this.DINT1NE;
    this.DINT1PE;
    this.EINT1NE;
    this.EINT1PE;
    this.INTIM = 0;
    this.INTFLG = 0;
    this.TIM1T = 0;
    this.TIM8T = 0;
    this.TIM64T = 0;
    this.T1024T = 0;
    this.shift = 0;
    this.counter = 0;
    this.bcounter = 0;

    this.ReadMap = [
        this.ReadSWCHA,
        this.ReadSWACNT,
        this.ReadSWCHB,
        this.ReadSWBCNT,
        this.ReadINTIM,
        this.ReadINTFLG,
        this.ReadINTIM,
        this.ReadINTFLG,
        this.ReadSWCHA,
        this.ReadSWACNT,
        this.ReadSWCHB,
        this.ReadSWBCNT,
        this.ReadINTIM,
        this.ReadINTFLG,
        this.ReadINTIM,
        this.ReadINTFLG,
        this.ReadSWCHA,
        this.ReadSWACNT,
        this.ReadSWCHB,
        this.ReadSWBCNT,
        this.ReadINTIM,
        this.ReadINTFLG,
        this.ReadINTIM,
        this.ReadINTFLG,
        this.ReadSWCHA,
        this.ReadSWACNT,
        this.ReadSWCHB,
        this.ReadSWBCNT,
        this.ReadINTIM,
        this.ReadINTFLG,
        this.ReadINTIM,
        this.ReadINTFLG
    ];

    this.WriteMap = [
        this.WriteSWCHA,
        this.WriteSWACNT,
        this.WriteSWCHB,
        this.WriteSWBCNT,
        this.WriteDINT1NE,
        this.WriteDINT1PE,
        this.WriteEINT1NE,
        this.WriteEINT1PE,
        this.WriteSWCHA,
        this.WriteSWACNT,
        this.WriteSWCHB,
        this.WriteSWBCNT,
        this.WriteDINT1NE,
        this.WriteDINT1PE,
        this.WriteEINT1NE,
        this.WriteEINT1PE,
        this.WriteSWCHA,
        this.WriteSWACNT,
        this.WriteSWCHB,
        this.WriteSWBCNT,
        this.WriteTIM1T,
        this.WriteTIM8T,
        this.WriteTIM64T,
        this.WriteTIM1024T,
        this.WriteSWCHA,
        this.WriteSWACNT,
        this.WriteSWCHB,
        this.WriteSWBCNT,
        this.WriteTIM1T,
        this.WriteTIM8T,
        this.WriteTIM64T,
        this.WriteTIM1024T
    ];
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
Riot.prototype.ReadSWCHA = function (address) {
    var value;
    var pins1 = this.Port1.ReadPins() & 0x00F;
    var pins2 = this.Port2.ReadPins() & 0x00F;
    var portin = (pins1 << 4) | pins2;
    var ddra = this.SWACNT;
    var output = this.SWCHA & ddra;
    var input = (portin & (~ddra)) & 0xFF;
    value = output | input;
    return value;
};

Riot.prototype.ReadSWACNT = function (address) {
    return this.SWACNT;
};

Riot.prototype.ReadSWCHB = function (address) {
    var value;
    var ddrb = this.SWBCNT;
    var output = this.SWCHB & ddrb;
    var input = (this.switchBank.ReadByte(address) & (~ddrb)) & 0xFF;
    value = output | input;
    return value;
};

Riot.prototype.ReadSWBCNT = function (address) {
    return this.SWBCNT;
};

Riot.prototype.ReadINTIM = function (address) {
    return this.INTIM;
};

Riot.prototype.ReadINTFLG = function (address) {
    return this.INTFLG;
    this.INTFLG = this.INTFLG & 0xBF;
};

Riot.prototype.WriteSWCHA = function (address, value) {
    this.SWCHA = value & this.SWACNT;
};

Riot.prototype.WriteSWACNT = function (address, value) {
    this.SWACNT = value;
};

Riot.prototype.WriteSWCHB = function (address, value) {
    this.SWCHB = value & this.SWBCNT;
};

Riot.prototype.WriteSWBCNT = function (address, value) {
    this.SWBCNT = value;
};

Riot.prototype.WriteDINT1NE = function (address, value) {
    this.DINT1NE = value;
};

Riot.prototype.WriteDINT1PE = function (address, value) {
    this.DINT1PE = value;
};

Riot.prototype.WriteEINT1NE = function (address, value) {
    this.EINT1NE = value;
};

Riot.prototype.WriteEINT1PE = function (address, value) {
    this.EINT1PE = value;
};

Riot.prototype.WriteTIM1T = function (address, value) {
    this.TIM1T = value;
    this.INTIM = value;
    this.INTFLG = 0;
    this.shift = 0;
    this.counter = (value << this.shift) | 0x0;
};

Riot.prototype.WriteTIM8T = function (address, value) {
    this.TIM8T = value;
    this.INTIM = value;
    this.INTFLG = 0;
    this.shift = 3;
    this.counter = value << 3 | 0x7;
};

Riot.prototype.WriteTIM64T = function (address, value) {
    this.TIM64T = value;
    this.INTIM = value;
    this.INTFLG = 0;
    this.shift = 6;
    this.counter = (value << this.shift) | 0x3F;
};

Riot.prototype.WriteTIM1024T = function (address, value) {
    this.T1024T = value;
    this.INTIM = value;
    this.INTFLG = 0;
    this.shift = 10;
    this.counter = (value << this.shift) | 0x3FF;
};

Riot.prototype.Init = function () {
    var index = 0x7F;
    while (index--) {
        this.mem[index] = 0;
    }
    this.switchBank.Init();
};

Riot.prototype.Step = function (cycles) {
    if (this.counter > 0) {
        if (this.counter > cycles) {
            this.counter -= cycles;
            cycles = 0;
            this.INTIM = (this.counter >>> this.shift) & 0xFF;
        } else {
            cycles -= this.counter;
            this.INTIM = 0;
            this.counter = 0;
            this.INTFLG = 0xC0;
            this.bcounter = 0x100;
        }
    }
    if (this.bcounter > 0) {
        if (this.bounter > cycles) {
            this.bcounter -= cycles;
            this.INTIM = this.bcounter;
        } else {
            //cycles -= this.bcounter;
            this.bcounter = 0;
            this.INTIM = 0;
        }
    }
};

Riot.prototype.ReadByte = function (address) {
    if (address & 0x200) {
        return this.ReadMap[address & 0x1F].call(this, address);
    } else {
        return this.mem[address & 0x7F];
    }
};

Riot.prototype.WriteByte = function (address, value) {
    if (address & 0x200) {
        this.WriteMap[address & 0x1F].call(this, address, value);
    } else {
        this.mem[address & 0x7F] = value;
    }
};
//# sourceMappingURL=riot.js.map
