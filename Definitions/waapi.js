// Type definitions for the Web Audio API
// Project: http://www.w3.org/TR/2012/WD-webaudio-20121213/
// Definitions by: Baruch Berger (https://github.com/bbss), Kon (http://phyzkit.net/)
// Definitions: https://github.com/borisyankov/DefinitelyTyped
var PanningModelType;
(function (PanningModelType) {
    /**
    * A simple and efficient spatialization algorithm using equal-power panning.
    */
    PanningModelType[PanningModelType["equalpower"] = 0] = "equalpower";

    /**
    * A higher quality spatialization algorithm using a convolution with measured impulse responses from human subjects. This panning method renders stereo output.
    */
    PanningModelType[PanningModelType["HRTF"] = 1] = "HRTF";

    /**
    * An algorithm which spatializes multi-channel audio using sound field algorithms.
    */
    PanningModelType[PanningModelType["soundfield"] = 2] = "soundfield";
})(PanningModelType || (PanningModelType = {}));

var DistanceModelType;
(function (DistanceModelType) {
    /**
    * A linear distance model which calculates distanceGain according to:
    *     1 - rolloffFactor * (distance - refDistance) / (maxDistance - refDistance)
    */
    DistanceModelType[DistanceModelType["linear"] = 0] = "linear";

    /**
    * An inverse distance model which calculates distanceGain according to:
    *     refDistance / (refDistance + rolloffFactor * (distance - refDistance))
    */
    DistanceModelType[DistanceModelType["inverse"] = 1] = "inverse";

    /**
    * An exponential distance model which calculates distanceGain according to:
    *     pow(distance / refDistance, -rolloffFactor)
    */
    DistanceModelType[DistanceModelType["exponential"] = 2] = "exponential";
})(DistanceModelType || (DistanceModelType = {}));

var BiquadFilterType;
(function (BiquadFilterType) {
    /**
    * A lowpass filter allows frequencies below the cutoff frequency to pass through and attenuates frequencies above the cutoff. It implements a standard second-order resonant lowpass filter with 12dB/octave rolloff.
    *
    * ## frequency
    * The cutoff frequency
    * ## Q
    * Controls how peaked the response will be at the cutoff frequency. A large value makes the response more peaked. Please note that for this filter type, this value is not a traditional Q, but is a resonance value in decibels.
    * ## gain
    * Not used in this filter type
    */
    BiquadFilterType[BiquadFilterType["lowpass"] = 0] = "lowpass";

    /**
    * A highpass filter is the opposite of a lowpass filter. Frequencies above the cutoff frequency are passed through, but frequencies below the cutoff are attenuated. It implements a standard second-order resonant highpass filter with 12dB/octave rolloff.
    *
    * ## frequency
    * The cutoff frequency below which the frequencies are attenuated
    * ## Q
    * Controls how peaked the response will be at the cutoff frequency. A large value makes the response more peaked. Please note that for this filter type, this value is not a traditional Q, but is a resonance value in decibels.
    * ## gain
    * Not used in this filter type
    */
    BiquadFilterType[BiquadFilterType["highpass"] = 1] = "highpass";

    /**
    * A bandpass filter allows a range of frequencies to pass through and attenuates the frequencies below and above this frequency range. It implements a second-order bandpass filter.
    *
    * ## frequency
    * The center of the frequency band
    * ## Q
    * Controls the width of the band. The width becomes narrower as the Q value increases.
    * ## gain
    * Not used in this filter type
    */
    BiquadFilterType[BiquadFilterType["bandpass"] = 2] = "bandpass";

    /**
    * The lowshelf filter allows all frequencies through, but adds a boost (or attenuation) to the lower frequencies. It implements a second-order lowshelf filter.
    *
    * ## frequency
    * The upper limit of the frequences where the boost (or attenuation) is applied.
    * ## Q
    * Not used in this filter type.
    * ## gain
    * The boost, in dB, to be applied. If the value is negative, the frequencies are attenuated.
    */
    BiquadFilterType[BiquadFilterType["lowshelf"] = 3] = "lowshelf";

    /**
    * The highshelf filter is the opposite of the lowshelf filter and allows all frequencies through, but adds a boost to the higher frequencies. It implements a second-order highshelf filter
    *
    * ## frequency
    * The lower limit of the frequences where the boost (or attenuation) is applied.
    * ## Q
    * Not used in this filter type.
    * ## gain
    * The boost, in dB, to be applied. If the value is negative, the frequencies are attenuated.
    */
    BiquadFilterType[BiquadFilterType["highshelf"] = 4] = "highshelf";

    /**
    * The peaking filter allows all frequencies through, but adds a boost (or attenuation) to a range of frequencies.
    *
    * ## frequency
    * The center frequency of where the boost is applied.
    * ## Q
    * Controls the width of the band of frequencies that are boosted. A large value implies a narrow width.
    * ## gain
    * The boost, in dB, to be applied. If the value is negative, the frequencies are attenuated.
    */
    BiquadFilterType[BiquadFilterType["peaking"] = 5] = "peaking";

    /**
    * The notch filter (also known as a band-stop or band-rejection filter) is the opposite of a bandpass filter. It allows all frequencies through, except for a set of frequencies.
    *
    * ## frequency
    * The center frequency of where the notch is applied.
    * ## Q
    * Controls the width of the band of frequencies that are attenuated. A large value implies a narrow width.
    * ## gain
    * Not used in this filter type.
    */
    BiquadFilterType[BiquadFilterType["notch"] = 6] = "notch";

    /**
    * An allpass filter allows all frequencies through, but changes the phase relationship between the various frequencies. It implements a second-order allpass filter
    *
    * ## frequency
    * The frequency where the center of the phase transition occurs. Viewed another way, this is the frequency with maximal group delay.
    * ## Q
    * Controls how sharp the phase transition is at the center frequency. A larger value implies a sharper transition and a larger group delay.
    * ## gain
    * Not used in this filter type.
    */
    BiquadFilterType[BiquadFilterType["allpass"] = 7] = "allpass";
})(BiquadFilterType || (BiquadFilterType = {}));

var OscillatorType;
(function (OscillatorType) {
    OscillatorType[OscillatorType["sine"] = 0] = "sine";
    OscillatorType[OscillatorType["square"] = 1] = "square";
    OscillatorType[OscillatorType["sawtooth"] = 2] = "sawtooth";
    OscillatorType[OscillatorType["triangle"] = 3] = "triangle";
    OscillatorType[OscillatorType["custom"] = 4] = "custom";
})(OscillatorType || (OscillatorType = {}));
//# sourceMappingURL=waapi.js.map
