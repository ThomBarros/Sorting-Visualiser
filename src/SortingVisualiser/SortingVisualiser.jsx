import React from 'react';
import {getMergeSortAnimations, getQuickSortAnimations, getHeapSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualiser.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
        };
    }


    componentDidMount() {
        this.resetArray();
    }


    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 650));
        }
        this.setState({array});
    }


    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }


    quickSort() {
        const animations = getQuickSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const animation = animations[i];
            const isComparison = animation.length === 2;
    
            if (isComparison) {
                const [pivotIdx, currentIdx] = animation;
                const pivotStyle = arrayBars[pivotIdx].style;
                const currentStyle = arrayBars[currentIdx].style;
    
                setTimeout(() => {
                    // Set pivot and current bar to red
                    pivotStyle.backgroundColor = SECONDARY_COLOR;
                    currentStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
    
                setTimeout(() => {
                    // Revert pivot and current bar back to primary color
                    pivotStyle.backgroundColor = PRIMARY_COLOR;
                    currentStyle.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight, barTwoIdx, newHeightTwo] = animation;
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                    barTwoStyle.height = `${newHeightTwo}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }


    heapSort() {
        const animations = getHeapSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const animation = animations[i];
            if (animation[0] === 'compare' || animation[0] === 'revert') {
                const barOneIdx = animation[1];
                const barTwoIdx = animation[2];
                const color = animation[0] === 'compare' ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    arrayBars[barOneIdx].style.backgroundColor = color;
                    arrayBars[barTwoIdx].style.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else if (animation[0] === 'swap') {
                setTimeout(() => {
                    const barOneIdx = animation[1];
                    const newHeightOne = animation[2];
                    const barTwoIdx = animation[3];
                    const newHeightTwo = animation[4];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.height = `${newHeightOne}px`;
                    barTwoStyle.height = `${newHeightTwo}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }


    bubbleSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
    }


    render() {
        const {array} = this.state;
        return (

            <div className="array-container">
            {array.map((value, idx) => (
                <div
                className="array-bar"
                key={idx}
                style={{
                    backgroundColor: PRIMARY_COLOR,
                    height: `${value}px`,
                }}></div>
                ))}
            <div className='button-container'>
                <button className='userButton' onClick={() => this.resetArray()}>Generate New Array</button>
                <button className='userButton' onClick={() => this.mergeSort()}>Merge Sort</button>
                <button className='userButton' onClick={() => this.quickSort()}>Quick Sort</button>
                <button className='userButton' onClick={() => this.heapSort()}>Heap Sort</button>
                <button className='userButton' onClick={() => this.bubbleSort()}>Bubble Sort</button>
            </div>
            </div>
        );
    }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}