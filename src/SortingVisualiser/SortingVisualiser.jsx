import React from 'react';
import {getMergeSortAnimations, getQuickSortAnimations, getHeapSortAnimations, getBubbleSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualiser.css';

// Speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// Main/ original color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// Color of array bars being compared in the animations.
const SECONDARY_COLOR = 'pink';

// Maximum height of array bars
const MAX_HEIGHT = 650;

// Minimum height of array bars
const MIN_HEIGHT = 5;

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            array: [], // Instantiate main array
        };
    }


    componentDidMount() {
        this.resetArray();
    }


    resetArray() { // Define main array and populate with integer values
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(MIN_HEIGHT, MAX_HEIGHT));
        }
        this.setState({array});
    }


    mergeSort() { // Merge Sort the main array
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2; // First two of every three values have a color change
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                // Color change is dependent on position of the current bars
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR; 
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`; // Update height
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }


    quickSort() { // Quick Sort. Handles sorting of array and array bar animations.
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
                }, (i + 1) * ANIMATION_SPEED_MS); // Revert after it has been set originally
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight, barTwoIdx, newHeightTwo] = animation;
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.height = `${newHeight}px`; // Update height
                    barTwoStyle.height = `${newHeightTwo}px`; // Update height
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }


    heapSort() { // Heap Sort. Handles sorting of array and array bar animations.
        const animations = getHeapSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const animation = animations[i];

            if (animation[0] === 'compare') {
                const barOneIdx = animation[1];
                const barTwoIdx = animation[2];

                setTimeout(() => {
                    // Set the bars being compared to red
                    arrayBars[barOneIdx].style.backgroundColor = SECONDARY_COLOR;
                    arrayBars[barTwoIdx].style.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);

                setTimeout(() => {
                    // Revert bars being compared back to primary color after they have been changed
                    arrayBars[barOneIdx].style.backgroundColor = PRIMARY_COLOR;
                    arrayBars[barTwoIdx].style.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);

            } else if (animation[0] === 'swap') { // Swapping two array bars
                setTimeout(() => {
                    const barOneIdx = animation[1];
                    const newHeightOne = animation[2];
                    const barTwoIdx = animation[3];
                    const newHeightTwo = animation[4];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.height = `${newHeightOne}px`; // Update height
                    barTwoStyle.height = `${newHeightTwo}px`; // Update height
                }, i * ANIMATION_SPEED_MS);


            } else if (animation[0] === 'revert') {
                const barOneIdx = animation[1];
                const barTwoIdx = animation[2];

                setTimeout(() => {
                    // Set the bars being compared to red
                    arrayBars[barOneIdx].style.backgroundColor = SECONDARY_COLOR;
                    arrayBars[barTwoIdx].style.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
    
                setTimeout(() => {
                    // Revert bars being compared back to primary color after they have been compared
                    arrayBars[barOneIdx].style.backgroundColor = PRIMARY_COLOR;
                    arrayBars[barTwoIdx].style.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);
            }
        }
    }


    bubbleSort() { // Bubble Sort. Handles sorting of array and array bar animations.
        const animations = getBubbleSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const animation = animations[i];
            const isComparison = animation.length === 2;
    
            if (isComparison) {
                const [pivotIdx, currentIdx] = animation;
                const barOneIdx = arrayBars[pivotIdx].style;
                const barTwoIdx = arrayBars[currentIdx].style;
    
                setTimeout(() => {
                    // Set bars being compared to red
                    barOneIdx.backgroundColor = SECONDARY_COLOR;
                    barTwoIdx.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
    
                setTimeout(() => {
                    // Revert bars being compared to original colour after they have been changed
                    barOneIdx.backgroundColor = PRIMARY_COLOR;
                    barTwoIdx.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => { // Update the array
                    const [barOneIdx, newHeight, barTwoIdx, newHeightTwo] = animation;
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.height = `${newHeight}px`; // Update height
                    barTwoStyle.height = `${newHeightTwo}px`; // Update height
                }, i * ANIMATION_SPEED_MS);
            }
        }

        }


    render() { // HTML for webpage
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

// Function for finding a random integer within a given interval.
// Inclusive of min and max values.
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}