function quickSort(arr) {
    if (!arr || arr.length <= 1) return arr;

    let index = Math.floor(arr.length / 2);
    let pivot = arr[index];
    arr.splice(index, 1);
    let left = [];
    let right = [];
    for (let v of arr) {
        if (v < pivot) left.push(v);
        else right.push(v);
    }

    return quickSort(left).concat([qviot], quickSort(right));
}
function quickSort1(arr) {
    if (!arr) return arr;
    sort_help(arr, 0, arr.length - 1);
    return arr;
    
}
function sort_help (arr, start, end) {
    if (start >= end) return;

    let i = start;
    for (let j = i + 1; j < end; j++) {
        if (arr[j] <= arr[end]) {
            let temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
            i++;
        }
    }
    let temp = arr[end];
    arr[end] = arr[i];
    arr[i] = temp;
    let q = i;


    sort_help(arr, start, q - 1);
    sort_help(arr, q + 1, end);
}

let arr = [12, 6, 11, 3, 9, 8];
console.log('res:', quickSort1(arr));