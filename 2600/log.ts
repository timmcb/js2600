function Log() {
    this.Lines = new Array();
    this.Line = null;
    this.Text = null;
}

Log.prototype.Write(text) {
        if (!text) {
            text = new String();
        }
        var line = this.Line
        if (line) {
            line += text;
        }
        else {
            line = text;
        }
        this.Text = null;
    }

Log.prototype.WriteLine(text) {
        if (!text) {
            text = new String();
        }
        var line = this.Line
        if (line) {
            line += text;
        }
        else {
            line = text;
        }
        this.Lines.push(line);
        this.Line = null;
        this.Text = null;
    }

Log.prototype.toString() {
        if (!this.Text) {
            this.Text = new String();

            if (this.Line) {
                this.Lines.push(this.Line);
                this.Line = null;
            }

            for (var i = 0; i < this.Lines.length; i++) {
                this.Text += this.Lines[i];
                this.Text += "\n";
            }
        }
        return this.Text;
    }
