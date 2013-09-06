var Cart = (function () {
    function Cart(data) {
        this.Data = data;
    }
    Cart.prototype.ReadByte = function (address) {
        var index = address & 0xFFF;
        var d = this.Data;
        if (index < d.length) {
            return d[index];
        }
        return 0;
    };

    Cart.prototype.WriteByte = function (address, value) {
        // Mostly carts are read-only
        // except for bank switches
    };
    return Cart;
})();

var Cart2K = (function () {
    function Cart2K(data) {
        this.Data = data;
    }
    Cart2K.prototype.ReadByte = function (address) {
        var index = address & 0x7FF, d = this.Data;
        if (index < d.length) {
            return d[index];
        }
        return 0;
    };

    Cart2K.prototype.WriteByte = function (address, value) {
        // Mostly carts are read-only
        // except for bank switches
    };
    return Cart2K;
})();

var F8SuperChipCart = (function () {
    function F8SuperChipCart(data) {
        this.Data = data;
        this.Offset = 0;
        this.Bank = 0x0000;
    }
    F8SuperChipCart.prototype.ReadByte = function (address) {
        var b = 0, index = address & 0xFFF;

        if (index === 0xFF8) {
            this.Bank = 0x0000;
        } else if (index === 0xFF9) {
            this.Bank = 0x1000;
        } else if (index === 0xFFC || index === 0xFFD) {
            // start vector
            b = this.Data[this.Bank + index + this.Offset];
        } else if (index === 0xFFE || index === 0xFFF) {
            // break vector
            b = this.Data[this.Bank + index + this.Offset];
        } else {
            if (index < 0x100) {
                index = index & 0x7F;
                b = this.Data[index];
            } else if ((this.Bank + index + this.Offset) < this.Data.length) {
                b = this.Data[this.Bank + index + this.Offset];
            }
        }
        return b;
    };

    F8SuperChipCart.prototype.WriteByte = function (address, value) {
        var index = address & 0xFFF;

        if (index === 0xFF8) {
            this.Bank = 0x0000;
        } else if (index === 0xFF9) {
            this.Bank = 0x1000;
        } else if (index < 0x100) {
            index = index & 0x7F;
            this.Data[index] = value;
        }
    };
    return F8SuperChipCart;
})();

var F8Cart = (function () {
    function F8Cart(data) {
        this.Data = data;
        this.Offset = 0;
        this.Bank = 0x0000;
    }
    F8Cart.prototype.ReadByte = function (address) {
        var b = 0, index = address & 0xFFF;

        if (index === 0xFF8) {
            this.Bank = 0x0000;
        } else if (index === 0xFF9) {
            this.Bank = 0x1000;
        } else if (index === 0xFFC || index === 0xFFD) {
            // start vector
            b = this.Data[this.Bank + index + this.Offset];
        } else if (index === 0xFFE || index === 0xFFF) {
            // break vector
            b = this.Data[this.Bank + index + this.Offset];
        } else {
            if ((this.Bank + index + this.Offset) < this.Data.length) {
                b = this.Data[this.Bank + index + this.Offset];
            }
        }
        return b;
    };

    F8Cart.prototype.WriteByte = function (address, value) {
        var index = address & 0xFFF;

        if (index === 0xFF8) {
            this.Bank = 0x0000;
        } else if (index === 0xFF9) {
            this.Bank = 0x1000;
        }
    };
    return F8Cart;
})();

var AutoCart = (function () {
    function AutoCart(data) {
        this.Data = data;
        this.n1k = ((data.length + 0x300) / 0x400) & 0xFF;
        this.n4k = ((data.length + 0xC00) / 0x1000) & 0xFF;
        this.Offset = 0;
        this.Bank = 0;
    }
    AutoCart.prototype.ReadByte = function (address) {
        var b = 0, index = address & 0xFFF;

        if (index === 0xFF8) {
            this.Bank = 0x0000;
        } else if (index === 0xFF9) {
            this.Bank = 0x1000;
        } else if (index === 0xFFC || index === 0xFFD) {
            // start vector
            b = this.Data[this.Bank + index + this.Offset];
        } else if (index === 0xFFE || index === 0xFFF) {
            // break vector
            b = this.Data[this.Bank + index + this.Offset];
        } else {
            if (index < 0x100) {
                index = index & 0x7F;
                b = this.Data[index];
            } else if ((this.Bank + index + this.Offset) < this.Data.length) {
                b = this.Data[this.Bank + index + this.Offset];
            }
        }
        return b;
    };
    return AutoCart;
})();
//# sourceMappingURL=cart.js.map
