"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customFilter = void 0;
const erela_js_1 = require("erela.js");
class customFilter extends erela_js_1.Plugin {
    load() {
        erela_js_1.Structure.extend("Player", (Player) => class extends Player {
            constructor() {
                super(...arguments);
                //Private Filter Boolean
                this._nightcore = false;
                this._vaporwave = false;
                this._bassboost = false;
                this._pop = false;
                this._soft = false;
                this._treblebass = false;
                this._eightD = false;
                this._karaoke = false;
                this._vibrato = false;
                this._tremolo = false;
                //Private Filter Data
                this._resetData = {
                    op: "filters",
                    guildId: this.guild,
                };
                this._nightcoreData = {
                    timescale: {
                        speed: 1.2999999523162842,
                        pitch: 1.2999999523162842,
                        rate: 1,
                    },
                };
                this._vaporwaveData = {
                    equalizer: [
                        { band: 1, gain: 0.3 },
                        { band: 0, gain: 0.3 },
                    ],
                    timescale: { pitch: 0.5 },
                    tremolo: { depth: 0.3, frequency: 14 },
                };
                this._bassboostData = {
                    equalizer: [
                        { band: 0, gain: 0.4 },
                        { band: 1, gain: 0.47 },
                        { band: 2, gain: 0.47 },
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
                this._popData = {
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
                this._softData = {
                    lowPass: {
                        smoothing: 20.0
                    }
                };
                this._treblebassData = {
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
                this._eightDData = {
                    rotation: {
                        rotationHz: 0.2
                    }
                };
                this._karaokeData = {
                    karaoke: {
                        level: 1.0,
                        monoLevel: 1.0,
                        filterBand: 220.0,
                        filterWidth: 100.0
                    },
                };
                this._vibratoData = {
                    vibrato: {
                        frequency: 10,
                        depth: 0.9
                    }
                };
                this._tremoloData = {
                    tremolo: {
                        frequency: 10,
                        depth: 0.5
                    }
                };
            }

            //Setting the filter
            set nightcore(status) {
                this._nightcore = status;
				if(status){
					// Disabled due to same filter (timescale)
					this._vaporwave = false;
				}
				this._buildfilter();
            }
            set vaporwave(status) {
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
            set bassboost(status) {
                this._bassboost = status;
				if(status){
					// Disabled due to same filter (equalizer)
					this._vaporwave = false;
					this._pop = false;
					this._treblebass = false;
				}
				this._buildfilter();
            }
            set pop(status) {
                this._pop = status;
				if(status){
					// Disabled due to same filter (equalizer)
					this._bassboost = false; 
					this._vaporwave = false;
					this._treblebass = false;
				}
				this._buildfilter();
            }
            set soft(status) {
                this._soft = status;
            }
            set treblebass(status) {
                this._treblebass = status;
				if(status){
					// Disabled due to same filter (equalizer)
					this._bassboost = false; 
					this._pop = false;
					this._vaporwave = false;
				}
				this._buildfilter();
            }
            set eightD(status) {
                this._eightD = status;
				this._buildfilter();
            }
            set karaoke(status) {
                this._karaoke = status;
				this._buildfilter();
            }
            set vibrato(status) {
                this._vibrato = status;
				this._buildfilter();
            }
            set tremolo(status) {
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
            get pop() {
                return this._pop;
            }
            get soft() {
                return this._soft;
            }
            get treblebass() {
                return this._treblebass;
            }
            get eightD() {
                return this._eightD;
            }
            get karaoke() {
                return this._karaoke;
            }
            get vibrato() {
                return this._vibrato;
            }
            get tremolo() {
                return this._tremolo;
            }

			//Build Filter
			_buildfilter(){
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
            _resetnode() {
                this.node.send(this._resetData);
            }
            
            reset() {
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
        });
    }
}
exports.customFilter = customFilter;
