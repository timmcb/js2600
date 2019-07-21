export class Log {
    public readonly Lines: string[];
    public Line: string;
    public Text: string;
    
    constructor() {
        this.Lines = new Array();
        this.Line = null;
        this.Text = null;
    }

    public Write(text: string): void {
        if (!text) {
            text = "";
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

    public WriteLine(text: string): void {
        if (!text) {
            text = "";
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

    public toString(): string {
        if (!this.Text) {
            this.Text = "";

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
}