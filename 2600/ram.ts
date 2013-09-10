function Ram() {
    this.mem = new Array(0x80);
}

Ram.prototype.Init = function() {
    for (var i = 0; i < 0x80; i++) {
        this.mem[i] = 0;
    }
}

Ram.prototype.ReadByte = function(address) {
    var index = address & 0x7F,
        value = this.mem[index];

    return value;
}

Ram.prototype.WriteByte = function(address, value) {
    var index = address & 0x7F;
    this.mem[index] = value;
}

Ram.prototype.toString = function() {
    var str = "";
    for(var a = 0x80; a < 0x100; a++ ) {
        var index = a & 0x7F;
        var value = this.mem[index];
        str += a.toString(16) + ": " + value.toString(16) + "\n";
    }
    return str;
}
 
