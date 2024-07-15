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

export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSort(array, 0, (array.length - 1), animations);
    return animations;
}

function quickSort(
    mainArray,
    startIdx,
    endIdx,
    animations,
) {
    // Implementation of quick sort using Lomuto partition scheme with "fat pivot"
    if (startIdx >= 0 && startIdx < endIdx) {
        const [lesser, greater] = quickSortPartition(mainArray, startIdx, endIdx, animations);
        quickSort(mainArray, startIdx, (lesser - 1), animations);
        quickSort(mainArray, (greater + 1), endIdx, animations);
    }
}

function quickSortPartition(
    mainArray,
    startIdx,
    endIdx,
    animations,
) {
    let pivot = mainArray[Math.floor((startIdx + endIdx) / 2)];
    let lesser = startIdx;
    let equal = startIdx;
    let greater = endIdx;

    while (equal <= greater) {
        if (mainArray[equal] < pivot) {
            // These are the values that we're comparing; we push them once
            // to change their color.
            animations.push([equal, pivot]);
            // These are the values that we're comparing; we push them a second
            // time to revert their color.
            animations.push([equal, pivot]);

            swapElements(mainArray, equal, lesser);

            animations.push([equal, lesser]); 
            // move the bars

            lesser = lesser + 1;
            equal = equal + 1;
        } else if (mainArray[equal] > pivot) {
            // These are the values that we're comparing; we push them once
            // to change their color.
            animations.push([equal, pivot]);
            // These are the values that we're comparing; we push them a second
            // time to revert their color.
            animations.push([equal, pivot]);

            swapElements(mainArray, equal, greater);

            animations.push([equal, greater]) 
            // move the bars

            greater = greater - 1;
        } else { // if mainArray[equal] == pivot
            // These are the values that we're comparing; we push them once
            // to change their color.
            animations.push([equal, pivot]);
            // These are the values that we're comparing; we push them a second
            // time to revert their color.
            animations.push([equal, pivot]);

            animations.push([equal, pivot])

            equal = equal + 1;
        }
    }
    return [lesser, greater];
}

function swapElements (array, index1, index2) {
    array[index1] = array.splice(index2, 1, array[index1])[0];
}
