//-------------------Merge Sort-------------------------

export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
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
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // We overwrite the value at index k in the original array with the
            // value at index i in the auxiliary array.
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
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, i]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, i]);
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([j, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([j, j]);
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}


// -------------------Quick Sort-----------------------

export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

function quickSortHelper(array, low, high, animations) {
    if (low < high) {
        const part = partition(array, low, high, animations);
        quickSortHelper(array, low, part - 1, animations);
        quickSortHelper(array, part + 1, high, animations);
    }
}

function partition(array, low, high, animations) {
    const pivot = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        // Push the pivot index and the current index being compared
        animations.push([high, j]);
        if (array[j] <= pivot) {
            i++;
            animations.push([i, array[j], j, array[i]]); // Swap animation
            swap(array, i, j);
        }
        animations.push([high, j]); // Revert color back
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
        animations.push(['compare', left, largest]); // Highlight comparison
        if (array[left] > array[largest]) {
            largest = left;
        }
        animations.push(['revert', left, largest]); // Revert colors
    }

    if (right < heapSize) {
        animations.push(['compare', right, largest]); // Highlight comparison
        if (array[right] > array[largest]) {
            largest = right;
        }
        animations.push(['revert', right, largest]); // Revert colors
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









// swap function. Used in quicksort, heapsort.
function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}