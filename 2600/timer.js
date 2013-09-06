var Timer = (function () {
    function Timer() {
        this.INTIM = 0;
        this.INSTAT = 0;
        this.TIM1T = 0;
        this.TIM8T = 0;
        this.TIM64T = 0;
        this.T1024T = 0;
        this.shift = 0;
        this.counter = 0;
        this.bcounter = 0;
    }
    Timer.prototype.Init = function () {
    };

    Timer.prototype.Step = function (cycles) {
        for (var c = 0; c < cycles; c++) {
            this.StepCycle();
        }
    };

    Timer.prototype.StepCycle = function () {
        if (this.counter > 0) {
            this.counter--;
            this.INTIM = (this.counter >>> this.shift) & 0xFF;
            if (this.counter === 0) {
                this.INSTAT = 0xC0;
                this.bcounter = 0x100;
            }
        }
        if (this.bcounter > 0) {
            this.bcounter--;
            this.INTIM = this.bcounter;
        }
    };

    Timer.prototype.ReadByte = function (address) {
        var value = 0, index = address & 0x7F;

        switch (index) {
            case 0x4:
                value = this.INTIM;
                break;
            case 0x5:
                value = this.INSTAT;
                this.INSTAT = this.INSTAT & 0xBF;
                break;
            case 0x14:
                value = this.TIM1T;
                break;
            case 0x15:
                value = this.TIM8T;
                break;
            case 0x16:
                value = this.TIM64T;
                break;
            case 0x17:
                value = this.T1024T;
                break;
            default:
                break;
        }

        return value;
    };

    Timer.prototype.WriteByte = function (address, value) {
        var index = address & 0x7F;
        switch (index) {
            case 0x4:
                this.INTIM = value;
                break;
            case 0x5:
                this.INSTAT = value;
                break;
            case 0x14:
                this.TIM1T = value;
                this.INTIM = value;
                this.INSTAT = 0;
                this.shift = 0;
                this.counter = (value << this.shift) | 0x0;
                break;
            case 0x15:
                this.TIM8T = value;
                this.INTIM = value;
                this.INSTAT = 0;
                this.shift = 3;
                this.counter = value << 3 | 0x7;
                break;
            case 0x16:
                this.TIM64T = value;
                this.INTIM = value;
                this.INSTAT = 0;
                this.shift = 6;
                this.counter = (value << this.shift) | 0x3F;
                break;
            case 0x17:
                this.T1024T = value;
                this.INTIM = value;
                this.INSTAT = 0;
                this.shift = 10;
                this.counter = (value << this.shift) | 0x3FF;
                break;
            default:
                break;
        }
    };
    return Timer;
})();
//# sourceMappingURL=timer.js.map
