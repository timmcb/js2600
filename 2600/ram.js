function Ram() {
    this.mem = new Array(0x80);
}

Ram.prototype.Init = function () {
    for (var i = 0; i < 0x80; i++) {
        this.mem[i] = 0;
    }
};

Ram.prototype.ReadByte = function (address) {
    var index = address & 0x7F;
    var value = this.mem[index];

    /*
    var vx = "";
    if(address === 0x83) {
    vx = value.toString(16);
    var b = 0;
    }
    else if(address === 0x84) {
    vx = value.toString(16);
    var b = 0;
    }
    */
    return value;
};

Ram.prototype.WriteByte = function (address, value) {
    var index = address & 0x7F;
    this.mem[index] = value;
    /*
    var vx = "";
    if(address === 0x83) {
    vx = value.toString(16);
    var b = 0;
    }
    else if(address === 0x84) {
    vx = value.toString(16);
    var b = 0;
    }
    */
};

Ram.prototype.toString = function () {
    var str = "";
    for (var a = 0x80; a < 0x100; a++) {
        var index = a & 0x7F;
        var value = this.mem[index];
        str += a.toString(16) + ": " + value.toString(16) + "\n";
    }
    return str;
};
//# sourceMappingURL=ram.js.map
