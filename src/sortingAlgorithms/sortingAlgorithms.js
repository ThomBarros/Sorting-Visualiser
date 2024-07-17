//-------------------Merge Sort-------------------------


// Returns merge sort animations for the array bars
export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

// Assists with the merge sort
function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;

    // Get the int approx. index of middle element in array
    const middleIdx = Math.floor((startIdx + endIdx) / 2); 
    
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
    ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        // Color comparison
        animations.push([i, j]);
        // Revert back to original colour
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // Overwrite value at index k in original array with value at 
            // index i of auxiliary array.
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            // We overwrite the value at index k in the original array with the
            // value at index j in the auxiliary array.
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        // Color comparison
        animations.push([i, i]);
        // Revert back to original colour
        animations.push([i, i]);
        // Overwrite value at index k in original matrix with value at index i in 
        // auxiliary matrix.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        // Color comparison
        animations.push([j, j]);
        // Revert back to original color
        animations.push([j, j]);
        // Overwrite value at index k in original matrix with value at 
        // index i in auxiliary matrix.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}


// -------------------Quick Sort-----------------------

// Returns quick sort animations for the array bars
export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

// Recursively runs quicksort
function quickSortHelper(array, low, high, animations) {
    if (low < high) {
        const part = partition(array, low, high, animations);
        quickSortHelper(array, low, part - 1, animations);
        quickSortHelper(array, part + 1, high, animations);
    }
}

// Divides the array into partitions and sorts the partition
function partition(array, low, high, animations) {
    const pivot = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        // Colors comparison
        animations.push([high, j]);
        if (array[j] <= pivot) {
            i++;
            animations.push([i, array[j], j, array[i]]); // Swap animation
            swap(array, i, j);
        }
        animations.push([high, j]); // Revert back to original color
    }
    animations.push([i + 1, array[high], high, array[i + 1]]); // Swap pivot to correct position
    swap(array, i + 1, high);
    return i + 1;
}


// --------------------------Heap Sort---------------------------

export function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    heapSort(array, animations);
    return animations;
}

function buildMaxHeap(array, animations) {
    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
        heapify(array, i, array.length, animations);
    }
}

function heapify(array, index, heapSize, animations) {
    let largest = index;
    const left = 2 * index + 1;
    const right = 2 * index + 2;

    if (left < heapSize) {
        animations.push(['compare', left, largest]); // Color comparison
        if (array[left] > array[largest]) {
            largest = left;
        }
        animations.push(['revert', left, largest]); // Revert back to original color
    }

    if (right < heapSize) {
        animations.push(['compare', right, largest]); // Color comparison
        if (array[right] > array[largest]) {
            largest = right;
        }
        animations.push(['revert', right, largest]); // Revert back to original color
    }

    if (largest !== index) {
        animations.push(['swap', index, array[largest], largest, array[index]]); // Swap animation
        swap(array, index, largest);
        heapify(array, largest, heapSize, animations);
    }
}

function heapSort(array, animations) {
    buildMaxHeap(array, animations);
    for (let i = array.length - 1; i > 0; i--) {
        animations.push(['swap', 0, array[i], i, array[0]]); // Swap animation
        swap(array, 0, i);
        heapify(array, 0, i, animations);
    }
    return array;
}


//-----------------------------------Bubble Sort----------------------------------

export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    bubbleSort(array, animations);
    return animations;
}


function bubbleSort(array, animations) {
    const arrayLength = array.length;
    let isSwapped;

    for (let i = 0; i < arrayLength; i++) {
        isSwapped = false;

        for (let j = 0; j < arrayLength - i - 1; j++) {

            animations.push([i, j]); // Color comparision
            animations.push([i, j]); // Revert back to original color

            if (array[j] > array[j + 1]) {
                animations.push([j + 1, array[j], j, array[j+1]]); //Swap animations
                // Swap elements
                swap(array, j, j+1);
                isSwapped = true;
            }
        }

        // If no two elements were swapped in the inner loop then array is sorted
        if (!isSwapped) 
            break;
    }

    return array;
}




// swap function. Used in quicksort, heapsort and bubblesort.
function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}