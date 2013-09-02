Debugger = function (processor) {
    this.Mode = DebuggerMode.Break;
    this.Processor = processor;
    this.Processor.beforeExecute = this.BeforeExecute;
    this.BreakPoints = new Array();
};

Debugger.prototype.BeforeExecute = function () {
    if (this.Mode === DebuggerMode.Break) {
    }
};

Debugger.prototype.Break = function () {
    this.Mode === DebuggerMode.Break;
};

Debugger.prototype.Run = function () {
    do {
        this.Processor.Step();
    } while(!InBreakMode() && !IsAtBreakPoint());
};

Debugger.prototype.IsAtBreakpoint = function () {
    for (var i = 0; i < this.BreakPoints.length; i++) {
        if (this.Processor.registers.PC === this.BreakPoints[i]) {
            return true;
        }
    }
    return false;
};

Debugger.prototype.Restart = function () {
};

Debugger.prototype.Step = function () {
    this.Processor.Step();
};

Debugger.prototype.StepIn = function () {
};

Debugger.prototype.StepOut = function () {
};
//# sourceMappingURL=debugger.js.map
