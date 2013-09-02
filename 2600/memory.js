function GetCart(gameid) {
    var ct = new Cart(ColorBar());

    switch (gameid) {
        case 1:
            ct = new Cart(DonkeyKong());
            break;
        case 2:
            ct = new F8Cart(Asteroids());
            break;
        case 3:
            ct = new Cart(Superman());
            break;
        case 4:
            ct = new Cart(MissleCommand());
            break;
        case 5:
            break;
        case 6:
            ct = new F8Cart(MsPacMan());
            break;
        case 7:
            ct = new Cart(Adventure());
            break;
        case 8:
            ct = new Cart(SpaceInvaders());
            break;
        case 9:
            ct = new F8Cart(Battlezone());
            break;
        case 10:
            ct = new F8SuperChipCart(Defender2());
            break;
        case 11:
            ct = new Cart2K(Combat());
            break;
        default:
            break;
    }

    return ct;
}

// 0x0000 0x003F 64  TIA
// 0x0040 0x007F 64  0x0000-0x003F TIA mirror
// 0x0080 0x00FF 128 RAM
// 0x0100 0x01FF 256 0x0000-0x00FF TIA-TIA-RAM(stack) mirror
// 0x0200 0x027F 128 0x0000-0x007F TIA-TIA mirror
// 0x0280 0x02FF 128 RIOT
// 0x0300 0x03FF 256 0x0200-0x02FF TIA-TIA-RIOT mirror
// 0x0400 0x07FF 1K  0x0000-0x03FF mirror
// 0x0800 0x0BFF 1K  0x0000-0x03FF mirror
// 0x0C00 0x0FFF 1K  0x0000-0x03FF mirror
// 0x1000 0x1FFF 4K  Cart ROM
// 0x2000 0x3FFF 8K  0x0000-0x1FFF mirror
// 0x4000 0x5FFF 8K  0x0000-0x1FFF mirror
// 0x6000 0x7FFF 8K  0x0000-0x1FFF mirror
// 0x8000 0x9FFF 8K  0x0000-0x1FFF mirror
// 0xA000 0xBFFF 8K  0x0000-0x1FFF mirror
// 0xC000 0xDFFF 8K  0x0000-0x1FFF mirror
// 0xE000 0xFFFF 8K  0x0000-0x1FFF mirror
function Memory(theCart) {
    this.Port1 = new Port();
    this.Port2 = new Port();
    this.joy1 = new Joystick();
    this.joy1.Init();
    this.Port1.Connect(this.joy1);

    //this.Port2.Connect(this.joy1);
    this.tia = new TIA(this.Port1, this.Port2);
    this.tia.Init();
    this.riot = new Riot(this.Port1, this.Port2);
    this.riot.Init();
    this.cart = theCart;
}

Memory.prototype.ReadByte = function (address) {
    if (address & 0x1000) {
        return this.cart.ReadByte(address);
    } else if (address & 0x80) {
        return this.riot.ReadByte(address);
    } else {
        return this.tia.ReadByte(address);
    }
};

Memory.prototype.WriteByte = function (address, value) {
    if (address & 0x1000) {
        this.cart.WriteByte(address, value);
    } else if (address & 0x80) {
        this.riot.WriteByte(address, value);
    } else {
        this.tia.WriteByte(address, value);
    }
};
//# sourceMappingURL=memory.js.map
