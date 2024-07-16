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
            array.push(randomIntFromInterval(5, 730));
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
    // We leave it as an exercise to the viewer of this code to implement this method.
    }


    bubbleSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
    }


    // NOTE: This method will only work the sorting algorithms actually return
    // the sorted arrays; since they currently return the animations only, it is broken.
    // Need to implment a button in render method for this.
    // testSortingAlgorithms() {
    //     for (let i = 0; i < 100; i++) {
    //         const array = [];
    //         const length = randomIntFromInterval(1, 1000);
    //         for (let i = 0; i < length; i++) {
    //             array.push(randomIntFromInterval(-1000, 1000));
    //         }
    //         const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    //         const mergeSortedArray = getMergeSortAnimations(array.slice());
    //         console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    //     }
    // }

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
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        </div>
        );
    }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Funciton for use in testing.
// function arraysAreEqual(arrayOne, arrayTwo) {
//     if (arrayOne.length !== arrayTwo.length) return false;
//     for (let i = 0; i < arrayOne.length; i++) {
//         if (arrayOne[i] !== arrayTwo[i]) {
//             return false;
//         }
//     }
//     return true;
// }