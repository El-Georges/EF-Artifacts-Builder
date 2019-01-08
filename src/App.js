import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as html2canvas from 'html2canvas';
import Set from './component/Set';
import {ScreenshotModal} from "./Modals/ScreenshotModal";
import {NavBar} from "./component/NavBar";
import {StatsSummaryAndArtsBox} from "./component/StatsSummaryAndArtsBox";
import {LoadingScreen} from "./component/LoadingScreen";


export default class App extends Component {
    constructor() {
        super();
        this.state = {
            selectedList: [],
            data: [],
            setTypes: [],
            totalNumberOfArts: [],
            gameSpeedBonuses: [],
            bonusMedals: [],
            bonusTypes: ['All', 'Game Speed', 'Increase Additional Medals Obtained'],
            set: null,
            artifact: null,
            showScreenModal: false,
            canvas: null,
            canvasMobile: null,
            searchBySetName: '',
            searchBySetType: 'All',
            filterByBonusType: 'All',
            loading: false,
            visitorCount: null,
            offline: '',
        };
    }

    componentWillMount() {
        // let online = false;
        this.setState({loading: true});
        // fetch('http://127.0.0.1:8000/visits/1/')
        fetch('https://efartifactsbuilder.alwaysdata.net/visits/1/')
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({visitorCount: data.visits});
                // fetch('http://127.0.0.1:8000/sets/')
                fetch('https://efartifactsbuilder.alwaysdata.net/sets/')
                    .then(response => {
                        return response.json()
                    })
                    .then(data => {
                        // Sorting 2 dimensions array to sort arts by their names
                        localStorage.setItem('data', '');
                        localStorage.setItem('setTypes', '');
                        let sortedData = [];
                        let pushInArray = [];
                        let setTypesArray = ['All'];
                        let i = 0;
                        while (i < data.length) {
                            let setType = data[i].setType.replace(/\d+ /, '');
                            if (!setTypesArray.includes(setType)) {
                                setTypesArray.push(setType);
                            }
                            // If next index exists
                            if (data[i + 1]) {
                                // Push this index into array pushInArray
                                pushInArray.push(data[i]);
                                // If set name of the actual set is not the same than next set name, excluding (*p)
                                if (data[i].set_name.match(/(.*)[^ (\dp)]/g)[0] !== data[i + 1].set_name.match(/(.*)[^ (\dp)]/g)[0]) {
                                    // Pushing pushInArray into sortedData
                                    sortedData.push(pushInArray);
                                    // Reseting pushInArray
                                    pushInArray = [];
                                }
                            } else {
                                pushInArray.push(data[i]);
                                sortedData.push(pushInArray);
                            }
                            i++;
                        }
                        // Sorting every index (array of sets) by arts number
                        sortedData.map(x => {
                            return x.sort((a, b) => (a.set_arts_number > b.set_arts_number) ? 1 : ((b.set_arts_number > a.set_arts_number) ? -1 : 0))
                        });
                        localStorage.setItem('data', JSON.stringify(sortedData));
                        localStorage.setItem('setTypes', JSON.stringify(setTypesArray));
                        this.setState({
                            data: JSON.parse(localStorage.getItem('data')),
                            setTypes: JSON.parse(localStorage.getItem('setTypes')),
                            loading: false,
                        });
                    })
                    .catch(error => {
                        this.checkOfflineAndLocalStorage('There has been a problem while loading data. Please try again later.');
                    })
            })
            .catch(error => {
                this.checkOfflineAndLocalStorage('You need to connect at least once to run this app.');
            })
    };

    checkOfflineAndLocalStorage = (message) => {
        if (localStorage.getItem('data') && localStorage.getItem('setTypes')) {
            return this.setState({
                data: JSON.parse(localStorage.getItem('data')),
                setTypes: JSON.parse(localStorage.getItem('setTypes')),
                loading: false,
                offline: 'You are currently offline, data may be outdated.',
            });
        } else {
            return this.setState({
                offline: message,
            });
        }
    };

    handleList = (event, status = null) => {
        const regex = / \(\dp\)/;
        const eventSetName = event.set_name.replace(regex, '');
        const isInList = this.state.selectedList.some(set => set.set_name.replace(regex, '') === eventSetName);

        if (isInList || (isInList && status === 'remove')) {
            let setNamesArray = []; // create an array that will contains cleaned set names for easier match
            this.state.selectedList.map(set => setNamesArray.push(set.set_name.replace(regex, '')));
            let index = setNamesArray.indexOf(eventSetName);

            // Use index got to clean arrays
            let array = this.state.selectedList;
            array.splice(index, 1);
            let array2 = this.state.totalNumberOfArts;
            array2.splice(index, 1);
            let array3 = this.state.gameSpeedBonuses;
            array3.splice(index, 1);
            let array4 = this.state.bonusMedals;
            array4.splice(index, 1);

            this.setState({
                selectedList: array,
                totalNumberOfArts: array2,
                gameSpeedBonuses: array3,
                bonusMedals: array4
            });
        }
        if (!status) {
            this.setState(prevState => ({
                selectedList: [...prevState.selectedList, event],
                totalNumberOfArts: [...prevState.totalNumberOfArts, event.set_arts_number],
                gameSpeedBonuses: [...prevState.gameSpeedBonuses, this.findBonus(event, /Game Speed/)],
                bonusMedals: [...prevState.bonusMedals, this.findBonus(event, /Increase Additional Medals Obtained/)]
            }));
        }
    };

    sum = (input) => {
        if (toString.call(input) !== "[object Array]")
            return false;
        let total = 0;
        for (let i = 0; i < input.length; i++) {
            if (isNaN(input[i])) {
                continue;
            }
            total += Number(input[i]);
        }
        return total;
    };

    findBonus = (event, regex) => {
        for (let key in event) {
            if (/^bonus/.test(key)) {
                if (event[key].match(regex)) {
                    let valueKey = key.replace('bonus', 'value');
                    return event[valueKey];
                }
            }
        }
    };

    getSelection = (set) => {
        let findGsBonus = this.findBonus(set, /Game Speed/);
        let findMedalBonus = this.findBonus(set, /Increase Additional Medals Obtained/);
        return (
            <tr key={set.set_name + set.setLevel} className="text-center">
                <th style={{width: '60%'}}>{set.setLevel} {set.set_tech_name}</th>
                <td style={{width: '15%'}}>{findGsBonus ? findGsBonus : 0}</td>
                <td style={{width: '35%'}}>{findMedalBonus ? findMedalBonus : 0}</td>
            </tr>
        )
    };

    triggerScreenshot = () => {
        html2canvas(document.querySelector("#capture"))
            .then(canvas => {
                this.setState({showScreenModal: true, canvas: canvas.toDataURL()});
            })
    };

    getSets = (sets) => {
        let globalArray = [];
        let t0Array = [];
        let t1Array = [];
        let t2Array = [];
        let t3Array = [];
        sets.map(set => {
            switch (set.setLevel) {
                case 'T0':
                    return t0Array.push(set);
                case 'T1':
                    return t1Array.push(set);
                case 'T2':
                    return t2Array.push(set);
                case 'T3':
                    return t3Array.push(set);
                default:
                    return null
            }
        });
        if (t0Array.length > 0) {
            globalArray.push(t0Array);
        }
        if (t1Array.length > 0) {
            globalArray.push(t1Array);
        }
        if (t2Array.length > 0) {
            globalArray.push(t2Array);
        }
        if (t3Array.length > 0) {
            globalArray.push(t3Array);
        }

        // Last index is selected to be able to check if the set has any required bonus
        // to apply filter we need to get the set with maximum bonus
        let set = sets[sets.length-1];

        let showIfMatch =
            // Match set tech name and set types, if All, every set is shown
            set.set_tech_name.toLowerCase().match(this.state.searchBySetName.toLowerCase()) &&
            (set.setType.toLowerCase().match(this.state.searchBySetType.toLowerCase()) ||
                this.state.searchBySetType === 'All') &&
            (this.findBonus(set, this.state.filterByBonusType) ||
                this.state.filterByBonusType === 'All');
        return (
            <div
                key={set.set_name}
                className={`col-md-3 col-6 set-border text-center hovered ${showIfMatch ? null : 'd-none'}`}>
                <div className="row justify-content-around">
                    <div className="col-2 white-text child"/>
                    <div className="col-9">
                        <div className="row justify-content-around">
                            <label className="col-6 text-center text-color personnal-checkbox">
                                X
                                <input
                                    onClick={() => this.handleList(set, 'remove')}
                                    type="radio"
                                    name={set.set_name.replace(/ \(\dp\)/, '')}
                                    value={set.set_name}
                                    defaultChecked={true}
                                >
                                </input>
                                <span className="checkmark"/>
                            </label>
                        </div>
                    </div>
                </div>
                {globalArray.map((sets, index) => {
                        // Seems on sets with 1 pair of bonus can't be fetched by sets[index] so
                        // Setting if/else to get sets[0] in this case
                        return (
                            <div
                                key={sets[index] ? sets[index].set_name : sets[0].set_name + index}
                                className="row justify-content-around">
                                <div className="col-2 white-text child">
                                    {sets[index] ? sets[index].setLevel : sets[0].setLevel}
                                </div>
                                <div className="col-9">
                                    <div className="row justify-content-around">
                                        {sets.map(this.artsNumber)}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                )}
                <div>
                    <Set
                        set={set}
                    />
                </div>
            </div>
        )
    };

    getSetsTypes = (setType) => {
        return (
            <label
                key={setType}
                    className="col-12 mb-1 set-filter-button radio-btn personnal-checkbox">
                <input
                    type="radio"
                    name="setType"
                    value={setType}
                    defaultChecked={setType === this.state.searchBySetType}
                    onClick={(e) => this.setState({searchBySetType: e.target.value})}
                />
                {setType}
                <span className="checkmark"/>
            </label>
        )
    };

    getBonusTypes = (bonusType) => {
        return (
            <label
                key={bonusType}
                className="col-12 mb-1 set-filter-button radio-btn personnal-checkbox">
                <input
                    type="radio"
                    name="bonusType"
                    value={bonusType}
                    defaultChecked={bonusType === this.state.filterByBonusType}
                    onClick={(e) => this.setState({filterByBonusType: e.target.value})}
                />
                {bonusType}
                <span className="checkmark"/>
            </label>
        )
    };

    artsNumber = (set) => {
        // let setName = set.set_name.replace(/ \(\dp\)/g, '');
        return (
            <div key={set.set_tech_name}>
                <label className="text-center text-color personnal-checkbox">
                    {set.set_arts_number}
                    <input
                        onClick={this.state.selectedList.includes(set) ? null : () => this.handleList(set)}
                        type="radio"
                        name={set.set_name.replace(/ \(\dp\)/, '')}
                        value={set.set_name}
                    >
                    </input>
                    <span className="checkmark"/>
                </label>
            </div>
        )
    };

    closeScreenModal = () => {
        this.setState({showScreenModal: false, canvas: null})
    };

    render() {
        return (
            <div className="container-fluid text-center">
                {this.state.loading ? (
                    <LoadingScreen visitorCount={this.state.visitorCount} offline={this.state.offline}/>
                ) : null}
                {this.state.showScreenModal ? (
                    <ScreenshotModal
                        handler={this.closeScreenModal}
                        canvas={this.state.canvas}
                        canvasMobile={this.state.canvasMobile}
                    />
                ) : null}
                <NavBar
                    triggerScreenshot={this.triggerScreenshot}
                    searchBySetName={(e) => this.setState({searchBySetName: e.target.value})}
                    setFiltering={this.state.searchBySetType !== 'All' || this.state.filterByBonusType !== 'All'}
                    setsTypes={this.state.setTypes.map(this.getSetsTypes)}
                    bonusTypes={this.state.bonusTypes.map(this.getBonusTypes)}
                    resetFilters={() => this.setState({searchBySetType: 'All', filterByBonusType: 'All'})}
                />
                <StatsSummaryAndArtsBox
                    totalNumberOfArts={this.sum(this.state.totalNumberOfArts)}
                    gameSpeedBonuses={this.sum(this.state.gameSpeedBonuses)}
                    bonusMedals={this.sum(this.state.bonusMedals)}
                    selectedList={this.state.selectedList.map(this.getSelection)}
                    setsData={this.state.data.map(this.getSets)}
                    offline={this.state.offline}
                />
            </div>
        );
    }
}