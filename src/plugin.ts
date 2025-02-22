import {Structure, Plugin} from "erela.js";

export class customFilter extends Plugin {
    public load() {
        Structure.extend(
            "Player",
            (Player) =>
                class extends Player {
                    //Private Filter Boolean
                    private _nightcore: boolean = false;
                    private _vaporwave: boolean = false;
                    private _bassboost: boolean = false;
                    private _pop: boolean = false;
                    private _soft: boolean = false;
                    private _treblebass: boolean = false;
                    private _eightD: boolean = false;
                    private _karaoke: boolean = false;
                    private _vibrato: boolean = false;
                    private _tremolo: boolean = false;

                    //Private Filter Data
                    private readonly _resetData = {
                        op: "filters",
                        guildId: this.guild,
                    };

                    private readonly _nightcoreData = {
                        timescale: {
                            speed: 1.2999999523162842,
                            pitch: 1.2999999523162842,
                            rate: 1,
                        },
                    };

                    private readonly _vaporwaveData = {
                        equalizer: [
                            {band: 1, gain: 0.3},
                            {band: 0, gain: 0.3},
                        ],
                        timescale: {pitch: 0.5},
                        tremolo: {depth: 0.3, frequency: 14},
                    };

                    private readonly _bassboostData = {
                        equalizer: [
                            { band: 0, gain: 0.3 },
                            { band: 1, gain: 0.4 },
                            { band: 2, gain: 0.4 },
                            { band: 3, gain: 0 },
                            { band: 4, gain: -0.3 },
                            { band: 5, gain: 0.15 },
                            { band: 6, gain: -0.25 },
                            { band: 7, gain: 0.03 },
                            { band: 8, gain: 0.05 },
                            { band: 9, gain: 0.05 },
                            { band: 10, gain: 0.05 },
                            { band: 11, gain: 0.0 },
                            { band: 12, gain: 0.05 },
                            { band: 13, gain: 0 },
                        ],
                    };

                    private readonly _popData = {
                        equalizer: [
                            { band: 0, gain: 0.45 },
                            { band: 1, gain: 0.25 },
                            { band: 2, gain: -0.25 },
                            { band: 3, gain: -0.45 },
                            { band: 4, gain: -0.15 },
                            { band: 5, gain: 0.25 },
                            { band: 6, gain: 0.15 },
                            { band: 7, gain: 0.4 },
                            { band: 8, gain: 0.4 },
                            { band: 9, gain: 0.4 },
                            { band: 10, gain: 0 },
                            { band: 11, gain: 0 },
                            { band: 12, gain: 0 },
                            { band: 13, gain: 0 },
                        ],
                    };

                    private readonly _softData = {
                        lowPass: {
                            smoothing: 20.0
                        }
                    };

                    private readonly _treblebassData = {
                        equalizer: [
                            { band: 0, gain: 0.4 },
                            { band: 1, gain: 0.47 },
                            { band: 2, gain: 0.47 },
                            { band: 3, gain: 0 },
                            { band: 4, gain: -0.3 },
                            { band: 5, gain: 0.15 },
                            { band: 6, gain: -0.25 },
                            { band: 7, gain: 0.0 },
                            { band: 8, gain: 0.05 },
                            { band: 9, gain: 0.15 },
                            { band: 10, gain: 0.25 },
                            { band: 11, gain: 0.3 },
                            { band: 12, gain: 0.25 },
                            { band: 13, gain: 0 },
                        ],
                    };

                    private readonly _eightDData = {
                        rotation: {
                            rotationHz: 0.2
                        }
                    }

                    private readonly _karaokeData = {
                        karaoke: {
                            level: 1.0,
                            monoLevel: 1.0,
                            filterBand: 220.0,
                            filterWidth: 100.0
                        },
                    }

                    private readonly _vibratoData = {
                        vibrato: {
                            frequency: 10,
                            depth: 0.9
                        }
                    }

                    private readonly _tremoloData = {
                        tremolo: {
                            frequency: 10,
                            depth: 0.5
                        }
                    }

                    //Setting the filter
                    set nightcore(status:boolean) {
                        this._nightcore = status;
                        if(status){
                            // Disabled due to same filter (timescale)
                            this._vaporwave = false;
                        }
                        this._buildfilter();
                    }

                    set vaporwave(status:boolean) {
                        this._vaporwave = status;
                        if(status){
                            // Disabled due to same filter (equalizer)
                            this._bassboost = false; 
                            this._pop = false;
                            this._treblebass = false;					
                            // Disabled due to same filter (tremolo)
                            this._tremolo = false;
                        }
                        this._buildfilter();
                    }

                    set bassboost(status:boolean) {
                        this._bassboost = status;
                        if(status){
                            // Disabled due to same filter (equalizer)
                            this._vaporwave = false;
                            this._pop = false;
                            this._treblebass = false;
                        }
                        this._buildfilter();
                    }

                    set pop(status:boolean) {
                        this._pop = status;
                        if(status){
                            // Disabled due to same filter (equalizer)
                            this._bassboost = false; 
                            this._vaporwave = false;
                            this._treblebass = false;
                        }
                        this._buildfilter();
                    }

                    set soft(status:boolean) {
                        this._soft = status;
                    }

                    set treblebass(status:boolean) {
                        this._treblebass = status;
                        if(status){
                            // Disabled due to same filter (equalizer)
                            this._bassboost = false; 
                            this._pop = false;
                            this._vaporwave = false;
                        }
                        this._buildfilter();
                    }

                    set eightD(status:boolean) {
                        this._eightD = status;
                        this._buildfilter();
                    }

                    set karaoke(status:boolean) {
                        this._karaoke = status;
                        this._buildfilter();
                    }

                    set vibrato(status:boolean) {
                        this._vibrato = status;
                        this._buildfilter();
                    }
                    
                    set tremolo(status:boolean) {
                        this._tremolo = status;
                        if(status){
                            // Disabled due to same filter (tremolo)
                            this._vaporwave = false;
                        }
                        this._buildfilter();
                    }

                    //Get Filter Status
                    get nightcore() {
                        return this._nightcore;
                    }

                    get vaporwave() {
                        return this._vaporwave;
                    }

                    get bassboost() {
                        return this._bassboost;
                    }

                    get pop(){
                        return this._pop;
                    }

                    get soft(){
                        return this._soft;
                    }

                    get treblebass(){
                        return this._treblebass;
                    }

                    get eightD(){
                        return this._eightD;
                    }

                    get karaoke(){
                        return this._karaoke;
                    }

                    get vibrato(){
                        return this._vibrato;
                    }

                    get tremolo(){
                        return this._tremolo;
                    }

                    //Build Filter
                    private _buildfilter(){
                        var filters = {
                            op: "filters",
                            guildId: this.guild
                        };
                        if(this._nightcore) filters.timescale = this._nightcoreData.timescale;
                        if(this._vaporwave) {
                            filters.equalizer = this._vaporwaveData.equalizer;
                            filters.timescale = this._vaporwaveData.timescale;
                            filters.tremolo = this._vaporwaveData.tremolo;
                        }
                        if(this._bassboost) filters.equalizer = this._bassboostData.equalizer;
                        if(this._soft) filters.lowPass = this._softData.lowPass;
                        if(this._pop) filters.equalizer = this._popData.equalizer;
                        if(this._treblebass) filters.equalizer = this._treblebassData.equalizer;
                        if(this._eightD) filters.rotation = this._eightDData.rotation;
                        if(this._karaoke) filters.karaoke = this._karaokeData.karaoke;
                        if(this._vibrato) filters.vibrato = this._vibratoData.vibrato;
                        if(this._tremolo) filters.tremolo = this._tremoloData.tremolo;
                        this.node.send(filters);
                    }

                    //Reset Everything
                    private _resetnode() {
                        this.node.send(this._resetData);
                    }

                    public reset() {
                        this._resetnode();
                        this._nightcore = false;
                        this._vaporwave = false;
                        this._bassboost = false;
                        this._soft = false;
                        this._pop = false;
                        this._treblebass = false;
                        this._eightD = false;
                        this._karaoke = false;
                        this._vibrato = false;
                        this._tremolo = false;
                    }
                }
        );
    }
}
